import { Request, Response } from 'express'
import { GenreService } from '~/services/genre.service'

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
      const { name } = req.body
      const newGenre = await this.genreService.createGenre(name)
      res.status(201).json(newGenre)
    } catch (error) {
      console.error('Error creating movie:', error)
      res.status(400).json({ message: (error as Error).message })
    }
  }
}
