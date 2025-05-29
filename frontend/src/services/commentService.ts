import { apiGet, apiPost } from '@/utils/axiosConfig'
import { BlogCommentType, MovieCommentProps, MovieCommentResponse } from '@/types'

export interface CreateCommentRequest {
  content: string
  blogId: string
  parentCommentId?: string
}

export interface CreateMovieCommentRequest {
  score: number
  content: string
}

export const CommentService = {
  /**
   * Fetch all comments for a blog post
   */
  getBlogComments: (blogId: string) => {
    return apiGet<BlogCommentType[]>(`/comments/blog/${blogId}`)
  },

  /**
   * Create a new comment
   */
  createComment: (commentData: CreateCommentRequest) => {
    return apiPost<BlogCommentType>('/comments/blog', commentData)
  },

  /**
   * Fetch all comments for a movie
   */
  getMovieComments: (movieId: string) => {
    return apiGet<MovieCommentProps[]>(`/comments/movie/${movieId}`).then((res) =>
      res.data.map(CommentService.transformGetMovieCommentResponse),
    )
  },

  /**
   * Create a new comment for a movie
   */
  createMovieComment: (movieId: string, commentData: CreateMovieCommentRequest) => {
    return apiPost<MovieCommentResponse>(`/rates/${movieId}/with-comment`, commentData).then((res) =>
      CommentService.transformPostMovieCommentResponse(res.data),
    )
  },

  transformPostMovieCommentResponse: (response: MovieCommentResponse): MovieCommentProps => {
    return {
      id: response.id,
      user: {
        id: response.user.id,
        fullName: response.user.fullName,
      },
      comment: response.content,
      date: new Date(response.createdAt).toLocaleString(),
      rating: response.score,
    }
  },
  transformGetMovieCommentResponse: (response: MovieCommentProps): MovieCommentProps => {
    return {
      id: response.id,
      user: {
        id: response.user.id,
        fullName: response.user.fullName,
      },
      comment: response.comment,
      date: new Date(response.date).toLocaleString(),
      rating: response.rating,
    }
  },
}

export default CommentService
