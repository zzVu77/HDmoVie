import { Movie } from '~/models/movie.model'
import { MovieRepository } from '~/repositories/movie.repository'
import { CommentRepository } from '~/repositories/comment.repository'
import { MovieType } from '~/type'
import { CastService } from './cast.service'
import { GenreService } from './genre.service'
import { RateService } from './rate.service'
// import { RateService } from './rate.service'

export class MovieService {
  constructor(
    private movieRepository: MovieRepository,
    private castService: CastService,
    private genreService: GenreService,
    private commentRepository: CommentRepository,
    private rateService: RateService,
    // private rateService: RateService,
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

  async getMovieDetail(movieId: string, userId?: string) {
    try {
      // 1. Get movie info with genres and casts
      const movie = await this.movieRepository.findById(movieId)
      if (!movie) {
        throw new Error('Movie not found')
      }

      // 2. Get comments for movie
      const comments = await this.commentRepository.findCommentsByMovieId(movieId)

      // 3. Get rates for movie
      const rates = await this.rateService.getMovieRates(movieId)

      // 4. Transform comments to match frontend format
      const transformedComments = comments.map((comment) => {
        const userRate = rates.find((rate) => rate.getUser().getId() === comment.getUser().getId())
        return {
          id: comment.getId(),
          userName: comment.getUser().getFullName(),
          comment: comment.getContent(),
          rating: userRate ? userRate.getRateScore() : 0,
          date: comment.getDate(),
        }
      })

      // 5. Get up to 5 movies with same genres (excluding itself)
      const genres = movie.getGenres()
      const genreIds = genres.map((genre) => genre.getId())
      const relatedMovies = await this.movieRepository.findMoviesByGenreIds(genreIds, movieId, 5)

      // 6. Check if user has commented
      const hasCommented = userId
        ? comments.some((comment) => String(comment.getUser().getId()) === String(userId))
        : false
      console.log(userId, 'userId')
      // 7. Return combined data
      return {
        status: hasCommented,
        movie,
        comments: transformedComments,
        relatedMovies,
      }
    } catch (error) {
      if (error instanceof Error && error.message === 'Movie not found') {
        throw error
      }
      throw new Error('Failed to fetch movie details')
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
  async getMovieHighlights(): Promise<{
    latestMovies: Movie[]
    trendingMovies: Movie[]
    topRatedMovies: Movie[]
  }> {
    try {
      // Get 10 of each category
      const limit = 10

      const [latestMovies, trendingMovies, topRatedMovies] = await Promise.all([
        this.movieRepository.findLatestMovies(limit),
        this.movieRepository.findTrendingMovies(limit),
        this.movieRepository.findTopRatedMovies(limit),
      ])

      return {
        latestMovies,
        trendingMovies,
        topRatedMovies,
      }
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }
}
