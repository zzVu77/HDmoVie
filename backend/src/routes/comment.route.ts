import { Router } from 'express'
import { AppDataSource } from '~/data-source'
import { CommentRepository } from '~/repositories/comment.repository'
import { RegisteredUserRepository } from '~/repositories/registeredUser.repository'
import { MovieRepository } from '~/repositories/movie.repository'
import { BlogRepository } from '~/repositories/blog.repository'

import { CommentController } from '~/controllers/comment.controller'
import { CommentService } from '~/services/comment.service'

import { createMovieCommentMiddleware, createBlogCommentMiddleware } from '~/middlewares/comment.middleware'
import { authenticateToken, isAdmin } from '~/middlewares/auth.middleware'

const commentRouter = Router()

// Initialize dependencies
const commentRepository = new CommentRepository(AppDataSource)
const userRepository = new RegisteredUserRepository(AppDataSource)
const movieRepository = new MovieRepository(AppDataSource)
const blogRepository = new BlogRepository(AppDataSource)

const commentService = new CommentService(commentRepository, userRepository, movieRepository, blogRepository)
// Initialize CommentController
const commentController = new CommentController(commentService)

// Define routes
commentRouter.post('/movie', authenticateToken, createMovieCommentMiddleware, (req, res) =>
  commentController.createMovieComment(req, res),
)
commentRouter.post('/blog', authenticateToken, createBlogCommentMiddleware, (req, res) =>
  commentController.commentOnBlog(req, res),
)
commentRouter.delete('/blog/delete/:commentId', authenticateToken, isAdmin, (req, res) =>
  commentController.deleteCommentBlog(req, res),
)
commentRouter.get('/blog/:blogId', authenticateToken, (req, res) => commentController.getBlogComments(req, res))
commentRouter.get('/movie/:movieId', (req, res) => commentController.getMovieComments(req, res))

export default commentRouter
