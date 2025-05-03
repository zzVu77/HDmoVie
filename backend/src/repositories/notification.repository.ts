import { DataSource, Repository, FindOptionsWhere } from 'typeorm'
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
}
