import { Router } from 'express'
import { MovieController } from '~/controllers/movie.controller'
import { AppDataSource } from '~/data-source'
import { MovieRepository } from '~/repositories/movie.repository'
import { MovieService } from '~/services/movie.service'
import { movieMiddleware } from '~/middlewares/movie.midleware'
const movieRouter = Router()

// Initial dependencies
const movieRepository = new MovieRepository(AppDataSource)
const movieService = new MovieService(movieRepository)
const movieController = new MovieController(movieService)

//GET route
movieRouter.get('/', (req, res) => movieController.getAllMovies(req, res))
movieRouter.get('/search', (req, res) => movieController.searchMoviesByTitle(req, res))
movieRouter.get('/:id', (req, res) => movieController.getMovieById(req, res))
//POST route
movieRouter.post('/create', movieMiddleware, (req, res) => movieController.createMovie(req, res))
//DELETE route
movieRouter.delete('/:id', (req, res) => movieController.deleteMovie(req, res))

export default movieRouter
