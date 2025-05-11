import { apiGet, apiPost } from '@/utils/axiosConfig'
import { RegisteredUserType, TagType } from '@/types'

export interface BlogPost {
  id: string
  content: string
  dateCreated: Date
  owner: RegisteredUserType
  tags: TagType[]
  likes: number
  comments: number
  images?: string[]
}

export interface CreateBlogPostRequest {
  content: string
  tags: string[]
  images?: string[]
}

export interface UpdateBlogPostRequest {
  content?: string
  tags?: string[]
  images?: string[]
}

export interface BlogCommentRequest {
  content: string
  blogId: string
  parentCommentId?: string
}

export interface CreateCommentReportRequest {
  reason: string
  commentId: string
  blogId: string
}

export interface ApiResponse<T> {
  data: T
  status: string
}

/**
 * Service for handling all blog-related API requests
 */
export const BlogService = {
  /**
   * Fetch all blog posts
   */
  getAllBlogs: () => {
    return apiGet<ApiResponse<BlogPost[]>>('/blogs')
  },

  /**
   * Fetch a specific blog post by ID
   */
  getBlogById: (blogId: string) => {
    return apiGet<ApiResponse<BlogPost>>(`/blogs/${blogId}`)
  },

  /**
   * Create a new blog post
   */
  createBlog: (blogData: CreateBlogPostRequest) => {
    return apiPost<ApiResponse<BlogPost>, CreateBlogPostRequest>('/blogs', blogData)
  },

  /**
   * Delete a blog post
   */
  deleteBlog: (blogId: string) => {
    return apiPost<void, null>(`/blogs/${blogId}/delete`, null)
  },
}

export default BlogService
