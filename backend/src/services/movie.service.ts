import { Movie } from '~/models/movie.model'
import { MovieRepository } from '~/repositories/movie.repository'
export class MovieService {
  constructor(private movieRepository: MovieRepository) {}

  async getAllMovies(): Promise<Movie[]> {
    return this.movieRepository.findAll()
  }

  async createMovie(movieData: Movie): Promise<Movie> {
    try {
      // Create Movie instance using createNewMovie
      const movieInstance = Movie.createNewMovie(movieData)
      // Save the movie instance
      return await this.movieRepository.create(movieInstance)
    } catch (error) {
      throw new Error(`Failed to create movie: ${(error as Error).message}`)
    }
  }

}
