import { Request, Response } from 'express'
import { NotificationService } from '../services/notification.service'

export class NotificationController {
  constructor(private notificationService: NotificationService) {}

  async viewAllNotifications(req: Request, res: Response): Promise<void> {
    try {
      const userId = res.locals.user.id

      const notifications = await this.notificationService.getAllNotificationsForUser(userId)
      res.status(200).json(notifications)
    } catch (error) {
      console.error('View all notifications failed ==>', error)
      res.status(500).json({ status: 'failed', message: 'Internal server error' })
    }
  }

  async markAsRead(req: Request, res: Response): Promise<void> {
    try {
      const userId = res.locals.user.id
      const { notificationId } = req.params

      await this.notificationService.markNotificationAsRead(notificationId, userId)

      res.status(200).json({ status: 'success', message: 'Notification marked as read' })
    } catch (error) {
      console.error('Mark notification as read failed ==>', error)
      if ((error as Error).message === 'Notification not found') {
        res.status(404).json({ status: 'failed', message: 'Notification not found' })
      } else if ((error as Error).message.includes('Unauthorized')) {
        res.status(403).json({ status: 'failed', message: (error as Error).message })
      } else {
        res.status(500).json({ status: 'failed', message: 'Internal server error' })
      }
    }
  }

  async markAllAsRead(req: Request, res: Response): Promise<void> {
    try {
      const userId = res.locals.user.id

      await this.notificationService.markAllNotificationsAsRead(userId)

      res.status(200).json({ status: 'success', message: 'All notifications marked as read' })
    } catch (error) {
      console.error('Mark all notifications as read failed ==>', error)
      res.status(500).json({ status: 'failed', message: 'Internal server error' })
    }
  }
}
