import { DataSource, FindOptionsWhere, Repository } from 'typeorm'
import { FollowInteraction } from '~/models/followInteraction.model'

export class FollowInteractionRepository {
  private repository: Repository<FollowInteraction>

  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(FollowInteraction)
  }

  public async findByUserId(userId: string): Promise<FollowInteraction | null> {
    return this.repository.findOne({
      where: { user: { id: userId } } as FindOptionsWhere<FollowInteraction>,
      relations: ['followers', 'following'],
    })
  }
}
