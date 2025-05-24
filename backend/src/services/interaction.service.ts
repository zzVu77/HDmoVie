import { LikeInteractionRepository } from '~/repositories/likeInteraction.repository'
import { RegisteredUserRepository } from '~/repositories/registeredUser.repository'
import { BlogRepository } from '~/repositories/blog.repository'
import { NotificationRepository } from '~/repositories/notification.repository'
import { LikeInteraction } from '../models/likeInteraction.model'
import { LikeNotification } from '../models/likeNotification.model'
import { DataSource } from 'typeorm'

export class InteractionService {
  private likeInteractionRepo: LikeInteractionRepository
  private userRepo: RegisteredUserRepository
  private blogRepo: BlogRepository
  private notificationRepo: NotificationRepository

  constructor(dataSource: DataSource) {
    this.likeInteractionRepo = new LikeInteractionRepository(dataSource)
    this.userRepo = new RegisteredUserRepository(dataSource)
    this.blogRepo = new BlogRepository(dataSource)
    this.notificationRepo = new NotificationRepository(dataSource)
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
    const blog = await this.blogRepo.findById(blogId)

    if (!user || !blog) {
      throw new Error('User or Blog not found')
    }

    let likeInteraction = await this.likeInteractionRepo.findLikeInteractionByBlogID(blog.getId())

    if (!likeInteraction) {
      likeInteraction = new LikeInteraction(blog)
    }

    const likers = likeInteraction.getLikers() || []
    let isLiking = false // Track if this is a like (not unlike)

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

    // Create notification only when liking (not unliking) and user is not blog owner
    const blogOwner = blog.getAuthor() // Assuming blog has getAuthor() method
    if (isLiking && blogOwner.getId() !== userId) {
      const likeNotification = new LikeNotification()
      Object.assign(likeNotification, {
        user: user,
        owner: blogOwner,
        time: new Date(),
        status: 'UNREAD',
      })

      await this.notificationRepo.save(likeNotification)
    }

    // Return the updated like interaction
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
