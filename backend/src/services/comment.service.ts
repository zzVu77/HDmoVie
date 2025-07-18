import { CommentRepository } from '~/repositories/comment.repository'
import { RegisteredUserRepository } from '~/repositories/registeredUser.repository'
import { MovieRepository } from '~/repositories/movie.repository'
import { BlogRepository } from '~/repositories/blog.repository'
import { MovieComment } from '~/models/movieComment.model'
import { BlogComment } from '~/models/blogComment.model'
import { Comment } from '~/models/comment.model'
import { NotificationEventManager } from '~/patterns/observers/notification-event-manager'

export class CommentService {
  constructor(
    private commentRepository: CommentRepository,
    private userRepository: RegisteredUserRepository,
    private movieRepository: MovieRepository,
    private blogRepository: BlogRepository,
    private notificationEventManager: NotificationEventManager,
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

  async getBlogComments(blogId: string, userId: string): Promise<BlogComment[]> {
    const blog = await this.blogRepository.findById(blogId, userId)
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

    // Notify observers about the comment event
    await this.notificationEventManager.notify({
      type: 'COMMENT',
      data: {
        comment: savedComment,
        blogOwner: blog.getOwner(),
      },
      timestamp: new Date(),
    })

    return savedComment
  }

  async getCommentById(id: string): Promise<Comment | null> {
    try {
      return this.commentRepository.findCommentById(id)
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  async deleteComment(commentId: string): Promise<void> {
    try {
      return this.commentRepository.deleteComment(commentId)
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  async getMovieComments(movieId: string): Promise<MovieComment[]> {
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
