import { NotificationEvent } from './notification-event.interface'

export interface NotificationObserver {
  update(event: NotificationEvent): Promise<void>
}
