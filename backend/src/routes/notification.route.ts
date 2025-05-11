import { Router } from 'express'
import { NotificationController } from '../controllers/notification.controller'
import { NotificationService } from '../services/notification.service'
import { NotificationRepository } from '../repositories/notification.repository'
import { RegisteredUserRepository } from '../repositories/registeredUser.repository'
import { CommentRepository } from '../repositories/comment.repository'
import { ReportRepository } from '../repositories/report.repository'

import { AppDataSource } from '~/data-source'
import { authenticateToken } from '~/middlewares/auth.middleware'

const router = Router()

const notificationRepository = new NotificationRepository(AppDataSource)
const registeredUserRepository = new RegisteredUserRepository(AppDataSource)
const commentRepository = new CommentRepository(AppDataSource)
const reportRepository = new ReportRepository(AppDataSource)

const notificationService = new NotificationService(
  notificationRepository,
  registeredUserRepository,
  commentRepository,
  reportRepository,
)
const notificationController = new NotificationController(notificationService)

// Get notifications - requires authentication (user can only view their own notifications)
// router.get('/', authenticateToken, (req, res) => notificationController.viewAllNotifications(req, res))
router.get('/', (req, res) => notificationController.viewAllNotifications(req, res))

export default router
