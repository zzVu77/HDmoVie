import { apiDelete, apiGet } from '@/utils/axiosConfig'
import { BlogCommentReportType, BlogReportType } from '@/types'
import { apiPost } from '@/utils/axiosConfig'

// Define the structure of the error response
export interface ErrorResponse {
  status: 'failed'
  message: string
}

// Define the structure of the report response
export interface ReportResponse {
  status: 'success'
  data: {
    id: string
    reason: string
    reporterId: string
    targetId: string
    type: 'blog' | 'comment'
    dateCreated: string
  }
}

// Function to handle API errors
const handleApiError = (error: unknown, context: string): never => {
  let errorMessage = `Error in ${context}: Unknown error`

  if (typeof error === 'object' && error !== null && 'status' in error && 'message' in error) {
    const apiError = error as ErrorResponse
    errorMessage = `Error in ${context}: ${apiError.message}`
  } else if (error instanceof Error) {
    errorMessage = `Error in ${context}: ${error.message}`
  }
  throw new Error(errorMessage)
}

export const reportService = {
  async reportBlog(blogId: string, reason: string): Promise<ReportResponse> {
    try {
      const response = await apiPost<ReportResponse>('/reports/blog', {
        blogId,
        reason,
      })
      return response.data
    } catch (error) {
      return handleApiError(error, 'reporting blog')
    }
  },

  async reportComment(commentId: string, reason: string): Promise<ReportResponse> {
    try {
      const response = await apiPost<ReportResponse>('/reports/comment', {
        commentId,
        reason,
      })
      return response.data
    } catch (error) {
      return handleApiError(error, 'reporting comment')
    }
  },
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
  deleteCommentReport: async (commentId: string): Promise<void> => {
    try {
      await apiDelete(`/comments/delete/${commentId}`)
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
  getMovieCommentReports: async (): Promise<BlogReportType[]> => {
    try {
      const response = await apiGet<{ status: string; data: BlogReportType[] }>('/reports/comment/movie')
      return response.data.data || []
    } catch {
      throw new Error('Failed to fetch blog comment reports')
    }
  },
}

export default reportService
