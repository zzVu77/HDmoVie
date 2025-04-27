import { CommentRepository } from '~/repositories/comment.repository'
import { UserRepository } from '~/repositories/user.repository'
import { MovieRepository } from '~/repositories/movie.repository'
import { BlogRepository } from '~/repositories/blog.repository'

import { MovieComment } from '~/models/movieComment.model'
import { BlogComment } from '~/models/blogComment.model'
import { Blog } from '~/models/blog.model'

import { RegisteredUser } from '~/models/registeredUser.model'
import { Movie } from '~/models/movie.model'

export class CommentService {
  constructor(
    private commentRepository: CommentRepository,
    private userRepository: UserRepository, // Thêm userRepository vào constructor
    private movieRepository: MovieRepository, // Thêm movieRepository vào constructor
    private blogRepository: BlogRepository
  ) {}

  async commentOnMovie({
    userId,
    movieId,
    content,
    date,
    parentComment,
  }: {
    userId: string
    movieId: number
    content: string
    date: string
    parentComment: string | null
  }): Promise<MovieComment> {
    // Lấy user từ userId
    const user = await this.userRepository.findOne(userId) // Dùng userRepository
    if (!user) throw new Error('User not found')

    // Lấy movie từ movieId
    const movie = await this.movieRepository.findOne(movieId) // Dùng movieRepository
    if (!movie) throw new Error('Movie not found')

    // Tạo comment mới thông qua phương thức commentOnMovieDetail của user
    const movieComment = user.commentOnMovieDetail(movie, content)

    // Nếu có parentComment, gán lại parent cho comment
    if (parentComment) {
      const parent = await this.commentRepository.findMovieCommentById(parentComment)
      if (parent) {
        movieComment.setParentComment(parent)
      }
    }

    // Lưu comment vào database
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

    const comment = new BlogComment(
      user,
      content,
      new Date(),
      blog,
      parentComment
    )

    // Save the comment
    return this.commentRepository.saveBlogComment(comment)
  }
}
