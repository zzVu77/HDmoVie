import { apiGet, apiPost } from '@/utils/axiosConfig'
import { BlogPost } from '@/types'

export interface CreateBlogPostRequest {
  content: string
  tags: string[]
  imageUrls?: { url: string }[]
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
