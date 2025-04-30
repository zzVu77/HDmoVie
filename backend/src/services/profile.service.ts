import { RegisteredUser } from '~/models/registeredUser.model'
import { FollowInteraction } from '~/models/followInteraction.model'
import { Blog } from '~/models/blog.model'
// import { Watchlist } from "~/models/watchlist.model";

import { RegisteredUserRepository } from '~/repositories/registeredUser.repository'
import { FollowInteractionRepository } from '~/repositories/followInteraction.repository'
import { BlogRepository } from '~/repositories/blog.repository'
import { WatchlistRepository } from '~/repositories/watchlist.repository'
import { Watchlist } from '~/models/watchlist.model'

export class ProfileService {
  constructor(
    private registeredUserRepository: RegisteredUserRepository,
    private followInteractionRepository: FollowInteractionRepository,
    private blogRepository: BlogRepository,
    private watchlistRepository: WatchlistRepository,
  ) {}

  // Get user basic profile information: user information + follow information
  public async getProfile(userId: string) {
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
      }
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  // Get user blogs
  public async getUserBlogs(userId: string, page: number): Promise<Blog[]> {
    try {
      const pageSize = 5
      const offset = page * pageSize
      return this.blogRepository.findByUserId(userId, offset, pageSize)
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

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

  // Get user watchlists
  public async getUserWatchlists(userId: string, page: number): Promise<Watchlist[]> {
    try {
      const pageSize = 10
      const offset = page * pageSize
      return await this.watchlistRepository.findByUserId(userId, offset, pageSize)
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  // Get watchlist detail
  public async getWatchlistDetail(watchlistId: string, senderId: string): Promise<Watchlist | null> {
    try {
      const watchlist = await this.watchlistRepository.findById(watchlistId)

      if (!watchlist) {
        return null
      }

      const isOwner = watchlist.getOwner().getId() === senderId
      if (watchlist.isPrivate() && !isOwner) {
        throw new Error('Unauthorized access to private watchlist')
      }

      return watchlist
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }
}
