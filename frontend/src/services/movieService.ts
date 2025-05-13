import { MovieCommentProps, MovieType } from '@/types'
import { apiGet } from '@/utils/axiosConfig'

// Định nghĩa kiểu cho response lỗi
export interface ErrorResponse {
  status: 'failed'
  message: string
}

// Định nghĩa kiểu cho response thành công
export interface MoviesHighlightResponse {
  latestMovies: MovieType[]
  trendingMovies: MovieType[]
  topRatedMovies: MovieType[]
}

export interface MovieDetailResponse {
  movie: MovieType
  relatedMovies: MovieType[]
  comments: MovieCommentProps[]
}

// Hàm xử lý lỗi
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
