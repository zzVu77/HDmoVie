import { Router } from 'express'
import { InteractionController } from '~/controllers/interaction.controller'
import { AppDataSource } from '~/data-source'
import { UserRepository } from '~/repositories/user.repository'
import { BlogRepository } from '~/repositories/blog.repository'
import { LikeInteractionRepository } from '~/repositories/likeInteraction.repository'
import { InteractionService } from '~/services/interaction.service'

const interactionRouter = Router()

// Khởi tạo các dependencies
const userRepository = new UserRepository(AppDataSource)
const blogRepository = new BlogRepository(AppDataSource)
const likeInteractionRepository = new LikeInteractionRepository(AppDataSource)
const interactionService = new InteractionService(AppDataSource)
const interactionController = new InteractionController(interactionService)

// Route POST để thực hiện like/unlike blog
interactionRouter.post('/:id/like', (req, res) => interactionController.likeOrUnlikeBlog(req, res))

export default interactionRouter
