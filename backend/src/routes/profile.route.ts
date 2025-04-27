import { Router } from 'express'
import { AppDataSource } from '~/data-source'
import { ProfileController } from '~/controllers/profile.controller'
import { ProfileService } from '~/services/profile.service'

import { UserRepository } from '~/repositories/user.repository'
import { BlogRepository } from '~/repositories/blog.repository'
import { FollowInteractionRepository } from '~/repositories/followInteraction.repository'

const profileRouter = Router()

// Initilize dependencies
const userRepository = new UserRepository(AppDataSource)
const blogRepository = new BlogRepository(AppDataSource)
const followInteractionRepository = new FollowInteractionRepository(AppDataSource)
const profileService = new ProfileService(userRepository, followInteractionRepository, blogRepository)
const profileController = new ProfileController(profileService)

// Define routes
profileRouter.get('/:id', (req, res) => profileController.get(req, res))

export default profileRouter
