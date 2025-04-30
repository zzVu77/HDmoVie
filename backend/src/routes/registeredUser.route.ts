import { Router } from 'express'
import { RegisteredUserController } from '~/controllers/registeredUser.controller'
import { AppDataSource } from '~/data-source'
import { RegisteredUserRepository } from '~/repositories/registeredUser.repository'
import { RegisteredUserService } from '~/services/registeredUser.service'
import { registeredUserMiddleware } from '~/middlewares/registeredUser.middleware'

const registeredUserRouter = Router()

// Khởi tạo dependencies
const registeredUserRepository = new RegisteredUserRepository(AppDataSource)
const registeredUserService = new RegisteredUserService(registeredUserRepository)
const registeredUserController = new RegisteredUserController(registeredUserService)

// Định nghĩa routes
registeredUserRouter.post('/register', registeredUserMiddleware, (req, res) =>
  registeredUserController.register(req, res),
)

export default registeredUserRouter
