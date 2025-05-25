import { NotificationObserver } from './notification-observer.interface'
import { NotificationEvent } from './notification-event.interface'
import { NotificationRepository } from '~/repositories/notification.repository'
import { LikeNotification } from '~/models/likeNotification.model'

export class LikeNotificationObserver implements NotificationObserver {
  constructor(private notificationRepository: NotificationRepository) {}

  async update(event: NotificationEvent): Promise<void> {
    if (event.type !== 'LIKE') return

    const { likeInteraction, blogOwner, isLiking } = event.data

    // Only create notification when liking (not unliking) and user is not blog owner
    if (!isLiking) return

    const existingNotification = await this.notificationRepository.findByLikeInteractionId(likeInteraction.getId())

    if (!existingNotification) {
      const likeNotification = new LikeNotification(likeInteraction, blogOwner)
      likeNotification.setStatus('UNREAD')
      likeNotification.setTime(event.timestamp)
      await this.notificationRepository.save(likeNotification)
    } else {
      // Update existing notification
      existingNotification.setStatus('UNREAD')
      existingNotification.setTime(event.timestamp)
      await this.notificationRepository.save(existingNotification)
    }
  }
}
