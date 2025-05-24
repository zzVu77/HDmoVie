import { apiDelete, apiGet } from '@/utils/axiosConfig'
import { BlogCommentReportType } from '@/types'

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
  deleteReport: async (commentId: string): Promise<void> => {
    try {
      await apiDelete(`/comments/blog/delete/${commentId}`)
    } catch {
      throw new Error('Failed to delete report')
    }
  },
}

export default reportService
