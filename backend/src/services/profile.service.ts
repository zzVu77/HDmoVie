// import { Watchlist } from "~/models/watchlist.model";

import { RegisteredUserRepository } from '~/repositories/registeredUser.repository'
import { FollowInteractionRepository } from '~/repositories/followInteraction.repository'

export class ProfileService {
  constructor(
    private registeredUserRepository: RegisteredUserRepository,
    private followInteractionRepository: FollowInteractionRepository,
  ) {}

  // Get user basic profile information: user information + follow information
  public async getProfile(userId: string, senderId: string) {
    try {
      const user = await this.registeredUserRepository.findById(userId)

      // In case user does not exist
      if (!user) {
        return null
      }

      const userFollowInteraction = await this.followInteractionRepository.findByUserId(userId)
      let followerCount = 0
      let followingCount = 0

      // In case there's a follow interaction
      if (userFollowInteraction) {
        followerCount = userFollowInteraction.getFollowerCount()
        followingCount = userFollowInteraction.getFollowingCount()
      }

      return {
        user,
        followersCount: followerCount,
        followingCount: followingCount,
        isOwner: userId === senderId,
      }
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }
}
