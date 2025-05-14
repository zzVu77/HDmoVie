import { Request, Response } from 'express'
import { RateService } from '~/services/rate.service'
import { CommentService } from '~/services/comment.service'

export class RateController {
  constructor(
    private rateService: RateService,
    private commentService: CommentService,
  ) {}

  async rateMovie(req: Request, res: Response): Promise<void> {
    try {
      const { movieId } = req.params
      const { score } = req.body
      const userId = res.locals.user.id

      if (score === undefined) {
        res.status(400).json({ status: 'failed', message: 'Score is required' })
        return
      }

      if (score < 0 || score > 10) {
        res.status(400).json({ status: 'failed', message: 'Score must be between 0 and 10' })
        return
      }

      const rate = await this.rateService.rateMovie(userId, movieId, score)
      res.status(201).json({ status: 'success', data: rate })
    } catch (error) {
      console.error('Error rating movie:', error)
      const message = (error as Error).message
      if (message === 'User not found' || message === 'Movie not found') {
        res.status(404).json({ status: 'failed', message })
      } else {
        res.status(400).json({ status: 'failed', message })
      }
    }
  }

  async deleteRate(req: Request, res: Response): Promise<void> {
    try {
      const { movieId } = req.params
      const userId = res.locals.user.id // Get user ID from authenticated user

      if (!movieId) {
        res.status(400).json({ status: 'failed', message: 'Movie ID is required' })
        return
      }

      const success = await this.rateService.deleteRate(movieId, userId)
      if (success) {
        res.status(200).json({ status: 'success', message: 'Rate deleted successfully' })
      } else {
        res.status(404).json({ status: 'failed', message: 'Rate not found' })
      }
    } catch (error) {
      console.error('Error deleting rate:', error)
      res.status(400).json({ status: 'failed', message: (error as Error).message })
    }
  }

  async rateAndCommentMovie(req: Request, res: Response): Promise<void> {
    try {
      const { movieId } = req.params
      const { score, content } = req.body
      // const userId = res.locals.user.id
      const userId = '1'

      if (score === undefined || !content) {
        res.status(400).json({ status: 'failed', message: 'Score and content are required' })
        return
      }

      // Rate the movie
      const rate = await this.rateService.rateMovie(userId, movieId, score)

      // Create the comment
      const comment = await this.commentService.commentOnMovie({
        userId,
        movieId: Number(movieId),
        content,
        parentCommentId: null,
      })

      if (!rate || !comment) {
        throw new Error('Failed to create rate or comment')
      }

      // Format response using getter methods
      const response = {
        status: 'success',
        data: {
          id: comment.getId(),
          score: rate.getRateScore(),
          content: comment.getContent(),
          userId: comment.getUser().getId(),
          movieId: comment.getMovie().getId(),
          createdAt: comment.getDate(),
          user: {
            id: comment.getUser().getId(),
            fullName: comment.getUser().getFullName(),
          },
        },
      }

      res.status(201).json(response)
    } catch (error) {
      console.error('Error rating and commenting movie:', error)
      const message = (error as Error).message
      if (message === 'User not found' || message === 'Movie not found') {
        res.status(404).json({ status: 'failed', message })
      } else {
        res.status(400).json({ status: 'failed', message })
      }
    }
  }
}
