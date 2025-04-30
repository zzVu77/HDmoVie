import { CommentRepository } from '~/repositories/comment.repository'
import { UserRepository } from '~/repositories/user.repository'
import { MovieRepository } from '~/repositories/movie.repository'
import { BlogRepository } from '~/repositories/blog.repository'

import { MovieComment } from '~/models/movieComment.model'
import { BlogComment } from '~/models/blogComment.model'


export class CommentService {
  constructor(
    private commentRepository: CommentRepository,
    private userRepository: UserRepository, // Thêm userRepository vào constructor
    private movieRepository: MovieRepository, // Thêm movieRepository vào constructor
    private blogRepository: BlogRepository,
  ) {}

  async commentOnMovie({
    userId,
    movieId,
    content,
    parentCommentId,
  }: {
    userId: string
    movieId: number
    content: string
    parentCommentId: string | null
  }): Promise<MovieComment> {
    const user = await this.userRepository.findOne(userId)
    if (!user) throw new Error('User not found')

    const movie = await this.movieRepository.findOne(movieId)
    if (!movie) throw new Error('Movie not found')

    
    // Create a new blog comment
    let parentComment = undefined
    if (parentCommentId) {
      parentComment = await this.commentRepository.findCommentById(parentCommentId)
      if (!parentComment) {
        throw new Error('Parent comment not found')
      }
    }

    const movieComment = new MovieComment(
      user,
      content,
      new Date(),
      movie,
      parentComment
    )
    return this.commentRepository.saveMovieComment(movieComment)
  }
  async getBlogComments(blogId: string): Promise<BlogComment[]> {
    // Check if blog exists first
    const blog = await this.blogRepository.findById(blogId)
    if (!blog) {
      throw new Error('Blog not found')
    }

    return this.commentRepository.findCommentsByBlogId(blogId)
  }

  async commentOnBlog(userId: string, blogId: string, content: string, parentCommentId?: string): Promise<BlogComment> {
    const user = await this.userRepository.findOne(userId)
    if (!user) throw new Error('User not found')

    // Get the blog
    const blog = await this.blogRepository.findById(blogId)
    if (!blog) throw new Error('Blog not found')

    // Create a new blog comment
    let parentComment = undefined
    if (parentCommentId) {
      parentComment = await this.commentRepository.findCommentById(parentCommentId)
      if (!parentComment) {
        throw new Error('Parent comment not found')
      }
    }

    const blogComment = new BlogComment(
      user,
      content,
      new Date(),
      blog,
      parentComment
    )

    // Save the comment
    return this.commentRepository.saveBlogComment(blogComment)
  }
}
