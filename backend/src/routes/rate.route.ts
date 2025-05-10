import { Router, Request, Response } from 'express'
import { RateController } from '~/controllers/rate.controller'
import { AppDataSource } from '~/data-source'
import { RateRepository } from '~/repositories/rate.repository'
import { RateService } from '~/services/rate.service'
import { MovieRepository } from '~/repositories/movie.repository'
import { RegisteredUserRepository } from '~/repositories/registeredUser.repository'
import { authenticateToken } from '~/middlewares/auth.middleware'

const rateRouter = Router()

// Initialize dependencies
const rateRepository = new RateRepository(AppDataSource)
const movieRepository = new MovieRepository(AppDataSource)
const userRepository = new RegisteredUserRepository(AppDataSource)
const rateService = new RateService(rateRepository, movieRepository, userRepository)
const rateController = new RateController(rateService)

// All rating operations require authentication
rateRouter.post('/', authenticateToken, (req: Request, res: Response) => rateController.rateMovie(req, res))
rateRouter.delete('/:movieId', authenticateToken, (req: Request, res: Response) => rateController.deleteRate(req, res))

export default rateRouter
