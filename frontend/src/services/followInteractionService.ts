import { apiDelete, apiPost } from '@/utils/axiosConfig'

// =========================================
// DEFINE RESPONSE STRUCTURE FROM ENDPOINT
// ========================================

export interface FollowInteractionResponse {
  status: string
  message: string
}

// ====================================
//  GENERAL CONFIGURATION FOR API CALL
// ====================================

// Define the structure of the error response
export interface ErrorResponse {
  status: 'failed'
  message: string
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

// Generic API post function
const postApi = async <T, D = unknown>(endpoint: string, data: D, context: string): Promise<T> => {
  try {
    const response = await apiPost<T | ErrorResponse>(endpoint, data).catch((err) => {
      throw err.response.data
    })

    if (
      typeof response.data === 'object' &&
      response.data !== null &&
      'status' in response.data &&
      response.data.status === 'failed'
    ) {
      throw response.data
    }
    return response.data as T
  } catch (error) {
    return handleApiError(error, context)
  }
}

// Generic API del function
const delApi = async <T>(endpoint: string, context: string): Promise<T> => {
  try {
    const response = await apiDelete<T | ErrorResponse>(endpoint).catch((err) => {
      throw err.response.data
    })

    if (
      typeof response.data === 'object' &&
      response.data !== null &&
      'status' in response.data &&
      response.data.status === 'failed'
    ) {
      throw response.data
    }
    return response.data as T
  } catch (error) {
    return handleApiError(error, context)
  }
}

export const followUser = async (targetUserId?: string): Promise<FollowInteractionResponse> => {
  if (!targetUserId) {
    throw new Error('Target ID is required')
  }
  return postApi(`/follow/follow/${targetUserId}`, {}, 'following user')
}

export const unFollowUser = async (targetUserId?: string): Promise<FollowInteractionResponse> => {
  if (!targetUserId) {
    throw new Error('Target ID is required')
  }
  return delApi(`/follow/unfollow/${targetUserId}`, 'unfollowing user')
}
