import { Router } from 'express'
import { CastController } from '~/controllers/cast.controller'
import { AppDataSource } from '~/data-source'
import { CastRepository } from '~/repositories/cast.repository'
import { CastService } from '~/services/cast.service'
import { createCastMiddleware, updateCastMiddleware } from '~/middlewares/cast.middleware'
import { authenticateToken, isAdmin } from '~/middlewares/auth.middleware'

const castRouter = Router()

// Khởi tạo dependencies
const castRepository = new CastRepository(AppDataSource)
const castService = new CastService(castRepository)
const castController = new CastController(castService)
castRouter.use(authenticateToken)
// Định nghĩa routes
castRouter.get('/', (req, res) => castController.getAllCasts(req, res))

castRouter.post('/create', authenticateToken, isAdmin, createCastMiddleware, (req, res) =>
  castController.createCast(req, res),
)

castRouter.delete('/delete/:id', authenticateToken, isAdmin, (req, res) => castController.deleteCast(req, res))

castRouter.put('/update/:id', authenticateToken, isAdmin, updateCastMiddleware, (req, res) =>
  castController.updateCast(req, res),
)
export default castRouter
