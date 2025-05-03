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

const watchlistRouter = Router()

// Initilize dependencies
const registeredUserRepository = new RegisteredUserRepository(AppDataSource)
const watchlistRepository = new WatchlistRepository(AppDataSource)
const movieRepository = new MovieRepository(AppDataSource)

const watchlistService = new WatchlistService(watchlistRepository, registeredUserRepository, movieRepository)
const watchlistController = new WatchlistController(watchlistService)

// Define routes
// POST route
watchlistRouter.post('/create', createWatchlistMiddleware, (req, res) => watchlistController.createWatchlist(req, res))
watchlistRouter.post('/create-fast', createWatchlistFastMiddleware, (req, res) =>
  watchlistController.createWatchlistFast(req, res),
)

// PUT route
watchlistRouter.put('/:wid/update', updateWatchlistMiddleware, (req, res) =>
  watchlistController.updateWatchlist(req, res),
)
watchlistRouter.put('/:wid/add/:mid', (req, res) => watchlistController.addMovie(req, res))

// DELETE route
watchlistRouter.delete('/:wid/delete', (req, res) => watchlistController.deleteWatchlist(req, res))
watchlistRouter.delete('/:wid/:mid/delete', (req, res) => watchlistController.deleteMovie(req, res))

export default watchlistRouter
