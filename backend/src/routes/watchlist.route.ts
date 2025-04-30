import { Router } from 'express'
import { AppDataSource } from '~/data-source'
import { WatchlistController } from '~/controllers/watchlist.controller'
import { WatchlistService } from '~/services/watchlist.service'

import { RegisteredUserRepository } from '~/repositories/registeredUser.repository'
import { WatchlistRepository } from '~/repositories/watchlist.repository'
import { createWatchlistMiddleware, updateWatchlistMiddleware } from '~/middlewares/watchlist.midleware'

const watchlistRouter = Router()

// Initilize dependencies
const registeredUserRepository = new RegisteredUserRepository(AppDataSource)
const watchlistRepository = new WatchlistRepository(AppDataSource)

const watchlistService = new WatchlistService(watchlistRepository, registeredUserRepository)
const watchlistController = new WatchlistController(watchlistService)

// Define routes
// GET route
watchlistRouter.post('/create', createWatchlistMiddleware, (req, res) => watchlistController.createWatchlist(req, res))

// PUT route
watchlistRouter.put('/:wid/update', updateWatchlistMiddleware, (req, res) =>
  watchlistController.updateWatchlist(req, res),
)

// DELETE route
watchlistRouter.delete('/:wid/delete', (req, res) => watchlistController.deleteWatchlist(req, res))
watchlistRouter.delete('/:wid/:mid/delete', (req, res) => watchlistController.deleteMovie(req, res))

export default watchlistRouter
