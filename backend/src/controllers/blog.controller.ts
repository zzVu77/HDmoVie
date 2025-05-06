import { Request, Response } from 'express'
import { BlogService } from '~/services/blog.service'

export class BlogController {
  constructor(private blogService: BlogService) {}

  async getAllBlogs(req: Request, res: Response): Promise<void> {
    try {
      const blogs = await this.blogService.getAllBlogs()
      res.status(200).json({ status: 'success', data: blogs })
    } catch (error) {
      console.error('Error fetching blogs:', error)
      res.status(500).json({ status: 'failed', message: 'Internal server error' })
    }
  }

  async getBlogById(req: Request, res: Response): Promise<void> {
    try {
      const { blogId } = req.params
      const blog = await this.blogService.getBlogById(blogId)

      if (!blog) {
        res.status(404).json({ status: 'failed', message: 'Blog not found' })
        return
      }

      res.status(200).json({ status: 'success', data: blog })
    } catch (error) {
      console.error('Error fetching blog:', error)
      res.status(500).json({ status: 'failed', message: 'Internal server error' })
    }
  }

  async createBlog(req: Request, res: Response): Promise<void> {
    try {
      const { content, tags, images } = req.body

      const userId = '2'

      const blog = await this.blogService.createBlog({
        content,
        userId,
        tags,
        images,
      })

      res.status(201).json({
        status: 'success',
        message: 'Blog created successfully',
        data: blog,
      })
    } catch (error) {
      console.error('Error creating blog:', error)
      res.status(500).json({
        status: 'failed',
        message: (error as Error).message || 'Internal server error',
      })
    }
  }

  async deleteBlog(req: Request, res: Response): Promise<void> {
    try {
      const { blogId } = req.params
      // const userId = req.user?.id
      // const isAdmin = req.user?.role === 'ADMIN'
      const isAdmin = true

      await this.blogService.deleteBlog(blogId, isAdmin)
      res.status(200).json({ status: 'success', message: 'Blog deleted successfully' })
    } catch (error) {
      console.error('Error deleting blog:', error)

      const message = (error as Error).message

      if (message === 'You do not have permission to delete this blog') {
        res.status(403).json({ status: 'failed', message })
      } else if (message === 'Blog not found') {
        res.status(404).json({ status: 'failed', message })
      } else {
        res.status(400).json({ status: 'failed', message })
      }
    }
  }
}
