import { DataSource, Repository, In } from 'typeorm'
import { Blog } from '~/models/blog.model'
import { BlogComment } from '~/models/blogComment.model'

export class BlogRepository {
  private repository: Repository<Blog>

  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(Blog)
  }

  async findById(id: string): Promise<Blog | null> {
    return this.repository.findOne({
      where: { id },
      relations: ['owner', 'tags'],
    })
  }

  async findAll(): Promise<Blog[]> {
    return this.repository.find({
      relations: ['owner', 'tags'],
    })
  }

  async create(blog: Blog): Promise<Blog> {
    return this.repository.save(blog)
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id)
  }
}
