import { Router } from 'express'
import { AppDataSource } from '~/data-source'
import { CommentRepository } from '~/repositories/comment.repository'
import { UserRepository } from '~/repositories/user.repository'
import { MovieRepository } from '~/repositories/movie.repository'
import { BlogRepository } from '~/repositories/blog.repository'

import { CommentController } from '~/controllers/comment.controller'
import { CommentService } from '~/services/comment.service'
import { MovieService } from '~/services/movie.service'

const commentRouter = Router()

// Initialize dependencies
const commentRepository = new CommentRepository(AppDataSource)
const userRepository = new UserRepository(AppDataSource) // Khởi tạo userRepository
const movieRepository = new MovieRepository(AppDataSource) // Khởi tạo movieRepository
const blogRepository = new BlogRepository(AppDataSource)


const commentService = new CommentService(commentRepository, userRepository, movieRepository,blogRepository ) // Truyền vào service
const movieService = new MovieService(movieRepository) // Khởi tạo MovieService (chỉ cần movieRepository)
// Initialize CommentController
const commentController = new CommentController(commentService, movieService)

// Define routes
commentRouter.post('/movie', (req, res) => commentController.createMovieComment(req, res))
commentRouter.post('/blog', (req, res) => commentController.commentOnBlog(req, res))
commentRouter.get('/blog/:blogId', (req, res) => commentController.getBlogComments(req, res))

export default commentRouter
