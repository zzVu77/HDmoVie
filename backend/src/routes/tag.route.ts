import { Router } from 'express'
import { TagController } from '~/controllers/tag.controller'
import { AppDataSource } from '~/data-source'
import { TagRepository } from '~/repositories/tag.repository'
import { TagService } from '~/services/tag.service'
import { createTagMiddleware } from '~/middlewares/tag.middleware'
import { authenticateToken } from '~/middlewares/auth.middleware'

const tagRouter = Router()

// Initial dependencies
const tagRepository = new TagRepository(AppDataSource)
const tagService = new TagService(tagRepository)
const tagController = new TagController(tagService)

// Public read routes
tagRouter.get('/', (req, res) => tagController.getAllTags(req, res))
tagRouter.get('/:id', (req, res) => tagController.getTagById(req, res))

// Create tag - requires authentication (any registered user can create)
tagRouter.post('/create', authenticateToken, createTagMiddleware, (req, res) => tagController.createTag(req, res))

// Delete tag - requires authentication (only admin can delete)
tagRouter.delete('/:id', authenticateToken, (req, res) => tagController.deleteTag(req, res))

export default tagRouter
