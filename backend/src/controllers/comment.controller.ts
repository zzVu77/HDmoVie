import { Request, Response } from 'express'
import { CommentService } from '~/services/comment.service'
import { MovieService } from '~/services/movie.service'

export class CommentController {
  constructor(
    private commentService: CommentService,
    private movieService: MovieService,
  ) {}

  async createMovieComment(req: Request, res: Response): Promise<void> {
    try {
      const { userId, movieId, content, parentCommentId } = req.body

      const comment = await this.commentService.commentOnMovie({
        userId,
        movieId,
        content,
        parentCommentId,
      })

      res.status(201).json({ status: 'success', data: comment })
    } catch (error) {
      console.error('Error creating movie comment:', error)
      res.status(400).json({ status: 'failed', message: (error as Error).message })
    }
  }

  async getBlogComments(req: Request, res: Response): Promise<void> {
    try {
      const { blogId } = req.params
      const comments = await this.commentService.getBlogComments(blogId)
      res.status(200).json({ status: 'success', data: comments })
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
      const { userId, blogId, content, parentCommentId } = req.body
      const comment = await this.commentService.commentOnBlog(userId, blogId, content, parentCommentId)
      res.status(201).json({ status: 'success', data: comment })
    } catch (error) {
      console.error('Error creating blog comment:', error)

      if (
        (error as Error).message === 'Blog not found' ||
        (error as Error).message === 'User not found' ||
        (error as Error).message === 'Parent comment not found'
      ) {
        res.status(404).json({ status: 'failed', message: (error as Error).message })
      } else {
        res.status(400).json({ status: 'failed', message: (error as Error).message })
      }
    }
  }

  async getMovieComments(req: Request, res: Response): Promise<void> {
    try {
      const { movieId } = req.params
      const comments = await this.commentService.getMovieComments(movieId)
      res.status(200).json({ status: 'success', data: comments })
    } catch (error) {
      console.error('Error fetching movie comments:', error)
      res.status(500).json({
        status: 'failed',
        message: 'Internal server error',
      })
    }
  }
}
