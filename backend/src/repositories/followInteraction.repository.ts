import { DataSource, FindOptionsWhere, Repository } from 'typeorm'
import { FollowInteraction } from '~/models/followInteraction.model'

export class FollowInteractionRepository {
  private repository: Repository<FollowInteraction>

  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(FollowInteraction)
  }

  public async findByUserId(userId: string): Promise<FollowInteraction | null> {
    try {
      return this.repository.findOne({
        select: {
          id: true,
          followers: { id: true, email: true, fullName: true, dateOfBirth: true },
          following: { id: true, email: true, fullName: true, dateOfBirth: true },
        } as FindOptionsWhere<FollowInteraction>,
        where: { user: { id: userId } } as FindOptionsWhere<FollowInteraction>,
        relations: ['followers', 'following'],
      })
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }
}
