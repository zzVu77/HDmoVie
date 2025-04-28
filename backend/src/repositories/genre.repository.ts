import { DataSource, FindOptionsWhere, In, Repository } from 'typeorm'
import { Genre } from '~/models/genre.model'
export class GenreRepository {
  private repository: Repository<Genre>

  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(Genre)
  }
  async findById(id: string): Promise<Genre | null> {
    return await this.repository.findOne({ where: { id } as FindOptionsWhere<Genre> })
  }
  async findByIds(ids: string[]): Promise<Genre[]> {
    return this.repository.find({ where: { id: In(ids) } as FindOptionsWhere<Genre> })
  }
}
