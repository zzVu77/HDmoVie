import { DataSource, FindOptionsWhere, In, Repository } from 'typeorm'
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
  async create(genreData: Genre): Promise<Genre> {
    try {
      const genre = this.repository.create(genreData)
      return this.repository.save(genre)
    } catch (error) {
      throw new Error(`Failed to create genre: ${(error as Error).message}`)
    }
  }
  async findById(id: string): Promise<Genre | null> {
    return await this.repository.findOne({ where: { id } as FindOptionsWhere<Genre> })
  }
  async findByIds(ids: string[]): Promise<Genre[]> {
    return this.repository.find({ where: { id: In(ids) } as FindOptionsWhere<Genre> })
  }

  async delete(id: string): Promise<void> {
    try {
      await this.repository.delete(id)
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  async update(genre: Genre): Promise<Genre> {
    return this.repository.save(genre)
  }
}
