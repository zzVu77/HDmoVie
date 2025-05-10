import { Request, Response } from 'express'
import { FollowInteractionService } from '~/services/followInteraction.service'

export class FollowInteractionController {
  constructor(private followInteractionService: FollowInteractionService) {}

  async followUser(req: Request, res: Response): Promise<void> {
    try {
      const { targetUserId } = req.params
      // const followerId = req.locals.user.id
      const user = res.locals.user
      const followerId = user.id

      await this.followInteractionService.followUser(followerId, targetUserId)

      res.status(200).json({
        status: 'success',
        message: 'Successfully followed user',
      })
    } catch (error) {
      console.error('Error following user:', error)
      const message = (error as Error).message

      if (message === 'Already following this user') {
        res.status(400).json({ status: 'failed', message })
      } else if (message === 'Target user not found' || message === 'Follower user not found') {
        res.status(404).json({ status: 'failed', message })
      } else if (message === 'Users cannot follow themselves') {
        res.status(400).json({ status: 'failed', message })
      } else {
        res.status(500).json({
          status: 'failed',
          message: message || 'Internal server error',
        })
      }
    }
  }

  async unfollowUser(req: Request, res: Response): Promise<void> {
    try {
      const { targetUserId } = req.params

      const user = res.locals.user
      const followerId = user.id
      await this.followInteractionService.unfollowUser(followerId, targetUserId)

      res.status(200).json({
        status: 'success',
        message: 'Successfully unfollowed user',
      })
    } catch (error) {
      console.error('Error unfollowing user:', error)
      const message = (error as Error).message

      if (message === 'Not following this user') {
        res.status(400).json({ status: 'failed', message })
      } else if (message === 'Target user not found' || message === 'Follower user not found') {
        res.status(404).json({ status: 'failed', message })
      } else {
        res.status(500).json({
          status: 'failed',
          message: message || 'Internal server error',
        })
      }
    }
  }
}
