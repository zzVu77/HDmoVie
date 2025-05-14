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
    return apiGet<MovieCommentProps[]>(`/comments/movie/${movieId}`)
  },

  /**
   * Create a new comment for a movie
   */
  createMovieComment: (movieId: string, commentData: CreateMovieCommentRequest) => {
    return apiPost<MovieCommentResponse>(`/rates/${movieId}/with-comment`, commentData)
  },
  /**
   * Transform movie comment response to MovieCommentProps
   */
  transformMovieCommentResponse: (response: MovieCommentResponse): MovieCommentProps => {
    return {
      userName: response.data.user.fullName,
      comment: response.data.content,
      date: new Date(response.data.createdAt).toLocaleString(),
      rating: response.data.score,
    }
  },
}

export default CommentService
