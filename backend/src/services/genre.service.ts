import { Genre } from '~/models/genre.model'
import { GenreRepository } from '~/repositories/genre.repository'
import { GenreType } from '~/type'

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

  async getGenreById(id: string): Promise<Genre | null> {
    try {
      return this.genreRepository.findById(id)
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  async deleteGenre(id: string): Promise<void> {
    try {
      await this.genreRepository.delete(id)
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }
  async updateGenre(id: string, genreName: string): Promise<Genre | null> {
    const genre = await this.genreRepository.findById(id)

    const genreData = new Genre(genreName)
    if (!genre) {
      throw new Error('Genre not found')
    }
    genre.updateGenre(genreData.getName())
    return this.genreRepository.update(genre)
  }
}
