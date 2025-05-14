import { apiGet, apiPost } from '@/utils/axiosConfig'
import { BlogPost } from '@/types'

export interface CreateBlogPostRequest {
  content: string
  tags: string[]
  imageUrls?: { url: string }[]
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
    return apiPost<void, null>(`/blogs/${blogId}/delete`, null)
  },
}

export default BlogService
