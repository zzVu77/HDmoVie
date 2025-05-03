import { NotificationRepository } from '../repositories/notification.repository'
import { NotificationResponse } from '../type' // điều chỉnh tùy theo vị trí file hiện tại

export class NotificationService {
  constructor(private notificationRepository: NotificationRepository) {}

  async getAllNotificationsForUser(userId: string): Promise<NotificationResponse[]> {
    const rawNotifications = await this.notificationRepository.findAllByOwner(userId)
    // Mapping thủ công nếu cần (giới hạn field, bảo vệ sensitive info, ...)

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
}
