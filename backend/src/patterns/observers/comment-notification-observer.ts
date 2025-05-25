import { NotificationObserver } from './notification-observer.interface'
import { NotificationEvent } from './notification-event.interface'
import { NotificationRepository } from '~/repositories/notification.repository'
import { CommentNotification } from '~/models/commentNotification.model'

export class CommentNotificationObserver implements NotificationObserver {
  constructor(private notificationRepository: NotificationRepository) {}

  async update(event: NotificationEvent): Promise<void> {
    if (event.type !== 'COMMENT') return

    const { comment, blogOwner } = event.data

    // Don't create notification if commenter is the blog owner
    if (blogOwner.getId() === comment.getUser().getId()) return

    const commentNotification = new CommentNotification(comment, blogOwner)
    commentNotification.setStatus('UNREAD')
    commentNotification.setTime(event.timestamp)

    await this.notificationRepository.save(commentNotification)
  }
}
