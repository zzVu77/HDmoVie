import { apiGet, apiPost } from '@/utils/axiosConfig'
import { BlogCommentType } from '@/types'

export interface ApiResponse<T> {
  data: T
  status: string
}

export interface CreateCommentRequest {
  content: string
  blogId: string
  parentCommentId?: string
}

export const CommentService = {
  /**
   * Fetch all comments for a blog post
   */
  getBlogComments: (blogId: string) => {
    return apiGet<ApiResponse<BlogCommentType[]>>(`/comments/blog/${blogId}`)
  },

  /**
   * Create a new comment
   */
  createComment: (commentData: CreateCommentRequest) => {
    return apiPost<ApiResponse<BlogCommentType>, CreateCommentRequest>('/comments', commentData)
  },
}

export default CommentService
