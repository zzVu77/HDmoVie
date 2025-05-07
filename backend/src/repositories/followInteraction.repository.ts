import { DataSource, FindOptionsWhere, Repository } from 'typeorm'
import { FollowInteraction } from '~/models/followInteraction.model'
import { RegisteredUser } from '~/models/registeredUser.model'

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

  public async addFollower(followInteractionId: string, follower: RegisteredUser): Promise<void> {
    try {
      // Get the current follow interaction
      const followInteraction = await this.repository.findOne({
        where: { id: followInteractionId } as FindOptionsWhere<FollowInteraction>,
        relations: ['followers'],
      })

      if (!followInteraction) {
        throw new Error('Follow interaction not found')
      }

      // Add follower to the many-to-many relationship
      await this.repository
        .createQueryBuilder()
        .relation(FollowInteraction, 'followers')
        .of(followInteractionId)
        .add(follower.getId())
    } catch (error) {
      throw new Error(`Failed to add follower: ${(error as Error).message}`)
    }
  }

  public async addFollowing(followInteractionId: string, following: RegisteredUser): Promise<void> {
    try {
      // Get the current follow interaction
      const followInteraction = await this.repository.findOne({
        where: { id: followInteractionId } as FindOptionsWhere<FollowInteraction>,
        relations: ['following'],
      })

      if (!followInteraction) {
        throw new Error('Follow interaction not found')
      }

      // Add following to the many-to-many relationship
      await this.repository
        .createQueryBuilder()
        .relation(FollowInteraction, 'following')
        .of(followInteractionId)
        .add(following.getId())
    } catch (error) {
      throw new Error(`Failed to add following: ${(error as Error).message}`)
    }
  }

  public async removeFollower(followInteractionId: string, followerId: string): Promise<void> {
    try {
      // Remove follower from the many-to-many relationship
      await this.repository
        .createQueryBuilder()
        .relation(FollowInteraction, 'followers')
        .of(followInteractionId)
        .remove(followerId)
    } catch (error) {
      throw new Error(`Failed to remove follower: ${(error as Error).message}`)
    }
  }

  public async removeFollowing(followInteractionId: string, followingId: string): Promise<void> {
    try {
      // Remove following from the many-to-many relationship
      await this.repository
        .createQueryBuilder()
        .relation(FollowInteraction, 'following')
        .of(followInteractionId)
        .remove(followingId)
    } catch (error) {
      throw new Error(`Failed to remove following: ${(error as Error).message}`)
    }
  }
}
