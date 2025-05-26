import { Request, Response } from 'express'
import { BlogService } from '~/services/blog.service'

export class BlogController {
  constructor(private blogService: BlogService) {}

  async getAllBlogs(req: Request, res: Response): Promise<void> {
    try {
      const user = res.locals.user
      const userId = user?.id ?? ''
      const blogs = await this.blogService.getAllBlogs(userId)
      res.status(200).json(blogs)
    } catch (error) {
      console.error('Error fetching blogs:', error)
      res.status(500).json({ message: 'Internal server error' })
    }
  }

  async getBlogById(req: Request, res: Response): Promise<void> {
    try {
      const { blogId } = req.params
      const user = res.locals.user
      const userId = user.id
      const blog = await this.blogService.getBlogById(blogId, userId)

      if (!blog) {
        res.status(404).json({ message: 'Blog not found' })
        return
      }

      res.status(200).json(blog)
    } catch (error) {
      console.error('Error fetching blog:', error)
      res.status(500).json({ message: 'Internal server error' })
    }
  }

  async createBlog(req: Request, res: Response): Promise<void> {
    try {
      const { content, tags, images } = req.body
      const user = res.locals.user
      const userId = user.id
      const blog = await this.blogService.createBlog({
        content,
        userId,
        tags,
        images,
      })

      res.status(201).json(blog)
    } catch (error) {
      console.error('Error creating blog:', error)
      res.status(500).json({
        message: (error as Error).message || 'Internal server error',
      })
    }
  }

  async deleteBlog(req: Request, res: Response): Promise<void> {
    try {
      const { blogId } = req.params
      const user = res.locals.user
      const userId = user.id

      await this.blogService.deleteBlog(blogId, userId)
      res.status(200).json({ message: 'Blog deleted successfully' })
    } catch (error) {
      console.error('Error deleting blog:', error)

      const message = (error as Error).message

      if (message === 'You do not have permission to delete this blog') {
        res.status(403).json({ message })
      } else if (message === 'Blog not found') {
        res.status(404).json({ message })
      } else {
        res.status(400).json({ message })
      }
    }
  }
  async searchBlogs(req: Request, res: Response): Promise<void> {
    try {
      const { q: query } = req.query
      const user = res.locals.user
      const userId = user?.id ?? ''
      console.log('Search query:', query)
      if (!query || typeof query !== 'string') {
        res.status(400).json({ message: 'Search query is required' })
        return
      }

      const blogs = await this.blogService.searchBlogs(query, userId)
      res.status(200).json(blogs)
    } catch (error) {
      console.error('Error searching blogs:', error)
      res.status(500).json({ message: 'Internal server error' })
    }
  }
}
