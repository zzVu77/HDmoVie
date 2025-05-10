import { Router } from 'express'
import { AppDataSource } from '~/data-source'
import { WatchlistController } from '~/controllers/watchlist.controller'
import { WatchlistService } from '~/services/watchlist.service'

import { RegisteredUserRepository } from '~/repositories/registeredUser.repository'
import { WatchlistRepository } from '~/repositories/watchlist.repository'
import {
  createWatchlistFastMiddleware,
  createWatchlistMiddleware,
  updateWatchlistMiddleware,
} from '~/middlewares/watchlist.middleware'
import { MovieRepository } from '~/repositories/movie.repository'
import { authenticateToken } from '~/middlewares/auth.middleware'

const watchlistRouter = Router()

// Initialize dependencies
const registeredUserRepository = new RegisteredUserRepository(AppDataSource)
const watchlistRepository = new WatchlistRepository(AppDataSource)
const movieRepository = new MovieRepository(AppDataSource)

const watchlistService = new WatchlistService(watchlistRepository, registeredUserRepository, movieRepository)
const watchlistController = new WatchlistController(watchlistService)

// All watchlist operations require authentication
watchlistRouter.use(authenticateToken)

// Routes
// Create operations - user ID is automatically extracted from auth token
watchlistRouter.post('/create', createWatchlistMiddleware, (req, res) => watchlistController.createWatchlist(req, res))

watchlistRouter.post('/create-fast', createWatchlistFastMiddleware, (req, res) =>
  watchlistController.createWatchlistFast(req, res),
)

// Update operations - service will verify if user owns the watchlist using ID from auth token
watchlistRouter.put('/:wid/update', updateWatchlistMiddleware, (req, res) =>
  watchlistController.updateWatchlist(req, res),
)

// Add movie to watchlist
watchlistRouter.put('/:wid/add/:mid', (req, res) => watchlistController.addMovie(req, res))

// Delete operations
watchlistRouter.delete('/:wid/delete', (req, res) => watchlistController.deleteWatchlist(req, res))

// Remove movie from watchlist
watchlistRouter.delete('/:wid/:mid/delete', (req, res) => watchlistController.deleteMovie(req, res))

export default watchlistRouter
