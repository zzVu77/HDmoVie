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
    private blogRepository: BlogRepository,
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
    const user = await this.userRepository.findOne(userId)
    if (!user) throw new Error('User not found')

    const movie = await this.movieRepository.findOne(movieId)
    if (!movie) throw new Error('Movie not found')

    const movieComment = user.commentOnMovieDetail(movie, content)

    if (parentComment) {
      const parent = await this.commentRepository.findMovieCommentById(parentComment)
      if (parent) {
        movieComment.setParentComment(parent)
      }
    }

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
    let parentComment: BlogComment | undefined
    if (parentCommentId) {
      const found = await this.commentRepository.findBlogCommentById(parentCommentId)
      if (!found) throw new Error('Parent comment not found')
      parentComment = found
    }
    const comment = user.commentOnBlog(blog, content, parentComment)

    // Save the comment
    return this.commentRepository.saveBlogComment(comment)
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
