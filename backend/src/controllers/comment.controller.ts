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
      const { userId, movieId, content, date, parentComment } = req.body

      const comment = await this.commentService.commentOnMovie({
        userId,
        movieId,
        content,
        date,
        parentComment,
      })

      res.status(201).json(comment)
    } catch (error) {
      console.error('Error creating movie comment:', error)
      res.status(400).json({ message: (error as Error).message })
    }
  }
  async getBlogComments(req: Request, res: Response): Promise<void> {
    try {
      const { blogId } = req.params
      const comments = await this.commentService.getBlogComments(blogId)
      res.json(comments)
    } catch (error) {
      console.error('Error fetching blog comments:', error)
      
      if ((error as Error).message === 'Blog not found') {
        res.status(404).json({ message: (error as Error).message })
      } else {
        res.status(500).json({ message: 'Internal server error' })
      }
    }
  }

  async commentOnBlog(req: Request, res: Response): Promise<void> {
    try {
      const { userId, blogId, content, parentCommentId } = req.body
      const comment = await this.commentService.commentOnBlog(
        userId,
        blogId,
        content,
        parentCommentId
      )
      res.status(201).json(comment)
    } catch (error) {
      console.error('Error creating blog comment:', error)
      
      if ((error as Error).message === 'Blog not found' || 
          (error as Error).message === 'User not found' ||
          (error as Error).message === 'Parent comment not found') {
        res.status(404).json({ message: (error as Error).message })
      } else {
        res.status(400).json({ message: (error as Error).message })
      }
    }
  }
}
