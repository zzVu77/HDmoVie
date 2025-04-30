import { Router } from 'express'
import { AppDataSource } from '~/data-source'
import { CommentRepository } from '~/repositories/comment.repository'
import { RegisteredUserRepository } from '~/repositories/registeredUser.repository'
import { MovieRepository } from '~/repositories/movie.repository'

import { CommentController } from '~/controllers/comment.controller'
import { CommentService } from '~/services/comment.service'
import { MovieService } from '~/services/movie.service'
import { createMovieCommentMiddleware, createBlogCommentMiddleware } from '~/middlewares/comment.middleware'

const commentRouter = Router()

// Khởi tạo dependencies
const commentRepository = new CommentRepository(AppDataSource)
const userRepository = new RegisteredUserRepository(AppDataSource) // Khởi tạo userRepository
const movieRepository = new MovieRepository(AppDataSource) // Khởi tạo movieRepository
const commentService = new CommentService(commentRepository, userRepository, movieRepository) // Truyền vào service
const movieService = new MovieService(movieRepository) // Khởi tạo MovieService (chỉ cần movieRepository)
// Khởi tạo CommentController với đúng các service đã truyền vào
const commentController = new CommentController(commentService, movieService)

// Định nghĩa routes
commentRouter.post('/movie', createMovieCommentMiddleware, (req, res) => commentController.createMovieComment(req, res))

export default commentRouter
