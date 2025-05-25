import { NotificationSubject } from './notification-subject.interface'
import { NotificationObserver } from './notification-observer.interface'
import { NotificationEvent } from './notification-event.interface'

export class NotificationEventManager implements NotificationSubject {
  private observers: NotificationObserver[] = []

  subscribe(observer: NotificationObserver): void {
    if (!this.observers.includes(observer)) {
      this.observers.push(observer)
    }
  }

  unsubscribe(observer: NotificationObserver): void {
    const index = this.observers.indexOf(observer)
    if (index > -1) {
      this.observers.splice(index, 1)
    }
  }

  async notify(event: NotificationEvent): Promise<void> {
    const promises = this.observers.map(observer => observer.update(event))
    await Promise.all(promises)
  }
}