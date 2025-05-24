import { CommentRepository } from '~/repositories/comment.repository'
import { RegisteredUserRepository } from '~/repositories/registeredUser.repository'
import { MovieRepository } from '~/repositories/movie.repository'
import { BlogRepository } from '~/repositories/blog.repository'
import { NotificationRepository } from '~/repositories/notification.repository'
import { MovieComment } from '~/models/movieComment.model'
import { BlogComment } from '~/models/blogComment.model'
import { CommentNotification } from '~/models/commentNotification.model'
export class CommentService {
  constructor(
    private commentRepository: CommentRepository,
    private userRepository: RegisteredUserRepository,
    private movieRepository: MovieRepository,
    private blogRepository: BlogRepository,
    private notificationRepository: NotificationRepository,
  ) {}

  async commentOnMovie({
    userId,
    movieId,
    content,
    parentCommentId,
  }: {
    userId: string
    movieId: string
    content: string
    parentCommentId: string | null
  }): Promise<MovieComment> {
    const user = await this.userRepository.findOne(userId)
    if (!user) throw new Error('User not found')

    const movie = await this.movieRepository.findOneById(movieId)
    if (!movie) throw new Error('Movie not found')

    // Create a new blog comment
    let parentComment = undefined
    if (parentCommentId) {
      parentComment = await this.commentRepository.findCommentById(parentCommentId)
      if (!parentComment) {
        throw new Error('Parent comment not found')
      }
    }

    const movieComment = new MovieComment(user, content, new Date(), movie, parentComment)
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

    const blog = await this.blogRepository.findBlogById(blogId)
    if (!blog) throw new Error('Blog not found')

    let parentComment = undefined
    if (parentCommentId) {
      parentComment = await this.commentRepository.findCommentById(parentCommentId)
      if (!parentComment) {
        throw new Error('Parent comment not found')
      }
    }

    const blogComment = new BlogComment(user, content, new Date(), blog, parentComment)
    const savedComment = await this.commentRepository.saveBlogComment(blogComment)

    // Create notification for blog owner (if commenter is not the blog owner)
    const blogOwner = blog.getOwner()
    if (blogOwner.getId() !== userId) {
      const commentNotification = new CommentNotification()
      Object.assign(commentNotification, {
        comment: savedComment,
        owner: blogOwner,
        time: new Date(),
        status: 'UNREAD',
      })

      await this.notificationRepository.save(commentNotification)
    }

    return savedComment
  }
  // Get all comments for a specific movie
  async getMovieComments(movieId: string): Promise<MovieComment[]> {
    // Check if movie exists first
    const movie = await this.movieRepository.findById(movieId)
    if (!movie) {
      throw new Error('Movie not found')
    }
    const listMovieComments = this.commentRepository.findCommentsByMovieId(movieId)
    if (!listMovieComments || Array(listMovieComments).length === 0) {
      throw new Error('Movie comments not found')
    }
    return listMovieComments
  }
}
