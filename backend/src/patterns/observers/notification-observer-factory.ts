import { NotificationRepository } from '~/repositories/notification.repository'
import { NotificationObserver } from './notification-observer.interface'
import { CommentNotificationObserver } from './comment-notification-observer'
import { FollowNotificationObserver } from './follow-notification-observer'
import { LikeNotificationObserver } from './like-notification-observer'
import { ReportNotificationObserver } from './report-notification-observer'

export class NotificationObserverFactory {
  static createObservers(notificationRepository: NotificationRepository): NotificationObserver[] {
    return [
      new CommentNotificationObserver(notificationRepository),
      new FollowNotificationObserver(notificationRepository),
      new LikeNotificationObserver(notificationRepository),
      new ReportNotificationObserver(notificationRepository),
    ]
  }
}
