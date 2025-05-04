import { Movie } from '~/models/movie.model'
import { MovieRepository } from '~/repositories/movie.repository'
import { Genre } from '~/models/genre.model'
import { Cast } from '~/models/cast.model'
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
  async updateMovie(
    id: string,
    title: string,
    description: string,
    releaseYear: string,
    trailerSource: string,
    posterSource: string,
    backdropSource: string,
    voteAvg: number,
    voteCount: number,
    genres: Genre[],
    casts: Cast[],
  ): Promise<Movie | null> {
    const movie = await this.movieRepository.findById(id)
    if (!movie) {
      throw new Error('Movie not found')
    }
    const castIds = casts?.map((cast) => cast['id'])
    const castsData = castIds && (await this.castService.validateCasts(castIds))

    const genreIds = genres?.map((genre) => genre['id'])
    const genresData = genreIds && (await this.genreService.validateGenres(genreIds))
    const movieData = new Movie(
      title,
      description,
      releaseYear,
      trailerSource,
      posterSource,
      backdropSource,
      voteAvg,
      voteCount,
      genresData,
      castsData,
    )
    movie.updateMovie(
      movieData.getTitle(),
      movieData.getDescription(),
      movieData.getReleaseYear(),
      movieData.getTrailerSource(),
      movieData.getPosterSource(),
      movieData.getBackdropSource(),
      movieData.getVoteAvg(),
      movieData.getVoteCount(),
      movieData.getGenres(),
      movieData.getCasts(),
    )
    return this.movieRepository.update(movie)
  }
}
