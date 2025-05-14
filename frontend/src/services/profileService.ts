import { BlogPost, FollowPeopleProps, RegisteredUserProps, WatchlistProps } from '@/types'
import { apiGet, apiPost } from '@/utils/axiosConfig'

// =========================================
// DEFINE RESPONSE STRUCTURE FROM ENDPOINT
// ========================================

export interface ProfileResponse {
  user: RegisteredUserProps
  followersCount: number
  followingCount: number
  isOwner: boolean
}

export interface FollowInteractionResponse {
  followers: FollowPeopleProps[]
  following: FollowPeopleProps[]
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

// Generic API fetch function
const getFromApi = async <T>(endpoint: string, context: string): Promise<T> => {
  try {
    const response = await apiGet<T | ErrorResponse>(endpoint)

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

// Generic API post function
const postApi = async <T, D = unknown>(endpoint: string, data: D, context: string): Promise<T> => {
  try {
    const response = await apiPost<T | ErrorResponse>(endpoint, data)

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

// ====================================
//              GET METHOD
// ====================================

export const getProfile = async (id?: string): Promise<ProfileResponse> => {
  if (!id) {
    return getFromApi<ProfileResponse>('/profiles/', 'fetching your profile')
  }
  return getFromApi<ProfileResponse>(`/profiles/${id}`, `fetching other profile with id ${id}`)
}

export const getFollowInteraction = async (userId?: string): Promise<FollowInteractionResponse> => {
  if (!userId) {
    throw new Error('Profile ID is required')
  }
  return getFromApi(`/profiles/${userId}/follow-interaction`, 'fetching follow interaction')
}

// All watchlists of a user
export const getWatchlists = async (userId?: string): Promise<WatchlistProps[]> => {
  if (!userId) {
    throw new Error('Profile ID is required')
  }
  return getFromApi(`/profiles/${userId}/watchlists`, 'fetching watchlists')
}

export const getBlogs = async (userId?: string): Promise<BlogPost[]> => {
  if (!userId) {
    throw new Error('Profile ID is required')
  }
  return getFromApi(`/profiles/${userId}/blogs`, 'fetching blogs')
}

// ====================================
//              POST METHOD
// ====================================

export const updateProfile = async (
  userId?: string,
  fullName?: string,
  dateOfBirth?: Date,
): Promise<RegisteredUserProps> => {
  return postApi(`/profiles/${userId}/update`, { fullName: fullName, dateOfBirth: dateOfBirth }, 'updating profile')
}
