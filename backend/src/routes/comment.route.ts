import { Router } from 'express'
import { AppDataSource } from '~/data-source'
import { CommentRepository } from '~/repositories/comment.repository'
import { UserRepository } from '~/repositories/user.repository'
import { MovieRepository } from '~/repositories/movie.repository'

import { CommentController } from '~/controllers/comment.controller'
import { CommentService } from '~/services/comment.service'
import { MovieService } from '~/services/movie.service'

const commentRouter = Router()

// Khởi tạo dependencies
const commentRepository = new CommentRepository(AppDataSource)
const userRepository = new UserRepository(AppDataSource) // Khởi tạo userRepository
const movieRepository = new MovieRepository(AppDataSource) // Khởi tạo movieRepository
const commentService = new CommentService(commentRepository, userRepository, movieRepository) // Truyền vào service
const movieService = new MovieService(movieRepository) // Khởi tạo MovieService (chỉ cần movieRepository)
// Khởi tạo CommentController với đúng các service đã truyền vào
const commentController = new CommentController(commentService, movieService)

// Định nghĩa routes
commentRouter.post('/movie', (req, res) => commentController.createMovieComment(req, res))

export default commentRouter
