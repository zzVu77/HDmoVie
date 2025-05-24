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
      // Join for FollowNotification
      .leftJoinAndSelect('notification.follower', 'follower')
      // Join for LikeNotification
      .leftJoinAndSelect('notification.user', 'user')
      // Join for CommentNotification
      .leftJoinAndSelect('notification.comment', 'comment')
      .leftJoinAndSelect('comment.user', 'commentUser')
      .leftJoinAndSelect('comment.blog', 'commentBlog')
      // Join for ReportNotification
      .leftJoinAndSelect('notification.report', 'report')
      .leftJoinAndSelect('report.reporter', 'reporter')
      .where('owner.id = :ownerId', { ownerId })
      .orderBy('notification.time', 'DESC')
      .getMany()
  }

  async findOne(id: string): Promise<Notification | null> {
    return await this.repo
      .createQueryBuilder('notification')
      .leftJoinAndSelect('notification.owner', 'owner')
      .leftJoinAndSelect('notification.follower', 'follower')
      .leftJoinAndSelect('notification.user', 'user')
      .leftJoinAndSelect('notification.comment', 'comment')
      .leftJoinAndSelect('comment.user', 'commentUser')
      .leftJoinAndSelect('comment.blog', 'commentBlog')
      .leftJoinAndSelect('notification.report', 'report')
      .leftJoinAndSelect('report.reporter', 'reporter')
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
