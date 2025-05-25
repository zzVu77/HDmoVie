import { Router } from 'express'
import { FollowInteractionController } from '~/controllers/followInteraction.controller'
import { AppDataSource } from '~/data-source'
import { FollowInteractionRepository } from '~/repositories/followInteraction.repository'
import { FollowInteractionService } from '~/services/followInteraction.service'
import { RegisteredUserRepository } from '~/repositories/registeredUser.repository'
import { NotificationObserverConfig } from '~/config/notification-observer-config'
import { authenticateToken } from '~/middlewares/auth.middleware'

const followRouter = Router()

// Initialize dependencies
const followInteractionRepository = new FollowInteractionRepository(AppDataSource)
const userRepository = new RegisteredUserRepository(AppDataSource)
const notificationEventManager = NotificationObserverConfig.initialize(AppDataSource)
const followInteractionService = new FollowInteractionService(
  followInteractionRepository,
  userRepository,
  notificationEventManager,
)
const followInteractionController = new FollowInteractionController(followInteractionService)

// Follow and unfollow endpoints
followRouter.post('/follow/:targetUserId', authenticateToken, (req, res) =>
  followInteractionController.followUser(req, res),
)
followRouter.delete('/unfollow/:targetUserId', authenticateToken, (req, res) =>
  followInteractionController.unfollowUser(req, res),
)

export default followRouter
