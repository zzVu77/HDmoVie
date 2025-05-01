import { Router } from 'express'
import { AppDataSource } from '~/data-source'
import { ProfileController } from '~/controllers/profile.controller'
import { ProfileService } from '~/services/profile.service'

import { RegisteredUserRepository } from '~/repositories/registeredUser.repository'
import { BlogRepository } from '~/repositories/blog.repository'
import { FollowInteractionRepository } from '~/repositories/followInteraction.repository'
import { WatchlistRepository } from '~/repositories/watchlist.repository'
import { RegisteredUserService } from '~/services/registeredUser.service'
import { updateUserInfoMiddleware } from '~/middlewares/registeredUser.middleware'

const profileRouter = Router()

// Initilize dependencies
const userRepository = new RegisteredUserRepository(AppDataSource)
const blogRepository = new BlogRepository(AppDataSource)
const followInteractionRepository = new FollowInteractionRepository(AppDataSource)
const watchlistRepository = new WatchlistRepository(AppDataSource)

const profileService = new ProfileService(
  userRepository,
  followInteractionRepository,
  blogRepository,
  watchlistRepository,
)
const registeredUserService = new RegisteredUserService(userRepository)
const profileController = new ProfileController(profileService, registeredUserService)

// Define routes
profileRouter.get('/:id', (req, res) => profileController.get(req, res))
profileRouter.get('/:id/blogs', (req, res) => profileController.getBlogs(req, res))
profileRouter.get('/:id/followers', (req, res) => profileController.getFollowers(req, res))
profileRouter.get('/:id/followings', (req, res) => profileController.getFollowings(req, res))
profileRouter.get('/:id/watchlists', (req, res) => profileController.getWatchlists(req, res))
profileRouter.get('/:id/watchlists/:wid', (req, res) => profileController.getWatchlistDetail(req, res))
profileRouter.post('/:id/update', updateUserInfoMiddleware, (req, res) => profileController.updateInfor(req, res))

export default profileRouter
