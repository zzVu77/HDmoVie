import { Genre } from '~/models/genre.model'
import { GenreRepository } from '~/repositories/genre.repository'

export class GenreService {
  constructor(private genreRepository: GenreRepository) {}
  async validateGenres(genreIds: string[]): Promise<Genre[]> {
    const genres = await this.genreRepository.findByIds(genreIds)
    if (genres.length !== genreIds.length) {
      throw new Error('One or more genre IDs do not exist')
    }
    return genres
  }
}
