import { DataSource, FindOptionsWhere, Repository } from 'typeorm'
import { Blog } from '~/models/blog.model'

export class BlogRepository {
  private repository: Repository<Blog>

  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(Blog)
  }

  async findById(id: string): Promise<any> {
    const blogs = await this.repository
      .createQueryBuilder('blog')
      .select([
        'blog.id as blog_id',
        'blog.content as blog_content',
        'blog.dateCreated as blog_dateCreated',
        'owner.id as owner_id',
        'owner.fullName as owner_fullName',
        'tags.id as tags_id',
        'tags.name as tags_name',
        'imageUrls.id as imageUrls_id',
        'imageUrls.url as imageUrls_url',
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
      .getRawMany()

    if (!blogs.length) {
      return null
    }

    // Transform raw query results into proper structure
    return this.transformToResponseDTO(blogs)
  }

  async findAll(): Promise<any[]> {
    const blogs = await this.repository
      .createQueryBuilder('blog')
      .select([
        'blog.id as blog_id',
        'blog.content as blog_content',
        'blog.dateCreated as blog_dateCreated',
        'owner.id as owner_id',
        'owner.fullName as owner_fullName',
        'tags.id as tags_id',
        'tags.name as tags_name',
        'imageUrls.id as imageUrls_id',
        'imageUrls.url as imageUrls_url',
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

    // Group by blog_id and transform into the right structure
    return this.transformToResponseDTOList(blogs)
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

  async findByUserId(userId: string, offset: number, limit: number): Promise<any[]> {
    const blogs = await this.repository
      .createQueryBuilder('blog')
      .select([
        'blog.id as blog_id',
        'blog.content as blog_content',
        'blog.dateCreated as blog_dateCreated',
        'owner.id as owner_id',
        'owner.fullName as owner_fullName',
        'tags.id as tags_id',
        'tags.name as tags_name',
        'imageUrls.id as imageUrls_id',
        'imageUrls.url as imageUrls_url',
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
      .where('owner.id = :userId', { userId })
      .orderBy('blog.dateCreated', 'DESC')
      .skip(offset)
      .take(limit)
      .getRawMany()

    // Group by blog_id and transform into the right structure
    return this.transformToResponseDTOList(blogs)
  }

  // Helper method to transform raw query results
  private transformToResponseDTO(rawBlogs: any[]): any {
    const blogDict: { [key: string]: any } = {}

    for (const row of rawBlogs) {
      const blogId = row.blog_id

      if (!blogDict[blogId]) {
        // Create new blog entry
        blogDict[blogId] = {
          id: blogId,
          content: row.blog_content,
          dateCreated: row.blog_dateCreated,
          owner: {
            id: row.owner_id,
            fullName: row.owner_fullName,
          },
          tags: [],
          imageUrls: [],
          likeCount: parseInt(row.likeCount ?? '0'),
          commentCount: parseInt(row.commentCount ?? '0'),
        }
      }

      // Add tag if it doesn't exist and is not null
      if (row.tags_id && !blogDict[blogId].tags.some((t: any) => t.id === row.tags_id)) {
        blogDict[blogId].tags.push({
          id: row.tags_id,
          name: row.tags_name,
        })
      }

      // Add imageUrl if it doesn't exist and is not null
      if (row.imageUrls_id && !blogDict[blogId].imageUrls.some((i: any) => i.id === row.imageUrls_id)) {
        blogDict[blogId].imageUrls.push({
          id: row.imageUrls_id,
          url: row.imageUrls_url,
        })
      }
    }

    // Return the single blog object
    return Object.values(blogDict)[0]
  }

  // Helper method to transform raw query results
  private transformToResponseDTOList(rawBlogs: any[]): any[] {
    // Use a dictionary to group by blog_id
    const blogDict: { [key: string]: any } = {}

    for (const row of rawBlogs) {
      const blogId = row.blog_id

      if (!blogDict[blogId]) {
        // Create new blog entry
        blogDict[blogId] = {
          id: blogId,
          content: row.blog_content,
          dateCreated: row.blog_dateCreated,
          owner: {
            id: row.owner_id,
            fullName: row.owner_fullName,
          },
          tags: [],
          imageUrls: [],
          likeCount: parseInt(row.likeCount ?? '0'),
          commentCount: parseInt(row.commentCount ?? '0'),
        }
      }

      // Add tag if it doesn't exist and is not null
      if (row.tags_id && !blogDict[blogId].tags.some((t: any) => t.id === row.tags_id)) {
        blogDict[blogId].tags.push({
          id: row.tags_id,
          name: row.tags_name,
        })
      }

      // Add imageUrl if it doesn't exist and is not null
      if (row.imageUrls_id && !blogDict[blogId].imageUrls.some((i: any) => i.id === row.imageUrls_id)) {
        blogDict[blogId].imageUrls.push({
          id: row.imageUrls_id,
          url: row.imageUrls_url,
        })
      }
    }

    // Return the list of blog objects
    return Object.values(blogDict)
  }
}
