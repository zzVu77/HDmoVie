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

  async findAll(): Promise<Cast[]> {
    try {
      return await this.repository.find()
    } catch (error) {
      throw new Error(`Failed to find all casts: ${(error as Error).message}`)
    }
  }

  async create(castData: Cast): Promise<Cast> {
    try {
      const cast = this.repository.create(castData)
      return this.repository.save(cast)
    } catch (error) {
      throw new Error(`Failed to create cast: ${(error as Error).message}`)
    }
  }
  async delete(id: string): Promise<void> {
    try {
      await this.repository.delete(id)
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  async update(cast: Cast): Promise<Cast> {
    return this.repository.save(cast)
  }
}
