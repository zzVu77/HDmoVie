import { Router } from 'express'
import { InteractionController } from '~/controllers/interaction.controller'
import { AppDataSource } from '~/data-source'
import { InteractionService } from '~/services/interaction.service'
import { authenticateToken } from '~/middlewares/auth.middleware'

const interactionRouter = Router()

const interactionService = new InteractionService(AppDataSource)
const interactionController = new InteractionController(interactionService)

// Route POST để thực hiện like/unlike blog
interactionRouter.post('/', authenticateToken, (req, res) => interactionController.likeOrUnlikeBlog(req, res))

export default interactionRouter
