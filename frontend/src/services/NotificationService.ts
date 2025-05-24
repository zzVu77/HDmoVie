import { apiGet, apiPut } from '@/utils/axiosConfig'

export interface Notification {
  id: string
  time: Date
  status: 'UNREAD' | 'READ'
  type: 'COMMENT' | 'FOLLOW' | 'LIKE' | 'REPORT'
  owner: {
    id: string
    fullName: string
  }
  commentId?: string
  followerId?: string
  userId?: string
  reportId?: string
}

export interface ApiResponse<T> {
  data: T
  status: string
}

/**
 * Service for handling all notification-related API requests
 */
export const NotificationService = {
  /**
   * Fetch all notifications for the current user
   */
  getAllNotifications: () => {
    return apiGet<ApiResponse<Notification[]>>('/notifications')
  },

  /**
   * Mark a specific notification as read
   */
  markAsRead: (notificationId: string) => {
    return apiPut<ApiResponse<void>>(`/notifications/${notificationId}/read`, {})
  },

  /**
   * Mark all notifications as read
   */
  markAllAsRead: () => {
    return apiPut<ApiResponse<void>>('/notifications/read-all', {})
  },
}

export default NotificationService
