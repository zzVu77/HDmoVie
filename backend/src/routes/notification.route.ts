import { Router } from 'express'
import { NotificationController } from '../controllers/notification.controller'
import { NotificationService } from '../services/notification.service'
import { NotificationRepository } from '../repositories/notification.repository'
import { AppDataSource } from '~/data-source'
import { authenticateToken } from '~/middlewares/auth.middleware'

const router = Router()

const notificationRepository = new NotificationRepository(AppDataSource)
const notificationService = new NotificationService(notificationRepository)
const notificationController = new NotificationController(notificationService)

// Get notifications - requires authentication (user can only view their own notifications)
router.get('/:userId', authenticateToken, (req, res) => notificationController.viewAllNotifications(req, res))

export default router
