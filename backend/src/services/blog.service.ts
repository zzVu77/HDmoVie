import { Blog } from '~/models/blog.model'
import { BlogMedia } from '~/models/blogMedia.model'
import { BlogRepository } from '~/repositories/blog.repository'
import { RegisteredUserRepository } from '~/repositories/registeredUser.repository'
import { TagRepository } from '~/repositories/tag.repository'

interface CreateBlogDTO {
  content: string
  userId: string
  tags: { id: string; name?: string }[]
  images?: { url: string }[]
}

interface BlogResponseDTO {
  id: string
  content: string
  dateCreated: Date
  owner: {
    id: string
    fullName?: string
  }
  tags: { id: string; name: string }[]
  imageUrls: { id: string; url: string }[]
  likeCount?: number
  commentCount?: number
  isLiked: boolean
}

export class BlogService {
  constructor(
    private blogRepository: BlogRepository,
    private userRepository: RegisteredUserRepository,
    private tagRepository: TagRepository,
  ) {}

  async getAllBlogs(userId: string): Promise<BlogResponseDTO[]> {
    const blogs = await this.blogRepository.findAll(userId)
    return blogs
  }

  async getBlogById(id: string, userId: string): Promise<BlogResponseDTO | null> {
    const blog = await this.blogRepository.findById(id, userId)
    return blog
  }

  async createBlog(blogData: CreateBlogDTO): Promise<BlogResponseDTO> {
    if (!this.userRepository || !this.tagRepository) {
      throw new Error('Missing required dependencies for blog creation')
    }

    const { content, userId, tags, images = [] } = blogData

    // Find the user
    const user = await this.userRepository.findById(userId)
    if (!user) {
      throw new Error('User not found')
    }

    // Find all tags
    const tagEntities = await Promise.all(
      tags.map(async (tag) => {
        const foundTag = await this.tagRepository.findById(tag.id)
        if (!foundTag) {
          throw new Error(`Tag with ID ${tag.id} not found`)
        }
        return foundTag
      }),
    )

    // Create new blog
    const blog = new Blog(user, content, tagEntities, [])

    // Create and associate blog media if any
    if (images.length > 0) {
      const mediaEntities = images.map((image) => new BlogMedia(image.url, blog))
      blog.imageUrls = mediaEntities
    }

    // Save blog with associated media (cascade: true in Blog model will save imageUrls)
    const savedBlog = await this.blogRepository.create(blog)

    // Return the saved blog through the repository's findById to ensure consistent format
    return await this.blogRepository.findById(savedBlog.getId(), userId)
  }

  async deleteBlog(blogId: string, userId: string): Promise<void> {
    const blog = await this.blogRepository.findById(blogId, userId)

    if (!blog) {
      throw new Error('Blog not found')
    }

    await this.blogRepository.delete(blogId)
  }

  public async getUserBlogs(userId: string, page: number): Promise<BlogResponseDTO[]> {
    try {
      const pageSize = 5
      const offset = page * pageSize
      return await this.blogRepository.findByUserId(userId, offset, pageSize)
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }
  async searchBlogs(query: string, userId: string): Promise<BlogResponseDTO[]> {
    if (!query.trim()) {
      return await this.getAllBlogs(userId)
    }

    const blogs = await this.blogRepository.searchBlogs(query, userId)
    return blogs
  }
}
