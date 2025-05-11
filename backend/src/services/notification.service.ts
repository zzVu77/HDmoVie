import { NotificationRepository } from '../repositories/notification.repository'
import { RegisteredUserRepository } from '../repositories/registeredUser.repository'
import { CommentRepository } from '../repositories/comment.repository'
import { ReportRepository } from '../repositories/report.repository'
import { NotificationResponse } from '../type'
import { BlogReport } from '../models/blogReport.model'
import { CommentReport } from '../models/commentReport.model'
import { BlogComment } from '../models/blogComment.model'

export class NotificationService {
  constructor(
    private notificationRepository: NotificationRepository,
    private userRepository: RegisteredUserRepository,
    private commentRepository: CommentRepository,
    private reportRepository: ReportRepository,
  ) {}

  async getAllNotificationsForUser(userId: string): Promise<NotificationResponse[]> {
    const rawNotifications = await this.notificationRepository.findAllByOwner(userId)

    // Process notifications to include user names
    const processedNotifications = await Promise.all(
      rawNotifications.map(async (notification: any): Promise<NotificationResponse> => {
        const base: NotificationResponse = {
          id: notification.notification_id,
          time: notification.notification_time,
          status: notification.notification_status,
          type: notification.notification_type,
          userName: 'Unknown User', // Default value
        }

        switch (notification.notification_type) {
          case 'FOLLOW': {
            const follower = await this.userRepository.findById(notification.followerId)
            return {
              ...base,
              followerId: notification.followerId,
              userName: follower?.getFullName() || 'Unknown User',
            }
          }
          case 'LIKE': {
            const liker = await this.userRepository.findById(notification.userId)
            return {
              ...base,
              userId: notification.userId,
              userName: liker?.getFullName() || 'Unknown User',
            }
          }
          case 'COMMENT': {
            const comment = await this.commentRepository.findBlogCommentById(notification.commentId)
            if (comment) {
              const commentOwner = comment.getUser()
              return {
                ...base,
                commentId: notification.commentId,
                userName: commentOwner.getFullName(),
              }
            }
            return {
              ...base,
              commentId: notification.commentId,
              userName: 'Unknown User',
            }
          }
          case 'REPORT': {
            const report = await this.reportRepository.findBlogReportById(notification.reportId)
            if (report instanceof BlogReport) {
              const blog = report.getBlog()
              if (blog) {
                const blogOwner = blog.getUser()
                return {
                  ...base,
                  reportId: notification.reportId,
                  userName: blogOwner.getFullName(),
                }
              }
            } else {
              const commentReport = await this.reportRepository.findCommentReportById(notification.reportId)
              if (commentReport instanceof CommentReport) {
                const comment = commentReport.getComment()
                if (comment) {
                  const commentOwner = comment.getUser()
                  return {
                    ...base,
                    reportId: notification.reportId,
                    userName: commentOwner.getFullName(),
                  }
                }
              }
            }
            return {
              ...base,
              reportId: notification.reportId,
              userName: 'Unknown User',
            }
          }
          default:
            return base
        }
      }),
    )

    return processedNotifications
  }
}
