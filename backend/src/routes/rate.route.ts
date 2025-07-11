import { Router, Request, Response } from 'express'
import { RateController } from '~/controllers/rate.controller'
import { AppDataSource } from '~/data-source'
import { RateRepository } from '~/repositories/rate.repository'
import { RateService } from '~/services/rate.service'
import { MovieRepository } from '~/repositories/movie.repository'
import { RegisteredUserRepository } from '~/repositories/registeredUser.repository'
import { authenticateToken } from '~/middlewares/auth.middleware'
import { CommentService } from '~/services/comment.service'
import { CommentRepository } from '~/repositories/comment.repository'
import { BlogRepository } from '~/repositories/blog.repository'
import { NotificationObserverConfig } from '~/config/notification-observer-config'
import { createRateMiddleware, createRateWithCommentMiddleware } from '~/middlewares/rate.middleware'

const rateRouter = Router()

// Initialize dependencies
const rateRepository = new RateRepository(AppDataSource)
const movieRepository = new MovieRepository(AppDataSource)
const userRepository = new RegisteredUserRepository(AppDataSource)
const commentRepository = new CommentRepository(AppDataSource)
const blogRepository = new BlogRepository(AppDataSource)
const notificationEventManager = NotificationObserverConfig.initialize(AppDataSource)
const rateService = new RateService(rateRepository, movieRepository, userRepository)
const commentService = new CommentService(
  commentRepository,
  userRepository,
  movieRepository,
  blogRepository,
  notificationEventManager,
)
const rateController = new RateController(rateService, commentService)

// All rating operations require authentication
rateRouter.post('/:movieId', authenticateToken, createRateMiddleware, (req: Request, res: Response) =>
  rateController.rateMovie(req, res),
)

// Use the combined middleware for rate with comment
rateRouter.post(
  '/:movieId/with-comment',
  authenticateToken,
  createRateWithCommentMiddleware,
  (req: Request, res: Response) => rateController.rateAndCommentMovie(req, res),
)

rateRouter.delete('/:movieId', authenticateToken, (req: Request, res: Response) => rateController.deleteRate(req, res))

export default rateRouter
