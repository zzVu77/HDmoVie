import { Router } from 'express'
import { AppDataSource } from '~/data-source'
import { WatchlistController } from '~/controllers/watchlist.controller'
import { WatchlistService } from '~/services/watchlist.service'

import { RegisteredUserRepository } from '~/repositories/registeredUser.repository'
import { WatchlistRepository } from '~/repositories/watchlist.repository'
import { createWatchlistMiddleware } from '~/middlewares/watchlist.midleware'

const watchlistRouter = Router()

// Initilize dependencies
const registeredUserRepository = new RegisteredUserRepository(AppDataSource)
const watchlistRepository = new WatchlistRepository(AppDataSource)

const watchlistService = new WatchlistService(watchlistRepository, registeredUserRepository)
const watchlistController = new WatchlistController(watchlistService)

// Define routes
watchlistRouter.post('/create', createWatchlistMiddleware, (req, res) => watchlistController.createWatchlist(req, res))

export default watchlistRouter
