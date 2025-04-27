import { CommentRepository } from '~/repositories/comment.repository'
import { UserRepository } from '~/repositories/user.repository'
import { MovieRepository } from '~/repositories/movie.repository'
import { MovieComment } from '~/models/movieComment.model'
import { RegisteredUser } from '~/models/registeredUser.model'
import { Movie } from '~/models/movie.model'

export class CommentService {
  constructor(
    private commentRepository: CommentRepository,
    private userRepository: UserRepository, // Thêm userRepository vào constructor
    private movieRepository: MovieRepository, // Thêm movieRepository vào constructor
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
}
