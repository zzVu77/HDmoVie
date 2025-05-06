import { Router } from 'express'
import { RegisteredUserController } from '~/controllers/registeredUser.controller'
import { AppDataSource } from '~/data-source'
import { RegisteredUserRepository } from '~/repositories/registeredUser.repository'
import { RegisteredUserService } from '~/services/registeredUser.service'
import { registerUserMiddleware, loginUserMiddleware } from '~/middlewares/registeredUser.middleware'
import { AuthService } from '~/services/auth.service'
import { authenticateToken } from '~/middlewares/auth.middleware'

const registeredUserRouter = Router()

const registeredUserRepository = new RegisteredUserRepository(AppDataSource)
const registeredUserService = new RegisteredUserService(registeredUserRepository)
const authService = new AuthService(registeredUserRepository)
const registeredUserController = new RegisteredUserController(registeredUserService, authService)

// Forgot password
registeredUserRouter.post('/forgot-password', (req, res) => registeredUserController.forgotPassword(req, res))

// Reset password
registeredUserRouter.post('/reset-password', (req, res) => registeredUserController.resetPassword(req, res))

registeredUserRouter.post('/register', registerUserMiddleware, (req, res) =>
  registeredUserController.register(req, res),
)

registeredUserRouter.post('/login', loginUserMiddleware, (req, res) => registeredUserController.login(req, res))
registeredUserRouter.get('/me', authenticateToken, (req, res) => registeredUserController.getProfile(req, res))

export default registeredUserRouter
