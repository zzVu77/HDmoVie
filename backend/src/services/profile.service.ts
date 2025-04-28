import { RegisteredUser } from '~/models/registeredUser.model'
import { FollowInteraction } from '~/models/followInteraction.model'
import { Blog } from '~/models/blog.model'
// import { Watchlist } from "~/models/watchlist.model";

import { RegisteredUserRepository } from '~/repositories/user.repository'
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
  }

  // Get user blogs
  public async getUserBlogs(userId: string, page: number): Promise<Blog[]> {
    const pageSize = 5
    const offset = page * pageSize
    return this.blogRepository.findByUserId(userId, offset, pageSize)
  }

  // Get user follower list
  public async getUserFollowers(userId: string): Promise<RegisteredUser[]> {
    const followInteraction = await this.followInteractionRepository.findByUserId(userId)

    if (!followInteraction) {
      return []
    }

    return followInteraction.getFollowers()
  }

  // Get user following list
  public async getUserFollowings(userId: string): Promise<RegisteredUser[]> {
    const followInteraction = await this.followInteractionRepository.findByUserId(userId)

    if (!followInteraction) {
      return []
    }

    return followInteraction.getFollowings()
  }

  // Get user watchlists
  public async getUserWatchlists(userId: string, page: number): Promise<Watchlist[]> {
    const pageSize = 10
    const offset = page * pageSize
    return this.watchlistRepository.findByUserId(userId, offset, pageSize)
  }
}
