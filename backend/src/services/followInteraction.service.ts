import { FollowInteraction } from '~/models/followInteraction.model'
import { RegisteredUser } from '~/models/registeredUser.model'
import { FollowInteractionRepository } from '~/repositories/followInteraction.repository'
import { RegisteredUserRepository } from '~/repositories/registeredUser.repository'
import { NotificationEventManager } from '~/patterns/observers/notification-event-manager'

export class FollowInteractionService {
  constructor(
    private followInteractionRepository: FollowInteractionRepository,
    private userRepository: RegisteredUserRepository,
    private notificationEventManager: NotificationEventManager,
  ) {}

  public async getUserFollowInteraction(userId: string) {
    try {
      const followInteraction = await this.followInteractionRepository.findByUserId(userId)

      if (!followInteraction) {
        return { followers: [], following: [] }
      }

      return followInteraction
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

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

      let followerInteraction = await this.followInteractionRepository.findByUserId(followerId)
      let targetUserInteraction = await this.followInteractionRepository.findByUserId(targetUserId)

      if (!followerInteraction) {
        followerInteraction = new FollowInteraction(follower)
        await this.followInteractionRepository.addFollowInteraction(followerInteraction)
      }

      if (!targetUserInteraction) {
        targetUserInteraction = new FollowInteraction(targetUser)
        await this.followInteractionRepository.addFollowInteraction(targetUserInteraction)
      }

      const isAlreadyFollowing = targetUserInteraction.getFollowers().some((user) => user.getId() === followerId)
      if (isAlreadyFollowing) {
        throw new Error('Already following this user')
      }

      await this.followInteractionRepository.addFollower(targetUserInteraction.getId(), follower)
      await this.followInteractionRepository.addFollowing(followerInteraction.getId(), targetUser)

      // Notify observers about the follow event
      await this.notificationEventManager.notify({
        type: 'FOLLOW',
        data: {
          follower: follower,
          targetUser: targetUser,
        },
        timestamp: new Date(),
      })

      return
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  public async unfollowUser(followerId: string, targetUserId: string): Promise<void> {
    try {
      const follower = await this.userRepository.findById(followerId)
      const targetUser = await this.userRepository.findById(targetUserId)

      if (!follower) {
        throw new Error('Follower user not found')
      }

      if (!targetUser) {
        throw new Error('Target user not found')
      }

      const followerInteraction = await this.followInteractionRepository.findByUserId(followerId)
      const targetUserInteraction = await this.followInteractionRepository.findByUserId(targetUserId)

      if (!followerInteraction || !targetUserInteraction) {
        throw new Error('Follow interaction not found')
      }

      const isFollowing = targetUserInteraction.getFollowers().some((user) => user.getId() === followerId)
      if (!isFollowing) {
        throw new Error('Not following this user')
      }

      await this.followInteractionRepository.removeFollower(targetUserInteraction.getId(), followerId)
      await this.followInteractionRepository.removeFollowing(followerInteraction.getId(), targetUserId)

      return
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }
}
