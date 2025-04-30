import { Router } from 'express'
import { NotificationController } from '../controllers/notification.controller'
import { NotificationService } from '../services/notification.service'
import { NotificationRepository } from '../repositories/notification.repository'
import { AppDataSource } from '~/data-source'
import { viewNotificationsMiddleware } from '~/middlewares/notification.middlewares'
const router = Router()

const notificationRepository = new NotificationRepository(AppDataSource)
const notificationService = new NotificationService(notificationRepository)
const notificationController = new NotificationController(notificationService)

router.get('/notifications/:userId', viewNotificationsMiddleware, (req, res) =>
  notificationController.viewAllNotifications(req, res),
)

export default router
