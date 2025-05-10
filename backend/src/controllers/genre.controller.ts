import { Request, Response } from 'express'
import { GenreService } from '~/services/genre.service'
import { Genre } from '~/models/genre.model'

export class GenreController {
  constructor(private genreService: GenreService) {}

  async getAllGenres(req: Request, res: Response): Promise<void> {
    try {
      const genres = await this.genreService.getAllGenres()
      res.json(genres)
    } catch (error) {
      console.error('Error fetching genres:', error)
      res.status(500).json({ message: 'Internal server error' })
    }
  }
  async createGenre(req: Request, res: Response): Promise<void> {
    try {
      const user = res.locals.user
      const isAdmin = user?.role === 'ADMIN'
      if (!isAdmin) {
        res.status(403).json({ message: 'Forbidden: Admins only' })
        return
      }

      const data = req.body
      const genreData = new Genre(data.name)
      const newGenre = await this.genreService.createGenre(genreData)
      res.status(201).json(newGenre)
    } catch (error) {
      console.error('Error creating Genre:', error)
      res.status(400).json({ message: (error as Error).message })
    }
  }

  async deleteGenre(req: Request, res: Response): Promise<void> {
    try {
      const user = res.locals.user
      const isAdmin = user?.role === 'ADMIN'
      if (!isAdmin) {
        res.status(403).json({ message: 'Forbidden: Admins only' })
        return
      }

      const genreId = req.params.id
      const genre = await this.genreService.getGenreById(genreId)
      if (!genre) {
        res.status(404).json({ message: 'Genre not found' })
        return
      }
      await this.genreService.deleteGenre(genreId)
      res.status(200).json({ message: 'Genre deleted successfully' })
    } catch (error) {
      console.error('Error deleting genre:', error)
      res.status(500).json({ message: 'Internal server error' })
    }
  }

  async updateGenre(req: Request, res: Response): Promise<void> {
    try {
      const user = res.locals.user
      const isAdmin = user?.role === 'ADMIN'
      if (!isAdmin) {
        res.status(403).json({ message: 'Forbidden: Admins only' })
        return
      }

      const genreId = req.params.id
      const updatedGenre = await this.genreService.updateGenre(genreId, req.body.name)
      if (!updatedGenre) {
        res.status(404).json({ message: 'Genre not found' })
        return
      }
      res.json(updatedGenre)
    } catch (error) {
      console.error('Updating genre failed ==>', error)
      res.status(500).json({ message: 'Internal server error' })
    }
  }
}
