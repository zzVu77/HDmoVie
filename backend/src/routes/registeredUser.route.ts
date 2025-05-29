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

// Public routes - no authentication required
registeredUserRouter.post('/register', registerUserMiddleware, (req, res) =>
  registeredUserController.register(req, res),
)

registeredUserRouter.post('/login', loginUserMiddleware, (req, res) => registeredUserController.login(req, res))

// Password recovery routes
registeredUserRouter.post('/forgot-password', (req, res) => registeredUserController.forgotPassword(req, res))

registeredUserRouter.post('/reset-password', (req, res) => registeredUserController.resetPassword(req, res))
registeredUserRouter.post('/verify-otp', (req, res) => registeredUserController.verifyOtp(req, res))
// Protected routes - authentication required
registeredUserRouter.get('/me', authenticateToken, (req, res) => registeredUserController.getProfile(req, res))

registeredUserRouter.get('/logout', authenticateToken, (req, res) => registeredUserController.logout(req, res))

export default registeredUserRouter
