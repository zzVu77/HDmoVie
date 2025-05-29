import { apiDelete, apiGet, apiPost } from '@/utils/axiosConfig'
import { BlogPost, TagType } from '@/types'

export interface CreateBlogPostRequest {
  content: string
  tags: TagType[]
  images?: { url: string }[]
}

export interface ApiResponse<T> {
  data: T
  status: string
}

/**
 * Service for handling all blog-related API requests
 */
export const blogService = {
  /**
   * Fetch all blog posts
   */
  getAllBlogs: async () => {
    return await apiGet<BlogPost[]>('/blogs')
  },

  /**
   * Fetch a specific blog post by ID
   */
  getBlogById: async (blogId: string) => {
    return await apiGet<BlogPost>(`/blogs/${blogId}`)
  },

  /**
   * Search blogs by content or title
   */
  searchBlogs: async (query: string) => {
    return await apiGet<BlogPost[]>(`/blogs/search?q=${encodeURIComponent(query)}`)
  },

  /**
   * Create a new blog post
   */
  createBlog: async (blogData: CreateBlogPostRequest) => {
    return await apiPost<BlogPost, CreateBlogPostRequest>('/blogs', blogData)
  },

  /**
   * Delete a blog post
   */
  deleteBlog: async (blogId: string) => {
    return await apiDelete<void>(`/blogs/${blogId}`)
  },
}

export default blogService
