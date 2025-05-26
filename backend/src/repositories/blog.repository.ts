import { DataSource, FindOptionsWhere, Repository } from 'typeorm'
import { Blog } from '~/models/blog.model'

export class BlogRepository {
  private repository: Repository<Blog>

  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(Blog)
  }

  // async findById(id: string): Promise<any> {
  //   const blogs = await this.repository
  //     .createQueryBuilder('blog')
  //     .select([
  //       'blog.id as blog_id',
  //       'blog.content as blog_content',
  //       'blog.dateCreated as blog_dateCreated',
  //       'owner.id as owner_id',
  //       'owner.fullName as owner_fullName',
  //       'tags.id as tags_id',
  //       'tags.name as tags_name',
  //       'imageUrls.id as imageUrls_id',
  //       'imageUrls.url as imageUrls_url',
  //     ])
  //     .addSelect(
  //       `(SELECT COUNT(*)
  //       FROM like_interactions_users liu
  //       JOIN like_interactions li ON liu.likeInteractionId = li.id
  //       WHERE li.blogId = blog.id)`,
  //       'likeCount',
  //     )
  //     .addSelect(
  //       `(SELECT COUNT(*)
  //       FROM comments c
  //       WHERE c.blogId = blog.id AND c.type = 'BLOG')`,
  //       'commentCount',
  //     )
  //     .leftJoin('blog.owner', 'owner')
  //     .leftJoin('blog.tags', 'tags')
  //     .leftJoin('blog.imageUrls', 'imageUrls')
  //     .where('blog.id = :id', { id })
  //     .getRawMany()

  //   if (!blogs.length) {
  //     return null
  //   }

  //   // Transform raw query results into proper structure
  //   return this.transformToResponseDTO(blogs)
  // }
  async findById(id: string, userId: string): Promise<any> {
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
      // Tổng số lượt like
      .addSelect(
        `(SELECT COUNT(*) 
        FROM like_interactions_users liu 
        JOIN like_interactions li ON liu.likeInteractionId = li.id 
        WHERE li.blogId = blog.id)`,
        'likeCount',
      )
      // Tổng số comment
      .addSelect(
        `(SELECT COUNT(*) 
        FROM comments c 
        WHERE c.blogId = blog.id AND c.type = 'BLOG')`,
        'commentCount',
      )
      // Check xem user có like bài viết không, trả về 1 hoặc 0
      .addSelect(
        `(SELECT 1 FROM like_interactions_users liu
        JOIN like_interactions li ON liu.likeInteractionId = li.id
        WHERE li.blogId = blog.id AND liu.userId = :userId
        LIMIT 1)`,
        'isLiked',
      )
      .leftJoin('blog.owner', 'owner')
      .leftJoin('blog.tags', 'tags')
      .leftJoin('blog.imageUrls', 'imageUrls')
      .where('blog.id = :id', { id })
      .setParameter('userId', userId)
      .getRawMany()

    if (!blogs.length) {
      return null
    }

    // Vì subquery có thể trả về NULL nếu không tìm thấy, nên chuyển thành 0 hoặc 1 trong transform
    return this.transformToResponseDTO(blogs)
  }

  async findBlogById(id: string): Promise<Blog | null> {
    const blog = await this.repository
      .createQueryBuilder('blog')
      .select(['blog.id', 'blog.content', 'blog.dateCreated', 'owner.id', 'owner.fullName', 'tags.id', 'tags.name'])
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
      .getOne()

    if (!blog) {
      return null
    }

    return blog
  }

  async findAll(userId: string): Promise<any[]> {
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
      // Check xem user có like bài viết không, trả về 1 hoặc 0
      .addSelect(
        `(SELECT 1 FROM like_interactions_users liu
        JOIN like_interactions li ON liu.likeInteractionId = li.id
        WHERE li.blogId = blog.id AND liu.userId = :userId
        LIMIT 1)`,
        'isLiked',
      )
      .leftJoin('blog.owner', 'owner')
      .leftJoin('blog.tags', 'tags')
      .leftJoin('blog.imageUrls', 'imageUrls')
      .orderBy('blog.dateCreated', 'DESC')
      .setParameter('userId', userId) // 👈 Thêm dòng này để truyền tham số

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
  async searchBlogs(query: string, userId: string): Promise<any[]> {
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
      .addSelect(
        `(SELECT 1 FROM like_interactions_users liu
      JOIN like_interactions li ON liu.likeInteractionId = li.id
      WHERE li.blogId = blog.id AND liu.userId = :userId
      LIMIT 1)`,
        'isLiked',
      )
      .leftJoin('blog.owner', 'owner')
      .leftJoin('blog.tags', 'tags')
      .leftJoin('blog.imageUrls', 'imageUrls')
      .where('LOWER(blog.content) LIKE LOWER(:query)', {
        query: `%${query}%`,
      })
      .orWhere('LOWER(owner.fullName) LIKE LOWER(:query)', {
        query: `%${query}%`,
      })
      .orWhere('LOWER(tags.name) LIKE LOWER(:query)', {
        query: `%${query}%`,
      })
      .orderBy('blog.dateCreated', 'DESC')
      .setParameter('userId', userId)
      .getRawMany()

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
          isLiked: Boolean(row.isLiked ?? false),
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
    const blogDict: { [key: string]: any } = {}
    const orderedBlogs: any[] = []

    for (const row of rawBlogs) {
      const blogId = row.blog_id

      if (!blogDict[blogId]) {
        // Create new blog entry
        const blog = {
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
          isLiked: Boolean(row.isLiked ?? false),
        }
        blogDict[blogId] = blog
        orderedBlogs.push(blog) // maintain order
      }

      // Add tag if not already present
      if (row.tags_id && !blogDict[blogId].tags.some((t: any) => t.id === row.tags_id)) {
        blogDict[blogId].tags.push({
          id: row.tags_id,
          name: row.tags_name,
        })
      }

      // Add imageUrl if not already present
      if (row.imageUrls_id && !blogDict[blogId].imageUrls.some((i: any) => i.id === row.imageUrls_id)) {
        blogDict[blogId].imageUrls.push({
          id: row.imageUrls_id,
          url: row.imageUrls_url,
        })
      }
    }

    return orderedBlogs
  }
}
