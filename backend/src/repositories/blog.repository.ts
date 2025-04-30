import { DataSource, FindOptionsWhere, Repository } from 'typeorm'
import { Blog } from '~/models/blog.model'

export class BlogRepository {
  private repository: Repository<Blog>

  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(Blog)
  }

  async findByUserId(userId: string, offset: number, amount: number): Promise<Blog[]> {
    try {
      return this.repository.find({
        where: { owner: { id: userId } } as FindOptionsWhere<Blog>,
        skip: offset,
        take: amount,
        relations: ['tags'],
      })
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }
}
