import { DataSource, Like, Repository } from 'typeorm'
import { Genre } from '~/models/genre.model'

export class GenreRepository {
  private repository: Repository<Genre>

  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(Genre)
  }

  async findAll(): Promise<Genre[]> {
    try {
      return await this.repository.find()
    } catch (error) {
      throw new Error(`Failed to find all genres: ${(error as Error).message}`)
    }
  }
}
