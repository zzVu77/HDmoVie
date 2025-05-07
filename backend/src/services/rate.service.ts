import { Rate } from '~/models/rate.model'
import { RateRepository } from '~/repositories/rate.repository'
import { MovieRepository } from '~/repositories/movie.repository'
import { RegisteredUserRepository } from '~/repositories/registeredUser.repository'

export class RateService {
  constructor(
    private rateRepository: RateRepository,
    private movieRepository: MovieRepository,
    private userRepository: RegisteredUserRepository,
  ) {}

  async rateMovie(userId: string, movieId: string, score: number): Promise<Rate | null> {
    const user = await this.userRepository.findOne(userId)
    if (!user) throw new Error('User not found')

    const movie = await this.movieRepository.findById(movieId)
    if (!movie) throw new Error('Movie not found')

    const existingRate = await this.rateRepository.findByUserIdAndMovieId(userId, movieId)

    if (existingRate) {
      const oldScore = existingRate.rateScore
      existingRate.rateScore = score
      await this.rateRepository.update(existingRate)
      await this.updateMovieAverageRate(movie, score, oldScore)
      return this.rateRepository.findByIdWithMovie(existingRate.id)
    }

    const newRate = await this.rateRepository.create(new Rate({ rateScore: score, user, movie }))
    await this.updateMovieAverageRate(movie, score)
    return newRate
  }

  async getMovieRates(movieId: string): Promise<Rate[]> {
    return this.rateRepository.findByMovieId(movieId)
  }

  async deleteRate(movieId: string, userId: string): Promise<boolean> {
    const rate = await this.rateRepository.findByUserIdAndMovieId(userId, movieId)
    if (!rate) throw new Error('Rate not found')

    const movie = await this.movieRepository.findById(movieId)
    if (!movie) throw new Error('Movie not found')

    const success = await this.rateRepository.delete(rate.id)
    if (success) {
      await this.updateMovieAverageRate(movie, rate.rateScore, undefined, true)
    }
    return success
  }

  private async updateMovieAverageRate(
    movie: any,
    newScore: number,
    oldScore?: number,
    isRemoving: boolean = false,
  ): Promise<void> {
    const voteCount = movie.getVoteCount()
    const voteAvg = movie.getVoteAvg()
    const totalScore = voteAvg * voteCount
    let newVoteCount = voteCount
    let newAvg = voteAvg

    if (isRemoving) {
      newVoteCount = Math.max(0, voteCount - 1)
      newAvg = newVoteCount === 0 ? 0 : (totalScore - newScore) / newVoteCount
    } else if (oldScore !== undefined) {
      // Updating an existing rate
      newAvg = (totalScore - oldScore + newScore) / voteCount
    } else {
      // Adding a new rate
      newVoteCount += 1
      newAvg = (totalScore + newScore) / newVoteCount
    }

    newAvg = Math.round(newAvg * 1000) / 1000

    movie.updateMovie(
      movie.getTitle(),
      movie.getDescription(),
      movie.getReleaseYear(),
      movie.getTrailerSource(),
      movie.getPosterSource(),
      movie.getBackdropSource(),
      newAvg,
      newVoteCount,
      movie.getGenres(),
      movie.getCasts(),
    )

    await this.movieRepository.update(movie)
  }
}
