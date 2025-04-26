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
