import { NotificationRepository } from '../repositories/notification.repository'
import { NotificationResponse } from '../type'

export class NotificationService {
  constructor(private notificationRepository: NotificationRepository) {}

  async getAllNotificationsForUser(userId: string): Promise<NotificationResponse[]> {
    const notifications = await this.notificationRepository.findAllByOwner(userId)
    return notifications.map((notification: any): NotificationResponse => {
      let notificationType: 'COMMENT' | 'FOLLOW' | 'LIKE' | 'REPORT'
      if (notification.comment) {
        notificationType = 'COMMENT'
      } else if (notification.follower) {
        notificationType = 'FOLLOW'
      } else if (notification.like) {
        notificationType = 'LIKE'
      } else if (notification.report) {
        notificationType = 'REPORT'
      } else {
        console.error('Could not determine notification type for:', notification)
        throw new Error('Invalid notification: unable to determine type')
      }

      const base = {
        id: notification.id,
        time: notification.time,
        status: notification.status,
        type: notificationType,
        owner: {
          id: notification.owner.id,
          fullName: notification.owner.fullName,
        },
      }

      switch (notificationType) {
        case 'COMMENT':
          return {
            ...base,
            commentId: notification.comment?.id,
            blogId: notification.comment?.blog?.id,
            user: {
              id: notification.comment?.user?.id,
              fullName: notification.comment?.user?.fullName,
            },
          }
        case 'FOLLOW':
          return {
            ...base,
            followerId: notification.follower?.id,
            user: {
              id: notification.follower?.id,
              fullName: notification.follower?.fullName,
            },
          }
        case 'LIKE': {
          const likerUser = notification.like?.likers?.[0]
          return {
            ...base,
            userId: likerUser?.id,
            blogId: notification.like?.blog?.id,
            user: {
              id: likerUser?.id,
              fullName: likerUser?.fullName,
            },
            blog: {
              id: notification.like?.blog?.id,
              title: notification.like?.blog?.title,
            },
          }
        }
        case 'REPORT':
          return {
            ...base,
            reportId: notification.report?.id,
            blogId: notification.report?.blogId,
            user: {
              id: notification.report?.reporter?.id,
              fullName: notification.report?.reporter?.fullName,
            },
          }
        default:
          throw new Error(`Unknown notification type: ${notificationType}`)
      }
    })
  }

  async markNotificationAsRead(notificationId: string, userId: string): Promise<void> {
    await this.notificationRepository.updateNotificationStatus(notificationId, userId)
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
