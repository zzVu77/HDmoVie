import { Router } from 'express'
import { AppDataSource } from '~/data-source'
import { ProfileController } from '~/controllers/profile.controller'
import { ProfileService } from '~/services/profile.service'

import { RegisteredUserRepository } from '~/repositories/registeredUser.repository'
import { BlogRepository } from '~/repositories/blog.repository'
import { FollowInteractionRepository } from '~/repositories/followInteraction.repository'
import { WatchlistRepository } from '~/repositories/watchlist.repository'
import { NotificationObserverConfig } from '~/config/notification-observer-config'
import { RegisteredUserService } from '~/services/registeredUser.service'
import { changePasswordMiddleware, updateUserInfoMiddleware } from '~/middlewares/registeredUser.middleware'
import { FollowInteractionService } from '~/services/followInteraction.service'
import { BlogService } from '~/services/blog.service'
import { WatchlistService } from '~/services/watchlist.service'
import { MovieRepository } from '~/repositories/movie.repository'
import { TagRepository } from '~/repositories/tag.repository'

const profileRouter = Router()

// Initialize dependencies
const registeredUserRepository = new RegisteredUserRepository(AppDataSource)
const blogRepository = new BlogRepository(AppDataSource)
const tagRepository = new TagRepository(AppDataSource)
const followInteractionRepository = new FollowInteractionRepository(AppDataSource)
const watchlistRepository = new WatchlistRepository(AppDataSource)
const movieRepository = new MovieRepository(AppDataSource)
const notificationEventManager = NotificationObserverConfig.initialize(AppDataSource)
const profileService = new ProfileService(registeredUserRepository, followInteractionRepository)
const registeredUserService = new RegisteredUserService(registeredUserRepository)
const blogService = new BlogService(blogRepository, registeredUserRepository, tagRepository)
const followInteractionService = new FollowInteractionService(
  followInteractionRepository,
  registeredUserRepository,
  notificationEventManager,
)
const watchlistService = new WatchlistService(watchlistRepository, registeredUserRepository, movieRepository)

const profileController = new ProfileController(
  profileService,
  registeredUserService,
  followInteractionService,
  blogService,
  watchlistService,
)

// Public routes - anyone can view profiles and their public content
profileRouter.get('/', (req, res) => profileController.getSelf(req, res))
profileRouter.get('/:id', (req, res) => profileController.get(req, res))
profileRouter.get('/:id/blogs', (req, res) => profileController.getBlogs(req, res))
profileRouter.get('/:id/follow-interaction', (req, res) => profileController.getFollowInteraction(req, res))
profileRouter.get('/:id/follow-interaction/followers', (req, res) => profileController.getFollowers(req, res))
profileRouter.get('/:id/follow-interaction/followings', (req, res) => profileController.getFollowings(req, res))
profileRouter.get('/:id/watchlists', (req, res) => profileController.getWatchlists(req, res))
profileRouter.get('/:id/watchlists/:wid', (req, res) => profileController.getWatchlistDetail(req, res))

// Protected routes - user must be authenticated and authorized
profileRouter.post('/:id/update', updateUserInfoMiddleware, (req, res) => profileController.updateInfor(req, res))

profileRouter.post('/:id/change-password', changePasswordMiddleware, (req, res) =>
  profileController.changePassword(req, res),
)

export default profileRouter
