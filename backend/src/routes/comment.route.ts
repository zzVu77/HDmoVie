import { Router } from 'express'
import { AppDataSource } from '~/data-source'
import { CommentRepository } from '~/repositories/comment.repository'
import { RegisteredUserRepository } from '~/repositories/registeredUser.repository'
import { MovieRepository } from '~/repositories/movie.repository'
import { BlogRepository } from '~/repositories/blog.repository'

import { CommentController } from '~/controllers/comment.controller'
import { CommentService } from '~/services/comment.service'
import { MovieService } from '~/services/movie.service'
import { CastRepository } from '~/repositories/cast.repository'
import { CastService } from '~/services/cast.service'
import { GenreRepository } from '~/repositories/genre.repository'
import { GenreService } from '~/services/genre.service'
import { createMovieCommentMiddleware, createBlogCommentMiddleware } from '~/middlewares/comment.middleware'

const commentRouter = Router()

// Initialize dependencies
const commentRepository = new CommentRepository(AppDataSource)
const userRepository = new RegisteredUserRepository(AppDataSource)
const movieRepository = new MovieRepository(AppDataSource)
const blogRepository = new BlogRepository(AppDataSource)
const genreRepository = new GenreRepository(AppDataSource)
const castRepository = new CastRepository(AppDataSource)

const castService = new CastService(castRepository)
const genreService = new GenreService(genreRepository)

const commentService = new CommentService(commentRepository, userRepository, movieRepository, blogRepository)
const movieService = new MovieService(movieRepository, castService, genreService)
// Initialize CommentController
const commentController = new CommentController(commentService, movieService)

// Define routes
commentRouter.post('/movie', createMovieCommentMiddleware, (req, res) => commentController.createMovieComment(req, res))
commentRouter.post('/blog', createBlogCommentMiddleware, (req, res) => commentController.commentOnBlog(req, res))
commentRouter.get('/blog/:blogId', (req, res) => commentController.getBlogComments(req, res))


// Định nghĩa routes
commentRouter.post('/movie', createMovieCommentMiddleware, (req, res) => commentController.createMovieComment(req, res))
commentRouter.get('/movie/:movieId', (req, res) => commentController.getMovieComments(req, res))

export default commentRouter
