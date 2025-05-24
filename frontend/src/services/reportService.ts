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

class ReportService {
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
  }

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
  }
}

export default new ReportService()
