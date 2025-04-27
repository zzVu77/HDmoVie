import { Genre } from '~/models/genre.model'
import { GenreRepository } from '~/repositories/genre.repository'

export class GenreService {
  constructor(private genreRepository: GenreRepository) {}

  async getAllGenres(): Promise<Genre[]> {
    try {
      return await this.genreRepository.findAll()
    } catch (error) {
      throw new Error(`Failed to get all genres: ${(error as Error).message}`)
    }
  }

  async createGenre(name: string): Promise<Genre> {
    try {
      const genreData = Genre.createNewGenre(name)
      return await this.genreRepository.create(genreData)
    } catch (error) {
      throw new Error(`Failed to create genre: ${(error as Error).message}`)
    }
  }
}
