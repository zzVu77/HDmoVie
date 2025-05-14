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
export const BlogService = {
  /**
   * Fetch all blog posts
   */
  getAllBlogs: () => {
    return apiGet<BlogPost[]>('/blogs')
  },

  /**
   * Fetch a specific blog post by ID
   */
  getBlogById: (blogId: string) => {
    return apiGet<BlogPost>(`/blogs/${blogId}`)
  },

  /**
   * Create a new blog post
   */
  createBlog: (blogData: CreateBlogPostRequest) => {
    return apiPost<BlogPost, CreateBlogPostRequest>('/blogs', blogData)
  },

  /**
   * Delete a blog post
   */
  deleteBlog: (blogId: string) => {
    return apiDelete<void>(`/blogs/${blogId}`)
  },
}

export default BlogService
