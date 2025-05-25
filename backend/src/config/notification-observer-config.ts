import { DataSource } from 'typeorm'
import { NotificationEventManager } from '~/patterns/observers/notification-event-manager'
import { NotificationObserverFactory } from '~/patterns/observers/notification-observer-factory'
import { NotificationRepository } from '~/repositories/notification.repository'

export class NotificationObserverConfig {
  private static instance: NotificationEventManager

  static initialize(dataSource: DataSource): NotificationEventManager {
    if (!this.instance) {
      this.instance = new NotificationEventManager()
      
      // Create notification repository
      const notificationRepository = new NotificationRepository(dataSource)
      
      // Create and register all observers
      const observers = NotificationObserverFactory.createObservers(notificationRepository)
      observers.forEach(observer => {
        this.instance.subscribe(observer)
      })
    }
    
    return this.instance
  }

  static getInstance(): NotificationEventManager {
    if (!this.instance) {
      throw new Error('NotificationObserverConfig must be initialized first')
    }
    return this.instance
  }
} 