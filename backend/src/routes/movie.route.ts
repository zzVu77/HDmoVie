import { Router } from 'express'
import { MovieController } from '~/controllers/movie.controller'
import { AppDataSource } from '~/data-source'
import { MovieRepository } from '~/repositories/movie.repository'
import { MovieService } from '~/services/movie.service'
import { createMovieMiddleware, updateMovieMiddleware } from '~/middlewares/movie.midleware'
import { CastRepository } from '~/repositories/cast.repository'
import { CastService } from '~/services/cast.service'
import { GenreRepository } from '~/repositories/genre.repository'
import { GenreService } from '~/services/genre.service'
const movieRouter = Router()

// Initial dependencies
const castRepository = new CastRepository(AppDataSource)
const genreRepository = new GenreRepository(AppDataSource)
const movieRepository = new MovieRepository(AppDataSource)
const castService = new CastService(castRepository)
const genreService = new GenreService(genreRepository)
const movieService = new MovieService(movieRepository, castService, genreService)
const movieController = new MovieController(movieService)

// Define routes
//GET route
movieRouter.get('/', (req, res) => movieController.getAllMovies(req, res))
movieRouter.get('/search', (req, res) => movieController.searchMoviesByTitle(req, res))
movieRouter.get('/:id', (req, res) => movieController.getMovieById(req, res))
//POST route
movieRouter.post('/create', createMovieMiddleware, (req, res) => movieController.createMovie(req, res))
//DELETE route
movieRouter.delete('/delete/:id', (req, res) => movieController.deleteMovie(req, res))
//PUT route
movieRouter.put('/update/:id', updateMovieMiddleware, (req, res) => movieController.updateMovie(req, res))

export default movieRouter
