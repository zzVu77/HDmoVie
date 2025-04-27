import { Request, Response } from 'express'
import { CommentService } from '~/services/comment.service'
import { MovieService } from '~/services/movie.service'
import { RegisteredUser } from '~/models/registeredUser.model'

export class CommentController {
  constructor(
    private commentService: CommentService,
    private movieService: MovieService,
  ) {}

  async createMovieComment(req: Request, res: Response): Promise<void> {
    try {
      // Truyền nguyên req.body vào service để xử lý
      const { userId, movieId, content, date, parentComment } = req.body

      const comment = await this.commentService.commentOnMovie({
        userId,
        movieId,
        content,
        date,
        parentComment,
      })

      // Trả về comment mới tạo
      res.status(201).json(comment)
    } catch (error) {
      console.error('Error creating movie comment:', error)
      res.status(400).json({ message: (error as Error).message })
    }
  }
}
