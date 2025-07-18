import { Request, Response } from 'express'
import { CommentService } from '~/services/comment.service'

export class CommentController {
  constructor(private commentService: CommentService) {}

  async createMovieComment(req: Request, res: Response): Promise<void> {
    try {
      const user = res.locals.user
      const userId = user.id
      const { movieId, content, parentCommentId } = req.body

      const comment = await this.commentService.commentOnMovie({
        userId,
        movieId,
        content,
        parentCommentId,
      })

      res.status(201).json(comment)
    } catch (error) {
      console.error('Error creating movie comment:', error)
      res.status(400).json({ status: 'failed', message: (error as Error).message })
    }
  }
  async deleteCommentBlog(req: Request, res: Response): Promise<void> {
    try {
      const { commentId } = req.params
      const comment = await this.commentService.getCommentById(commentId)
      if (!comment) {
        throw new Error('Comment not found')
      }
      const reports = await this.commentService.deleteComment(commentId)

      //console.log(reports)
      res.status(201).json({ status: 'success', data: reports })
    } catch (error) {
      console.error('Error reporting blog:', error)

      const message = (error as Error).message
      if (message === 'Blog not found') {
        res.status(404).json({ status: 'failed', message })
      } else {
        res.status(400).json({ status: 'failed', message })
      }
    }
  }
  async getBlogComments(req: Request, res: Response): Promise<void> {
    try {
      const { blogId } = req.params
      const user = res.locals.user
      const userId = user.id
      const comments = await this.commentService.getBlogComments(blogId, userId)
      res.status(201).json(comments)
    } catch (error) {
      console.error('Error fetching blog comments:', error)

      if ((error as Error).message === 'Blog not found') {
        res.status(404).json({ status: 'failed', message: (error as Error).message })
      } else {
        res.status(500).json({ status: 'failed', message: 'Internal server error' })
      }
    }
  }

  async commentOnBlog(req: Request, res: Response): Promise<void> {
    try {
      const { blogId, content, parentCommentId } = req.body
      const user = res.locals.user
      const userId = user.id
      const comment = await this.commentService.commentOnBlog(userId, blogId, content, parentCommentId)
      res.status(201).json(comment)
    } catch (error) {
      console.error('Error creating blog comment:', error)

      if (
        (error as Error).message === 'Blog not found' ||
        (error as Error).message === 'User not found' ||
        (error as Error).message === 'Parent comment not found'
      ) {
        res.status(404).json({ message: (error as Error).message })
      } else {
        res.status(400).json({ message: (error as Error).message })
      }
    }
  }

  async getMovieComments(req: Request, res: Response): Promise<void> {
    try {
      const { movieId } = req.params
      const comments = await this.commentService.getMovieComments(movieId)
      res.status(201).json(comments)
    } catch (error) {
      console.error('Error fetching movie comments:', error)
      res.status(500).json({
        status: 'failed',
        message: 'Internal server error',
      })
    }
  }
}
