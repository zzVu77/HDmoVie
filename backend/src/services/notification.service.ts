import { NotificationRepository } from '../repositories/notification.repository'
import { NotificationResponse } from '../type'

export class NotificationService {
  constructor(private notificationRepository: NotificationRepository) {}

  async getAllNotificationsForUser(userId: string): Promise<NotificationResponse[]> {
    const rawNotifications = await this.notificationRepository.findAllByOwner(userId)

    return rawNotifications.map((notification: any): NotificationResponse => {
      const base = {
        id: notification.notification_id,
        time: notification.notification_time,
        status: notification.notification_status,
        type: notification.notification_type,
        owner: {
          id: notification.owner_id,
          fullName: notification.owner_fullName,
        },
      }

      switch (notification.notification_type) {
        case 'COMMENT':
          return { ...base, commentId: notification.commentId }
        case 'FOLLOW':
          return { ...base, followerId: notification.followerId }
        case 'LIKE':
          return { ...base, userId: notification.userId }
        case 'REPORT':
          return { ...base, reportId: notification.reportId }
        default:
          return base
      }
    })
  }

  async markNotificationAsRead(notificationId: string, userId: string): Promise<void> {
    const notification = await this.notificationRepository.findOne(notificationId)
    if (!notification) {
      throw new Error('Notification not found')
    }
    if (notification.getOwner().getId() !== userId) {
      throw new Error('Unauthorized: You can only mark your own notifications as read')
    }

    notification.setStatus('READ')
    await this.notificationRepository.save(notification)
  }

  async markAllNotificationsAsRead(userId: string): Promise<void> {
    const notifications = await this.notificationRepository.findAllByOwner(userId)
    if (notifications.length === 0) {
      throw new Error('No notifications found for this user')
    }
    // Create a query to update all unread notifications for this user
    await this.notificationRepository.updateAllUnreadToRead(userId)
  }
}
