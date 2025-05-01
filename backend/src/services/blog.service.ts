import { Blog } from '~/models/blog.model'
import { BlogRepository } from '~/repositories/blog.repository'

export class BlogService {
  constructor(private blogRepository: BlogRepository) {}

  // Get user blogs
  public async getUserBlogs(userId: string, page: number): Promise<Blog[]> {
    try {
      const pageSize = 5
      const offset = page * pageSize
      return this.blogRepository.findByUserId(userId, offset, pageSize)
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }
}
