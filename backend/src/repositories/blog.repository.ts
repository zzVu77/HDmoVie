import { DataSource, FindOptionsWhere, Repository } from 'typeorm'
import { Blog } from '~/models/blog.model'

export class BlogRepository {
  private repository: Repository<Blog>

  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(Blog)
  }

  async findById(id: string): Promise<any> {
    const blog = await this.repository
      .createQueryBuilder('blog')
      .select([
        'blog.id',
        'blog.content',
        'blog.dateCreated',
        'owner.id',
        'owner.fullName',
        'tags.id',
        'tags.name',
        'imageUrls.id',
        'imageUrls.url'
      ])
      .addSelect(
        `(SELECT COUNT(*) 
        FROM like_interactions_users liu 
        JOIN like_interactions li ON liu.likeInteractionId = li.id 
        WHERE li.blogId = blog.id)`,
        'likeCount',
      )
      .addSelect(
        `(SELECT COUNT(*) 
        FROM comments c 
        WHERE c.blogId = blog.id AND c.type = 'BLOG')`,
        'commentCount',
      )
      .leftJoin('blog.owner', 'owner')
      .leftJoin('blog.tags', 'tags')
      .leftJoin('blog.imageUrls', 'imageUrls')
      .where('blog.id = :id', { id })
      .getRawOne()

    if (!blog) {
      return null
    }

    return blog
  }

  async findAll(): Promise<any[]> {
    const blogs = await this.repository
      .createQueryBuilder('blog')
      .select([
        'blog.id',
        'blog.content',
        'blog.dateCreated',
        'owner.id',
        'owner.fullName',
        'tags.id',
        'tags.name',
        'imageUrls.id',
        'imageUrls.url'
      ])
      .addSelect(
        `(SELECT COUNT(*) 
        FROM like_interactions_users liu 
        JOIN like_interactions li ON liu.likeInteractionId = li.id 
        WHERE li.blogId = blog.id)`,
        'likeCount',
      )
      .addSelect(
        `(SELECT COUNT(*) 
        FROM comments c 
        WHERE c.blogId = blog.id AND c.type = 'BLOG')`,
        'commentCount',
      )
      .leftJoin('blog.owner', 'owner')
      .leftJoin('blog.tags', 'tags')
      .leftJoin('blog.imageUrls', 'imageUrls')
      .orderBy('blog.dateCreated', 'DESC')
      .getRawMany()

    return blogs
  }

  async create(blog: Blog): Promise<Blog> {
    return this.repository.save(blog)
  }

  async update(blog: Blog): Promise<Blog> {
    return this.repository.save(blog)
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id)
  }

  async findByUserId(userId: string, offset: number, limit: number): Promise<Blog[]> {
    try {
      return this.repository.find({
        where: { owner: { id: userId } } as FindOptionsWhere<Blog>,
        skip: offset,
        take: limit,
        relations: ['tags', 'imageUrls'],
        order: { dateCreated: 'DESC' },
      })
    } catch (error) {
      throw new Error(`Failed to find blogs by user ID: ${(error as Error).message}`)
    }
  }
}
