import { NotificationObserver } from './notification-observer.interface'
import { NotificationEvent } from './notification-event.interface'
import { NotificationRepository } from '~/repositories/notification.repository'
import { ReportNotification } from '~/models/reportNotification.model'

export class ReportNotificationObserver implements NotificationObserver {
  constructor(private notificationRepository: NotificationRepository) {}

  async update(event: NotificationEvent): Promise<void> {
    if (event.type !== 'REPORT') return

    const { report, reportOwner } = event.data

    const reportNotification = new ReportNotification()
    Object.assign(reportNotification, {
      report: report,
      owner: reportOwner,
      time: event.timestamp,
      status: 'UNREAD',
    })

    await this.notificationRepository.save(reportNotification)
  }
}
