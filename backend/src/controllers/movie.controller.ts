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

  async createMovie(req: Request, res: Response): Promise<void> {
    try {
      const movieData = req.body
      const newMovie = await this.movieService.createMovie(movieData)
      res.status(201).json(newMovie)
    } catch (error) {
      console.error('Error creating movie:', error)
      res.status(400).json({ message: (error as Error).message })
    }
  }

  async getMovieById(req: Request, res: Response): Promise<void> {
    try {
      const movieId = req.params.id
      const movie = await this.movieService.getMovieById(movieId)
      if (!movie) {
        res.status(404).json({ message: 'Movie not found' })
        return
      }
      res.json(movie)
    } catch (error) {
      console.error('Error fetching movie:', error)
      res.status(500).json({ message: 'Internal server error' })
    }
  }

  async searchMoviesByTitle(req: Request, res: Response): Promise<void> {
    try {
      const { title } = req.query
      if (!title || typeof title !== 'string') {
        res.status(400).json({ message: 'Title query parameter is required' })
        return
      }
      const movies = await this.movieService.searchMoviesByTitle(title)
      res.json(movies)
    } catch (error) {
      console.error('Error searching movies:', error)
      res.status(500).json({ message: 'Internal server error' })
    }
  }

  async deleteMovie(req: Request, res: Response): Promise<void> {
    try {
      const movieId = req.params.id
      const movie = await this.movieService.getMovieById(movieId)
      if (!movie) {
        res.status(404).json({ message: 'Movie not found' })
        return
      }
      await this.movieService.deleteMovie(movieId)
      res.status(200).json({ message: 'Movie deleted successfully' })
    } catch (error) {
      console.error('Error deleting movie:', error)
      res.status(500).json({ message: 'Internal server error' })
    }
  }
}
