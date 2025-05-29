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
router.get('/', authenticateToken, (req, res) => notificationController.viewAllNotifications(req, res))

// Mark notification as read - requires authentication
router.put('/:notificationId/read', authenticateToken, (req, res) => notificationController.markAsRead(req, res))

// Mark all notifications as read - requires authentication
router.put('/read-all', authenticateToken, (req, res) => notificationController.markAllAsRead(req, res))

export default router
