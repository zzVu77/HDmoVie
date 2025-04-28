import { LikeInteractionRepository } from '~/repositories/likeInteraction.repository'
import { UserRepository } from '~/repositories/user.repository'
import { BlogRepository } from '~/repositories/blog.repository'
import { LikeInteraction } from '../models/likeInteraction.model'
import { DataSource } from 'typeorm'

export class InteractionService {
  private likeInteractionRepo: LikeInteractionRepository
  private userRepo: UserRepository
  private blogRepo: BlogRepository

  constructor(dataSource: DataSource) {
    this.likeInteractionRepo = new LikeInteractionRepository(dataSource)
    this.userRepo = new UserRepository(dataSource)
    this.blogRepo = new BlogRepository(dataSource)
  }

  async likeBlog(blogId: string, userId: string): Promise<LikeInteraction> {
    const user = await this.userRepo.findOne(userId)
    const blog = await this.blogRepo.findById(blogId)

    if (!user || !blog) {
      throw new Error('User or Blog not found')
    }

    // Chỉ tìm bằng blogId
    let likeInteraction = await this.likeInteractionRepo.findLikeInteractionByTarget(blog.getId())

    if (!likeInteraction) {
      likeInteraction = new LikeInteraction(blog)
    }

    const likers = likeInteraction.getLikers() || []
    // Nếu likers không tồn tại hoặc rỗng
    if (!likers || likers.length === 0) {
      user.likeBlog(likeInteraction)
    } else {
      const userHasLiked = likers.some((liker) => liker.getId() === user.getId())

      if (userHasLiked) {
        user.unlikeBlog(likeInteraction)
      } else {
        user.likeBlog(likeInteraction)
      }
    }

    return this.likeInteractionRepo.save(likeInteraction)
  }
}
