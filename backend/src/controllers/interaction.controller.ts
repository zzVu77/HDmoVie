import { Request, Response } from 'express'
import { InteractionService } from '../services/interaction.service'

export class InteractionController {
  constructor(private interactionService: InteractionService) {}

  async likeOrUnlikeBlog(req: Request, res: Response): Promise<void> {
    try {
      const blogId = req.body.blogId
      const userId = req.body.userId

      // Gọi service để xử lý like hoặc unlike
      const likeInteraction = await this.interactionService.likeBlog(blogId, userId)

      res.json(likeInteraction)
    } catch (error) {
      console.error('Like/Unlike blog failed ==>', error)
      res.status(500).json({ message: 'Internal server error' })
    }
  }
}
