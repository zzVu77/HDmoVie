import { apiGet, apiPut } from '@/utils/axiosConfig'

export interface Notification {
  id: string
  time: Date
  status: 'UNREAD' | 'READ'
  type: 'COMMENT' | 'FOLLOW' | 'LIKE' | 'REPORT'
  owner: {
    // user who received the notification
    id: string
    fullName: string
  }
  user: {
    // user who triggered the notification
    id: string
    fullName: string
  }
  reportId?: string // for report
  userId?: string // for like
  followerId?: string // for follow
  commentId?: string // for comment
  blogId?: string // for blog
}

export interface ApiResponse<T> {
  status: string
  data: T
}

/**
 * Service for handling all notification-related API requests
 */
export const NotificationService = {
  /**
   * Fetch all notifications for the current user
   */
  getAllNotifications: async () => {
    const response = await apiGet<Notification[]>('/notifications')
    return response
  },

  /**
   * Mark a specific notification as read
   */
  markAsRead: async (notificationId: string) => {
    const response = await apiPut<ApiResponse<void>>(`/notifications/${notificationId}/read`, {})
    return response
  },

  /**
   * Mark all notifications as read
   */
  markAllAsRead: async () => {
    const response = await apiPut<ApiResponse<void>>('/notifications/read-all', {})
    return response
  },
}

export default NotificationService
