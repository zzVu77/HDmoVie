import { RegisteredUser } from '~/models/registeredUser.model'
import { FollowInteractionRepository } from '~/repositories/followInteraction.repository'
import { RegisteredUserRepository } from '~/repositories/registeredUser.repository'

export class FollowInteractionService {
  constructor(
    private followInteractionRepository: FollowInteractionRepository,
    private userRepository: RegisteredUserRepository,
  ) {}

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
  public async followUser(followerId: string, targetUserId: string): Promise<void> {
    try {
      // Validate users exist
      const follower = await this.userRepository.findById(followerId)
      const targetUser = await this.userRepository.findById(targetUserId)

      if (!follower) {
        throw new Error('Follower user not found')
      }

      if (!targetUser) {
        throw new Error('Target user not found')
      }

      if (followerId === targetUserId) {
        throw new Error('Users cannot follow themselves')
      }

      // Get follow interactions for both users
      const followerInteraction = await this.followInteractionRepository.findByUserId(followerId)
      const targetUserInteraction = await this.followInteractionRepository.findByUserId(targetUserId)

      if (!followerInteraction || !targetUserInteraction) {
        throw new Error('Follow interaction not found')
      }

      // Check if already following
      const isAlreadyFollowing = targetUserInteraction.getFollowers().some((user) => user.getId() === followerId)
      if (isAlreadyFollowing) {
        throw new Error('Already following this user')
      }

      // Update follow relationships
      await this.followInteractionRepository.addFollower(targetUserInteraction.getId(), follower)
      await this.followInteractionRepository.addFollowing(followerInteraction.getId(), targetUser)

      return
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  // Unfollow a user
  public async unfollowUser(followerId: string, targetUserId: string): Promise<void> {
    try {
      // Validate users exist
      const follower = await this.userRepository.findById(followerId)
      const targetUser = await this.userRepository.findById(targetUserId)

      if (!follower) {
        throw new Error('Follower user not found')
      }

      if (!targetUser) {
        throw new Error('Target user not found')
      }

      // Get follow interactions for both users
      const followerInteraction = await this.followInteractionRepository.findByUserId(followerId)
      const targetUserInteraction = await this.followInteractionRepository.findByUserId(targetUserId)

      if (!followerInteraction || !targetUserInteraction) {
        throw new Error('Follow interaction not found')
      }

      // Check if actually following
      const isFollowing = targetUserInteraction.getFollowers().some((user) => user.getId() === followerId)
      if (!isFollowing) {
        throw new Error('Not following this user')
      }

      // Update follow relationships
      await this.followInteractionRepository.removeFollower(targetUserInteraction.getId(), followerId)
      await this.followInteractionRepository.removeFollowing(followerInteraction.getId(), targetUserId)

      return
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }
}
