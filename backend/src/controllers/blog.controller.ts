import { Request, Response } from 'express'
import { BlogService } from '~/services/blog.service'

export class BlogController {
  constructor(private blogService: BlogService) {}

  async getAllBlogs(req: Request, res: Response): Promise<void> {
    try {
      const blogs = await this.blogService.getAllBlogs()
      res.json(blogs)
    } catch (error) {
      console.error('Error fetching blogs:', error)
      res.status(500).json({ message: 'Internal server error' })
    }
  }

  async getBlogById(req: Request, res: Response): Promise<void> {
    try {
      const { blogId } = req.params
      const blog = await this.blogService.getBlogById(blogId)

      if (!blog) {
        res.status(404).json({ message: 'Blog not found' })
        return
      }

      res.json(blog)
    } catch (error) {
      console.error('Error fetching blog:', error)
      res.status(500).json({ message: 'Internal server error' })
    }
  }

  async deleteBlog(req: Request, res: Response): Promise<void> {
    try {
      const { blogId } = req.params
      //   const userId = req.user?.id
      //   const isAdmin = req.user?.role === 'ADMIN'

      const isAdmin = true

      await this.blogService.deleteBlog(blogId, isAdmin)
      res.status(200).json({ message: 'Blog deleted successfully' })
    } catch (error) {
      console.error('Error deleting blog:', error)

      if ((error as Error).message === 'You do not have permission to delete this blog') {
        res.status(403).json({ message: (error as Error).message })
      } else if ((error as Error).message === 'Blog not found') {
        res.status(404).json({ message: (error as Error).message })
      } else {
        res.status(400).json({ message: (error as Error).message })
      }
    }
  }
}
