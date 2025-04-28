import { Movie } from '~/models/movie.model'
import { MovieRepository } from '~/repositories/movie.repository'
import { MovieType } from '~/type'
import { CastService } from './cast.service'
import { GenreService } from './genre.service'
export class MovieService {
  constructor(
    private movieRepository: MovieRepository,
    private castService: CastService,
    private genreService: GenreService,
  ) {}

  async getAllMovies(): Promise<Movie[]> {
    try {
      return this.movieRepository.findAll()
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  async createMovie(movieData: Movie): Promise<Movie> {
    try {
      return await this.movieRepository.create(movieData)
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  async getMovieById(id: string): Promise<Movie | null> {
    try {
      return this.movieRepository.findById(id)
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  async searchMoviesByTitle(title: string): Promise<Movie[]> {
    try {
      return this.movieRepository.searchByTitle(title)
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  async deleteMovie(id: string): Promise<void> {
    try {
      await this.movieRepository.delete(id)
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }
  async updateMovie(id: string, movieData: Partial<MovieType>): Promise<Movie | null> {
    const movie = await this.movieRepository.findById(id)
    if (!movie) {
      throw new Error('Movie not found')
    }
    const castIds = movieData.casts?.map((cast) => cast.id)
    const casts = castIds && (await this.castService.validateCasts(castIds))
    const genreIds = movieData.genres?.map((genre) => genre.id)
    const genres = genreIds && (await this.genreService.validateGenres(genreIds))
    movie.updateMovie(
      movieData.title,
      movieData.description,
      movieData.releaseYear,
      movieData.trailerSource,
      movieData.posterSource,
      movieData.backdropSource,
      movieData.voteAvg,
      movieData.voteCount,
      genres,
      casts,
    )
    return this.movieRepository.update(movie)
  }
}
