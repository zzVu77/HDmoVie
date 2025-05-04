import { DataSource, FindOptionsWhere, In, Repository } from 'typeorm'
import { Cast } from '~/models/cast.model'
export class CastRepository {
  private repository: Repository<Cast>

  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(Cast)
  }
  async findById(id: string): Promise<Cast | null> {
    return await this.repository.findOne({ where: { id } as FindOptionsWhere<Cast> })
  }
  async findByIds(ids: string[]): Promise<Cast[]> {
    return this.repository.find({ where: { id: In(ids) } as FindOptionsWhere<Cast> })
  }
}
