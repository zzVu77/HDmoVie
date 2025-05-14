import { Router } from 'express'
import { MovieController } from '~/controllers/movie.controller'
import { AppDataSource } from '~/data-source'
import { MovieRepository } from '~/repositories/movie.repository'
import { MovieService } from '~/services/movie.service'
import { createMovieMiddleware, updateMovieMiddleware } from '~/middlewares/movie.midleware'
import { CastRepository } from '~/repositories/cast.repository'
import { CastService } from '~/services/cast.service'
import { GenreRepository } from '~/repositories/genre.repository'
import { CommentRepository } from '~/repositories/comment.repository'
import { GenreService } from '~/services/genre.service'
import { authenticateToken, isAdmin, optionalAuthenticateToken } from '~/middlewares/auth.middleware'
import { RateService } from '~/services/rate.service'
import { RateRepository } from '~/repositories/rate.repository'
import { RegisteredUserRepository } from '~/repositories/registeredUser.repository'

const movieRouter = Router()

// Initial dependencies
const castRepository = new CastRepository(AppDataSource)
const genreRepository = new GenreRepository(AppDataSource)
const movieRepository = new MovieRepository(AppDataSource)
const commentRepository = new CommentRepository(AppDataSource)
const rateRepository = new RateRepository(AppDataSource)
const registeredUserRepository = new RegisteredUserRepository(AppDataSource)

const castService = new CastService(castRepository)
const genreService = new GenreService(genreRepository)
const rateService = new RateService(rateRepository, movieRepository, registeredUserRepository)

const movieService = new MovieService(movieRepository, castService, genreService, commentRepository, rateService)
const movieController = new MovieController(movieService)

// Define routes
//GET route
movieRouter.get('/', (req, res) => movieController.getAllMovies(req, res))
movieRouter.get('/search', (req, res) => movieController.searchMoviesByTitle(req, res))
movieRouter.get('/detail/:id', optionalAuthenticateToken, (req, res) => movieController.getMovieById(req, res))
movieRouter.get('/highlights', (req, res) => movieController.getMovieHighlights(req, res))

//POST route
movieRouter.post('/create', authenticateToken, isAdmin, createMovieMiddleware, (req, res) =>
  movieController.createMovie(req, res),
)
//DELETE route
movieRouter.delete('/delete/:id', authenticateToken, isAdmin, (req, res) => movieController.deleteMovie(req, res))
//PUT route
movieRouter.put('/update/:id', authenticateToken, isAdmin, updateMovieMiddleware, (req, res) =>
  movieController.updateMovie(req, res),
)

export default movieRouter
