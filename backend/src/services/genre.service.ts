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

  async createGenre(genreData: Genre): Promise<Genre> {
    try {
      return await this.genreRepository.create(genreData)
    } catch (error) {
      throw new Error(`Failed to create genre: ${(error as Error).message}`)
    }
  }
  async validateGenres(genreIds: string[]): Promise<Genre[]> {
    const genres = await this.genreRepository.findByIds(genreIds)
    if (genres.length !== genreIds.length) {
      throw new Error('One or more genre IDs do not exist')
    }
    return genres
  }
}
