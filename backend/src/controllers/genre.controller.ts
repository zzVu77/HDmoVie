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
}
