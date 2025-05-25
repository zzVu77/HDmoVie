import { NotificationObserver } from './notification-observer.interface'
import { NotificationEvent } from './notification-event.interface'
import { NotificationRepository } from '~/repositories/notification.repository'
import { FollowNotification } from '~/models/followNotification.model'

export class FollowNotificationObserver implements NotificationObserver {
  constructor(private notificationRepository: NotificationRepository) {}

  async update(event: NotificationEvent): Promise<void> {
    if (event.type !== 'FOLLOW') return

    const { follower, targetUser } = event.data

    const followNotification = new FollowNotification(follower, targetUser)
    followNotification.setStatus('UNREAD')
    followNotification.setTime(event.timestamp)

    await this.notificationRepository.save(followNotification)
  }
}
