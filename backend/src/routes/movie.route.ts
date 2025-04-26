import { Router } from 'express'
import { MovieController } from '~/controllers/movie.controller'
import { AppDataSource } from '~/data-source'
import { MovieRepository } from '~/repositories/movie.repository'
import { MovieService } from '~/services/movie.service'

const movieRouter = Router()

// Khởi tạo dependencies
const movieRepository = new MovieRepository(AppDataSource)
const movieService = new MovieService(movieRepository)
const movieController = new MovieController(movieService)

// Định nghĩa routes
movieRouter.get('/', (req, res) => movieController.getAllMovies(req, res))
movieRouter.post('/create', (req, res) => movieController.createMovie(req, res))

export default movieRouter
