import { DataSource, Repository } from 'typeorm'
import { Notification } from '../models/notification.model'

export class NotificationRepository {
  private repo: Repository<Notification>

  constructor(dataSource: DataSource) {
    this.repo = dataSource.getRepository(Notification)
  }

  async findAllByOwner(ownerId: string): Promise<any[]> {
    return await this.repo
      .createQueryBuilder('notification')
      .leftJoinAndSelect('notification.owner', 'owner')
      .where('owner.id = :ownerId', { ownerId })
      .orderBy('notification.time', 'DESC')
      .select([
        'notification.id',
        'notification.time',
        'notification.status',
        'notification.type',
        'notification.reportId',
        'notification.userId',
        'notification.followerId',
        'notification.commentId',
        'owner.id',
        'owner.fullName',
      ])
      .getRawMany()
  }

  async findOne(id: string): Promise<Notification | null> {
    return await this.repo
      .createQueryBuilder('notification')
      .leftJoinAndSelect('notification.owner', 'owner')
      .where('notification.id = :id', { id })
      .getOne()
  }

  async save(notification: Notification): Promise<Notification> {
    return await this.repo.save(notification)
  }

  async updateAllUnreadToRead(ownerId: string): Promise<void> {
    await this.repo
      .createQueryBuilder()
      .update(Notification)
      .set({ status: 'READ' } as any)
      .where('owner.id = :ownerId AND status = :status', {
        ownerId,
        status: 'UNREAD',
      })
      .execute()
  }
}
