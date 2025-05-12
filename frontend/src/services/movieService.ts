import { MovieType } from '@/types'
import { apiGet } from '@/utils/axiosConfig'

// Define specific response types
export interface MoviesHighlightResponse {
  latestMovies: MovieType[]
  trendingMovies: MovieType[]
  topRatedMovies: MovieType[]
}

const handleApiError = (error: unknown, context: string): never => {
  const errorMessage = `Error in ${context}: ${error instanceof Error ? error.message : 'Unknown error'}`
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
    const response = await apiGet<T>(endpoint)
    return response.data
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
export const getMovieById = async (id: string): Promise<MovieType> =>
  getFromApi<MovieType>(`/movies/detail/${id}`, `fetching movie with id ${id}`)
