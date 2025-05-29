import { NotificationEvent } from './notification-event.interface'
import { NotificationObserver } from './notification-observer.interface'
export interface NotificationSubject {
  subscribe(observer: NotificationObserver): void
  unsubscribe(observer: NotificationObserver): void
  notify(event: NotificationEvent): Promise<void>
}
