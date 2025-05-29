import { WatchlistProps } from '@/types'
import { apiDelete, apiPost, apiPut } from '@/utils/axiosConfig'

// =========================================
// DEFINE RESPONSE STRUCTURE FROM ENDPOINT
// ========================================

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

// Generic API put function
const putApi = async <T, D = unknown>(endpoint: string, data: D, context: string): Promise<T> => {
  try {
    const response = await apiPut<T | ErrorResponse>(endpoint, data).catch((err) => {
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

// ====================================
//              POST METHOD
// ====================================

export const createWatchlist = async (
  title?: string,
  description?: string,
  isPublic?: boolean,
): Promise<WatchlistProps> => {
  return postApi(
    '/watchlists/create',
    { title: title, description: description, isPublic: isPublic },
    'create watchlist',
  )
}

// ====================================
//              PUT METHOD
// ====================================

export const updateWatchlist = async (
  wid?: string,
  title?: string,
  description?: string,
  isPublic?: boolean,
): Promise<WatchlistProps> => {
  return putApi(
    `/watchlists/${wid}/update`,
    { title: title, description: description, isPublic: isPublic },
    'update watchlist',
  )
}

// ====================================
//              DELETE METHOD
// ====================================

export const deleteWatchlist = async (wid?: string): Promise<void> => {
  if (!wid) {
    throw new Error("Watchlist doesn't exist, try again later!")
  }
  return delApi(`/watchlists/${wid}/delete`, 'delete watchlist')
}

export const deletMovieFromeWatchlist = async (wid?: string, mid?: string): Promise<void> => {
  if (!wid) {
    throw new Error("Watchlist doesn't exist, try again later!")
  }
  if (!mid) {
    throw new Error("Movie doesn't exist, try again later!")
  }
  return delApi(`/watchlists/${wid}/${mid}/delete`, 'delete movie from watchlist')
}
