import { LikeInteractionRepository } from '~/repositories/likeInteraction.repository'
import { RegisteredUserRepository } from '~/repositories/registeredUser.repository'
import { BlogRepository } from '~/repositories/blog.repository'
import { LikeInteraction } from '../models/likeInteraction.model'
import { DataSource } from 'typeorm'

export class InteractionService {
  private likeInteractionRepo: LikeInteractionRepository
  private userRepo: RegisteredUserRepository
  private blogRepo: BlogRepository

  constructor(dataSource: DataSource) {
    this.likeInteractionRepo = new LikeInteractionRepository(dataSource)
    this.userRepo = new RegisteredUserRepository(dataSource)
    this.blogRepo = new BlogRepository(dataSource)
  }

  async likeBlog(
    blogId: string,
    userId: string,
  ): Promise<{
    id: string
    blogId: string
    likers: { id: string; fullName: string; email: string }[]
  }> {
    const user = await this.userRepo.findOne(userId)
    const blog = await this.blogRepo.findBlogById(blogId)

    if (!user || !blog) {
      throw new Error('User or Blog not found')
    }
    let likeInteraction = await this.likeInteractionRepo.findLikeInteractionByBlogID(blog.getId())

    if (!likeInteraction) {
      likeInteraction = new LikeInteraction(blog)
    }

    const likers = likeInteraction.getLikers() || []
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

    await this.likeInteractionRepo.save(likeInteraction)

    // Refetch để đảm bảo `blog` và `likers` được load đầy đủ
    const saved = await this.likeInteractionRepo.findLikeInteractionByBlogID(blog.getId())
    if (!saved) throw new Error('LikeInteraction not found after save')

    const sanitizedLikers = (saved.getLikers() || []).map((liker) => ({
      id: liker.getId(),
      fullName: liker.getFullName(),
      email: liker.getEmail(),
    }))

    return {
      id: saved.getId(),
      blogId: blogId,
      likers: sanitizedLikers,
    }
  }
}
