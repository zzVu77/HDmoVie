import { Request, Response } from 'express'
import { RateService } from '~/services/rate.service'

export class RateController {
  constructor(private rateService: RateService) {}

  async rateMovie(req: Request, res: Response): Promise<void> {
    try {
      const { movieId, score } = req.body
      const userId = res.locals.user.id // Get user ID from authenticated user

      if (!movieId || score === undefined) {
        res.status(400).json({ status: 'failed', message: 'Missing required fields' })
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
}
