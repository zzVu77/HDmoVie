import { Request, Response } from 'express'
import { NotificationService } from '../services/notification.service'

export class NotificationController {
  constructor(private notificationService: NotificationService) {}

  async viewAllNotifications(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.userId

      const notifications = await this.notificationService.getAllNotificationsForUser(userId)

      res.status(200).json(notifications)
    } catch (error) {
      console.error('View all notifications failed ==>', error)
      res.status(500).json({ message: 'Internal server error' })
    }
  }
}
