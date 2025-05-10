import { Request, Response } from 'express'
import { NotificationService } from '../services/notification.service'

export class NotificationController {
  constructor(private notificationService: NotificationService) {}

  async viewAllNotifications(req: Request, res: Response): Promise<void> {
    try {
      const userId = res.locals.user.id

      const notifications = await this.notificationService.getAllNotificationsForUser(userId)

      res.status(200).json({ status: 'success', data: notifications })
    } catch (error) {
      console.error('View all notifications failed ==>', error)
      res.status(500).json({ status: 'failed', message: 'Internal server error' })
    }
  }
}
