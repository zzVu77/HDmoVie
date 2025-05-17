import { Request, Response } from 'express'
import { Movie } from '~/models/movie.model'
import { MovieService } from '~/services/movie.service'
import { MovieType } from '~/type'

export class MovieController {
  constructor(private movieService: MovieService) {}

  async getAllMovies(req: Request, res: Response): Promise<void> {
    try {
      const movies = await this.movieService.getAllMovies()
      // res.status(200).json({ status: 'success', data: movies })
      res.status(200).json(movies)
    } catch (error) {
      console.error('Error fetching movies:', error)
      res.status(500).json({ status: 'failed', message: 'Internal server error' })
    }
  }

  async createMovie(req: Request, res: Response): Promise<void> {
    try {
      const data = req.body
      const { title, description, releaseYear, trailerSource, posterSource, backdropSource, voteAvg, voteCount } = data

      const newMovie = await this.movieService.createMovie({
        title,
        description,
        releaseYear,
        trailerSource,
        posterSource,
        backdropSource,
        voteAvg,
        voteCount,
        genres: data.genres || [],
        casts: data.casts || [],
      })

      res.status(201).json({ status: 'success', data: newMovie })
    } catch (error) {
      console.error('Error creating movie:', error)
      res.status(400).json({ status: 'failed', message: (error as Error).message })
    }
  }

  async getMovieById(req: Request, res: Response): Promise<void> {
    try {
      const movieId = req.params.id
      let userId: string | undefined

      // Kiểm tra xem có token không (user đã đăng nhập chưa)
      if (res.locals.user) {
        userId = res.locals.user.id
      }

      if (!movieId) {
        res.status(400).json({ status: 'failed', message: 'Movie ID is required' })
        return
      }

      const movie = await this.movieService.getMovieDetail(movieId, userId)
      res.status(200).json(movie)
    } catch (error) {
      console.error('Error fetching movie:', error)
      if (error instanceof Error) {
        if (error.message === 'Movie not found') {
          res.status(404).json({ status: 'failed', message: error.message })
        } else {
          res.status(500).json({ status: 'failed', message: 'Internal server error' })
        }
      } else {
        res.status(500).json({ status: 'failed', message: 'Internal server error' })
      }
    }
  }

  async searchMoviesByTitle(req: Request, res: Response): Promise<void> {
    try {
      const { title } = req.query
      if (!title || typeof title !== 'string') {
        res.status(400).json({ status: 'failed', message: 'Title query parameter is required' })
        return
      }
      const movies = await this.movieService.searchMoviesByTitle(title)
      // res.status(200).json({ status: 'success', data: movies })
      res.status(200).json(movies)
    } catch (error) {
      console.error('Error searching movies:', error)
      res.status(500).json({ status: 'failed', message: 'Internal server error' })
    }
  }

  async deleteMovie(req: Request, res: Response): Promise<void> {
    try {
      const movieId = req.params.id
      const movie = await this.movieService.getMovieById(movieId)
      if (!movie) {
        res.status(404).json({ status: 'failed', message: 'Movie not found' })
        return
      }
      await this.movieService.deleteMovie(movieId)
      res.status(200).json({ status: 'success', message: 'Movie deleted successfully' })
    } catch (error) {
      console.error('Error deleting movie:', error)
      res.status(500).json({ status: 'failed', message: 'Internal server error' })
    }
  }

  async updateMovie(req: Request, res: Response): Promise<void> {
    try {
      const movieId = req.params.id
      const updatedMovie = await this.movieService.updateMovie(movieId, req.body as MovieType)
      if (!updatedMovie) {
        res.status(404).json({ status: 'failed', message: 'Movie not found' })
        return
      }
      res.status(200).json({ status: 'success', data: updatedMovie })
    } catch (error) {
      console.error('Updating movie failed ==>', error)
      res.status(500).json({ status: 'failed', message: 'Internal server error' })
    }
  }
  async getMovieHighlights(req: Request, res: Response): Promise<void> {
    try {
      const highlights = await this.movieService.getMovieHighlights()
      // res.status(200).json({ status: 'success', data: highlights })
      res.status(200).json(highlights)
    } catch (error) {
      console.error('Error fetching movie highlights:', error)
      res.status(500).json({ status: 'failed', message: 'Internal server error' })
    }
  }
}
