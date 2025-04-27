import { Movie } from '~/models/movie.model'
import { MovieRepository } from '~/repositories/movie.repository'
export class MovieService {
  constructor(private movieRepository: MovieRepository) {}

  async getAllMovies(): Promise<Movie[]> {
    try {
      return this.movieRepository.findAll()
    } catch (error) {
      throw new Error(`Failed to get all movies: ${(error as Error).message}`)
    }
  }

  async createMovie(movieData: Movie): Promise<Movie> {
    try {
      const movieInstance = Movie.createNewMovie(movieData)
      return await this.movieRepository.create(movieInstance)
    } catch (error) {
      throw new Error(`Failed to create movie: ${(error as Error).message}`)
    }
  }

  async getMovieById(id: string): Promise<Movie | null> {
    try {
      return this.movieRepository.findById(id)
    } catch (error) {
      throw new Error(`Failed to get movie by ID: ${(error as Error).message}`)
    }
  }

  async searchMoviesByTitle(title: string): Promise<Movie[]> {
    try {
      return this.movieRepository.searchByTitle(title)
    } catch (error) {
      throw new Error(`Failed to search movies by title: ${(error as Error).message}`)
    }
  }

  async deleteMovie(id: string): Promise<void> {
    try {
      await this.movieRepository.delete(id)
    } catch (error) {
      throw new Error(`Failed to delete movie: ${(error as Error).message}`)
    }
  }
}
