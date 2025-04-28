import { Router } from 'express'
import { AppDataSource } from '~/data-source'
import { ProfileController } from '~/controllers/profile.controller'
import { ProfileService } from '~/services/profile.service'

import { RegisteredUserRepository } from '~/repositories/user.repository'
import { BlogRepository } from '~/repositories/blog.repository'
import { FollowInteractionRepository } from '~/repositories/followInteraction.repository'
import { WatchlistRepository } from '~/repositories/watchlist.repository'

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
const profileController = new ProfileController(profileService)

// Define routes
profileRouter.get('/:id', (req, res) => profileController.get(req, res))
profileRouter.get('/:id/blogs', (req, res) => profileController.getBlogs(req, res))
profileRouter.get('/:id/followers', (req, res) => profileController.getFollowers(req, res))
profileRouter.get('/:id/followings', (req, res) => profileController.getFollowings(req, res))
profileRouter.get('/:id/watchlists', (req, res) => profileController.getWatchlists(req, res))
profileRouter.get('/:id/watchlists/:wid', (req, res) => profileController.getWatchlistDetail(req, res))

export default profileRouter
