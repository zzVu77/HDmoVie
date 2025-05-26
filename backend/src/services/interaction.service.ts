import { LikeInteractionRepository } from '~/repositories/likeInteraction.repository'
import { RegisteredUserRepository } from '~/repositories/registeredUser.repository'
import { BlogRepository } from '~/repositories/blog.repository'
import { LikeInteraction } from '../models/likeInteraction.model'
import { DataSource } from 'typeorm'
import { NotificationEventManager } from '~/patterns/observers/notification-event-manager'

export class InteractionService {
  private likeInteractionRepo: LikeInteractionRepository
  private userRepo: RegisteredUserRepository
  private blogRepo: BlogRepository

  constructor(
    dataSource: DataSource,
    private notificationEventManager: NotificationEventManager,
  ) {
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
    let isLiking = false

    if (!likers || likers.length === 0) {
      user.likeBlog(likeInteraction)
      isLiking = true
    } else {
      const userHasLiked = likers.some((liker) => liker.getId() === user.getId())
      if (userHasLiked) {
        user.unlikeBlog(likeInteraction)
        isLiking = false
      } else {
        user.likeBlog(likeInteraction)
        isLiking = true
      }
    }

    await this.likeInteractionRepo.save(likeInteraction)

    // Notify observers about the like event if user is not blog owner
    const blogOwner = blog.getOwner()
    if (isLiking && blogOwner.getId() !== userId) {
      await this.notificationEventManager.notify({
        type: 'LIKE',
        data: {
          likeInteraction: likeInteraction,
          blogOwner: blogOwner,
          isLiking: isLiking,
        },
        timestamp: new Date(),
      })
    }

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
