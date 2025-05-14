import { apiGet, apiPost } from '@/utils/axiosConfig'
import { BlogCommentType } from '@/types'

export interface ApiResponse<T> {
  data: T
  status: string
}

export interface CreateCommentRequest {
  content: string
  blogId: string
  parentCommentId?: string | null
}

export const CommentService = {
  /**
   * Fetch all comments for a blog post
   */
  getBlogComments: (blogId: string) => {
    return apiGet<ApiResponse<BlogCommentType[]>>(`/comments/blog/${blogId}`)
  },

  /**
   * Create a new root comment (not a reply)
   */
  createRootComment: (blogId: string, content: string) => {
    return apiPost<ApiResponse<BlogCommentType>>('/comments/blog', {
      blogId,
      content: content.trim(),
      parentCommentId: null,
    })
  },

  /**
   * Create a reply to an existing comment
   */
  createReply: (blogId: string, parentCommentId: string, content: string) => {
    return apiPost<ApiResponse<BlogCommentType>>('/comments/blog', {
      blogId,
      content: content.trim(),
      parentCommentId,
    })
  },

  /**
   * Create a comment (can be either root or reply)
   */
  createComment: (commentData: CreateCommentRequest) => {
    return apiPost<ApiResponse<BlogCommentType>>('/comments/blog', commentData)
  },
}

export default CommentService
