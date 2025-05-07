import { Router } from 'express'
import { RateController } from '~/controllers/rate.controller'
import { AppDataSource } from '~/data-source'
import { RateRepository } from '~/repositories/rate.repository'
import { RateService } from '~/services/rate.service'
import { MovieRepository } from '~/repositories/movie.repository'
import { RegisteredUserRepository } from '~/repositories/registeredUser.repository'

const rateRouter = Router()

// Initialize dependencies
const rateRepository = new RateRepository(AppDataSource)
const movieRepository = new MovieRepository(AppDataSource)
const userRepository = new RegisteredUserRepository(AppDataSource)
const rateService = new RateService(rateRepository, movieRepository, userRepository)
const rateController = new RateController(rateService)

// Define routes
rateRouter.post('/', (req, res) => rateController.rateMovie(req, res))
rateRouter.delete('/:movieId', (req, res) => rateController.deleteRate(req, res))

export default rateRouter
