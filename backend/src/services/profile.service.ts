import { RegisteredUser } from '~/models/registeredUser.model'
import { FollowInteraction } from '~/models/followInteraction.model'
import { Blog } from '~/models/blog.model'
// import { Watchlist } from "~/models/watchlist.model";

import { UserRepository } from '~/repositories/user.repository'
import { FollowInteractionRepository } from '~/repositories/followInteraction.repository'
import { BlogRepository } from '~/repositories/blog.repository'

export class ProfileService {
  constructor(
    private userRepository: UserRepository,
    private followInteractionRepository: FollowInteractionRepository,
    private blogRepository: BlogRepository,
  ) {}

  public async getProfile(userId: string) {
    const user = await this.userRepository.findById(userId)

    // In case user does not exist
    if (!user) {
      return null
    }

    const userBlogs = await this.blogRepository.findByUserId(userId)
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
      blogs: userBlogs,
      followersCount: followerCount,
      followingCount: followingCount,
    }
  }
}
