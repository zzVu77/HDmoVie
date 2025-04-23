import { Request, Response } from 'express'
import { MovieService } from '~/services/movie.service'

export class MovieController {
  constructor(private movieService: MovieService) {}

  async getAllMovies(req: Request, res: Response): Promise<void> {
    try {
      const movies = await this.movieService.getAllMovies()
      res.json(movies)
    } catch (error) {
      console.error('Error fetching movies:', error)
      res.status(500).json({ message: 'Internal server error' })
    }
  }
}
