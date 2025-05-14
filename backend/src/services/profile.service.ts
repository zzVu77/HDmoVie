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
      let isFollowing = false

      // In case there's a follow interaction of target
      if (userFollowInteraction) {
        followerCount = userFollowInteraction.getFollowerCount()
        followingCount = userFollowInteraction.getFollowingCount()
        isFollowing = userFollowInteraction.getFollowers().some((follower) => follower.getId() === senderId)
      }

      return {
        user,
        followersCount: followerCount,
        followingCount: followingCount,
        isOwner: userId === senderId,
        isFollowing: isFollowing,
      }
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }
}
