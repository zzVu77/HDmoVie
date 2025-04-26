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

      // Additional service-level validation using getters
      if (!movieInstance.getTitle() || movieInstance.getTitle().trim() === '') {
        throw new Error('Title is required and cannot be empty')
      }
      if (!movieInstance.getDescription() || movieInstance.getDescription().trim() === '') {
        throw new Error('Description is required and cannot be empty')
      }
      if (!movieInstance.getReleaseYear() || isNaN(Date.parse(movieInstance.getReleaseYear()))) {
        throw new Error('Release year is required and must be a valid date')
      }
      if (!movieInstance.getPosterSource() || movieInstance.getPosterSource().trim() === '') {
        throw new Error('Poster source is required and cannot be empty')
      }
      if (!movieInstance.getBackdropSource() || movieInstance.getBackdropSource().trim() === '') {
        throw new Error('Backdrop source is required and cannot be empty')
      }
      if (movieInstance.getVoteAvg() < 0 || movieInstance.getVoteAvg() > 10) {
        throw new Error('Vote average must be between 0 and 10')
      }
      if (movieInstance.getVoteCount() < 0) {
        throw new Error('Vote count must be a non-negative number')
      }
      if (!Array.isArray(movieInstance.getGenres()) || movieInstance.getGenres().length === 0) {
        throw new Error('At least one genre is required')
      }
      if (!Array.isArray(movieInstance.getCasts()) || movieInstance.getCasts().length === 0) {
        throw new Error('At least one cast member is required')
      }

      // Save the movie instance
      return await this.movieRepository.create(movieInstance)
    } catch (error) {
      throw new Error(`Failed to create movie: ${(error as Error).message}`)
    }
  }
  // async getMovieById(id: number): Promise<Movie | null> {
  //   return this.movieRepository.findById(id)
  // }

  // async createMovie(movieData: Partial<Movie>): Promise<Movie> {
  //   // Thêm logic validate hoặc xử lý business logic nếu cần
  //   if (!movieData.title || !movieData.description || !movieData.releaseDate) {
  //     throw new Error("Missing required fields");
  //   }
  //   return this.movieRepository.create(movieData);
  // }

  // async updateMovie(id: number, movieData: Partial<Movie>): Promise<Movie | null> {
  //   return this.movieRepository.update(id, movieData);
  // }

  // async deleteMovie(id: number): Promise<void> {
  //   return this.movieRepository.delete(id);
  // }

  // async findByTitle(title: string): Promise<Movie | null> {
  //   return this.movieRepository.findByTitle(title);
  // }
}
