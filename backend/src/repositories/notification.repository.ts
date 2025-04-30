import { DataSource, Repository, FindOptionsWhere } from 'typeorm'
import { Notification } from '../models/notification.model'

export class NotificationRepository {
  private repo: Repository<Notification>

  constructor(dataSource: DataSource) {
    this.repo = dataSource.getRepository(Notification)
  }

  async findAllByOwner(ownerId: string): Promise<Notification[]> {
    return await this.repo.find({
      where: { owner: { id: ownerId } } as FindOptionsWhere<Notification>,
      order: { time: 'DESC' } as FindOptionsWhere<Notification>, // Mới nhất trước
      relations: ['owner'], // Load luôn thông tin owner nếu cần
    })
  }
}
