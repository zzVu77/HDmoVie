import { MovieCommentProps, MovieType } from '@/types'
import { apiDelete, apiGet, apiPost, apiPut } from '@/utils/axiosConfig'

// =Define the structure of the error response
export interface ErrorResponse {
  status: 'failed'
  message: string
}

// Define the structure of the response for highlight movies
export interface MoviesHighlightResponse {
  latestMovies: MovieType[]
  trendingMovies: MovieType[]
  topRatedMovies: MovieType[]
}

export interface MovieDetailResponse {
  status: boolean
  movie: MovieType
  relatedMovies: MovieType[]
  comments: MovieCommentProps[]
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
// Transform raw movie data to MovieType
export const transformToMovieType = (data: MovieType): MovieType => ({
  id: data.id,
  title: data.title,
  description: data.description,
  releaseYear: data.releaseYear,
  trailerSource: data.trailerSource,
  posterSource: data.posterSource,
  backdropSource: data.backdropSource,
  voteAvg: data.voteAvg,
  voteCount: data.voteCount,
  genres: data.genres,
  casts: data.casts,
})
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
// Fetch all movies
export const getMovies = async (): Promise<MovieType[]> => getFromApi<MovieType[]>('/movies', 'fetching movies')
// Fetch highlight movies
export const getHighlightMovies = async (): Promise<MoviesHighlightResponse> =>
  getFromApi<MoviesHighlightResponse>('/movies/highlights', 'fetching highlight movies')
// Fetch movie by ID
export const getMovieById = async (id: string): Promise<MovieDetailResponse> =>
  getFromApi<MovieDetailResponse>(`/movies/detail/${id}`, `fetching movie `)
// Fetch movie by Title
export const searchMoviesByTitle = async (title: string): Promise<MovieType[]> =>
  getFromApi<MovieType[]>(`/movies/search?title=${encodeURIComponent(title)}`, 'searching movies by title')

export const updateMovie = async (id: string, movieData: Partial<MovieType>): Promise<MovieType> => {
  try {
    const response = await apiPut<MovieType>(`/movies/update/${id}`, movieData)
    // if ('status' in response.data && response.data.status === 'failed') {
    //   throw response.data
    // }
    return transformToMovieType(response.data)
  } catch (error) {
    return handleApiError(error, 'updating movie')
  }
}
export const createMovie = async (movieData: Partial<MovieType>): Promise<MovieType> => {
  try {
    const response = await apiPost<MovieType>('/movies/create', movieData)
    return transformToMovieType(response.data)
  } catch (error) {
    return handleApiError(error, 'creating movie')
  }
}

export const deleteMovie = async (id: string): Promise<void> => {
  try {
    await apiDelete(`/movies/delete/${id}`, {})
  } catch (error) {
    return handleApiError(error, 'deleting movie')
  }
}
export const createNewWatchlist = async (title: string): Promise<void> => {
  try {
    await apiPost('/watchlists/create-fast', { title })
  } catch (error) {
    return handleApiError(error, 'fast creating new watchlist')
  }
}
export const addMovieToWatchlist = async (watchlistId: string, movieId: string): Promise<void> => {
  try {
    await apiPost(`/watchlists/${watchlistId}/add/${movieId}`, { movieId })
  } catch (error) {
    throw Error(error instanceof Error ? error.message : 'Failed to add movie to watchlist')
  }
}
