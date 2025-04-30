import { NotificationRepository } from '../repositories/notification.repository'

export class NotificationService {
  constructor(private notificationRepository: NotificationRepository) {}

  async getAllNotificationsForUser(userId: string) {
    const notifications = await this.notificationRepository.findAllByOwner(userId)
    return notifications
  }
}
