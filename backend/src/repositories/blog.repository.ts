import { DataSource, FindOptionsWhere, Repository } from 'typeorm'
import { Blog } from '~/models/blog.model'

export class BlogRepository {
  private repository: Repository<Blog>

  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(Blog)
  }

  async findByUserId(userId: string): Promise<Blog[]> {
    return this.repository.find({
      where: { owner: { id: userId } } as FindOptionsWhere<Blog>,
      relations: ['tags'],
    })
  }
}
