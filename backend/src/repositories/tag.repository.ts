import { DataSource, FindOptionsWhere, Repository } from 'typeorm'
import { Tag } from '~/models/tag.model'

export class TagRepository {
  private repository: Repository<Tag>

  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(Tag)
  }

  async findAll(): Promise<Tag[]> {
    try {
      return this.repository.find()
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  async findById(id: string): Promise<Tag | null> {
    try {
      return this.repository.findOne({
        where: { id } as FindOptionsWhere<Tag>,
      })
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  async create(tagData: Tag): Promise<Tag> {
    try {
      return this.repository.save(tagData)
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.repository.delete(id)
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  async findByName(name: string): Promise<Tag | null> {
    try {
      return this.repository.findOne({
        where: { name } as FindOptionsWhere<Tag>,
      })
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }
}
