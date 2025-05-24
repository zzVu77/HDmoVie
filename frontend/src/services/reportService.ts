import { apiDelete, apiGet } from '@/utils/axiosConfig'
import { BlogCommentReportType, BlogReportType } from '@/types'

export const reportService = {
  /**
   * Fetch all blog comment reports for a blog
   */
  getBlogCommentReports: async (): Promise<BlogCommentReportType[]> => {
    try {
      const response = await apiGet<{ status: string; data: BlogCommentReportType[] }>('/reports/comment/blog')
      return response.data.data || []
    } catch {
      throw new Error('Failed to fetch blog comment reports')
    }
  },

  /**
   * Delete a blog comment report
   */
  deleteBlogCommentReport: async (commentId: string): Promise<void> => {
    try {
      await apiDelete(`/comments/blog/delete/${commentId}`)
    } catch {
      throw new Error('Failed to delete report')
    }
  },
  getBlogReports: async (): Promise<BlogReportType[]> => {
    try {
      const response = await apiGet<{ status: string; data: BlogReportType[] }>('/reports/blog')
      return response.data.data || []
    } catch {
      throw new Error('Failed to fetch blog comment reports')
    }
  },
  deleteBlogReport: async (blogId: string): Promise<void> => {
    try {
      await apiDelete(`/blogs/${blogId}`)
    } catch {
      throw new Error('Failed to delete report')
    }
  },
}

export default reportService
