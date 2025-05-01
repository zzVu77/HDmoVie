import { RegisteredUser } from '~/models/registeredUser.model'
import { FollowInteractionRepository } from '~/repositories/followInteraction.repository'

export class FollowInteractionService {
  constructor(private followInteractionRepository: FollowInteractionRepository) {}

  // Get user follower list
  public async getUserFollowers(userId: string): Promise<RegisteredUser[]> {
    try {
      const followInteraction = await this.followInteractionRepository.findByUserId(userId)

      if (!followInteraction) {
        return []
      }

      return followInteraction.getFollowers()
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  // Get user following list
  public async getUserFollowings(userId: string): Promise<RegisteredUser[]> {
    try {
      const followInteraction = await this.followInteractionRepository.findByUserId(userId)

      if (!followInteraction) {
        return []
      }

      return followInteraction.getFollowings()
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }
}
