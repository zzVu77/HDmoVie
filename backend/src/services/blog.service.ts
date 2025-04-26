import { Blog } from '~/models/blog.model'
import { BlogRepository } from '~/repositories/blog.repository'

export class BlogService {
  constructor(private blogRepository: BlogRepository) {}

  async getAllBlogs(): Promise<Blog[]> {
    return this.blogRepository.findAll()
  }

  async getBlogById(id: string): Promise<Blog | null> {
    return this.blogRepository.findById(id)
  }

  async deleteBlog(blogId: string, isAdmin: boolean = false): Promise<void> {
    const blog = await this.blogRepository.findById(blogId)

    if (!blog) {
      throw new Error('Blog not found')
    }

    if (!isAdmin) {
      throw new Error('You do not have permission to delete this blog')
    }

    await this.blogRepository.delete(blogId)
  }
}
