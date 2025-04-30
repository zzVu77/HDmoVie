import { Router } from 'express'
import { RegisteredUserController } from '../controllers/registeredUser.controller'
import { RegisteredUserService } from '../services/registeredUser.service'
import { RegisteredUserRepository } from '../repositories/registeredUser.repository'
import { AppDataSource } from '~/data-source'

const router = Router()

const registeredUserRepository = new RegisteredUserRepository(AppDataSource)
const registeredUserService = new RegisteredUserService(registeredUserRepository)
const registeredUserController = new RegisteredUserController(registeredUserService)

// Forgot password
router.post('/forgot-password', (req, res) => registeredUserController.forgotPassword(req, res))

// Reset password
router.post('/reset-password', (req, res) => registeredUserController.resetPassword(req, res))

export default router
