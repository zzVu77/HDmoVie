import { Router } from 'express'
import { BlogController } from '~/controllers/blog.controller'
import { AppDataSource } from '~/data-source'
import { BlogRepository } from '~/repositories/blog.repository'
import { BlogService } from '~/services/blog.service'
import { RegisteredUserRepository } from '~/repositories/registeredUser.repository'
import { TagRepository } from '~/repositories/tag.repository'
import { createBlogMiddleware } from '~/middlewares/blog.middleware'
import { authenticateToken } from '~/middlewares/auth.middleware'
// import { authMiddleware } from '~/middlewares/auth.middleware'

const blogRouter = Router()

// Initialize dependencies
const blogRepository = new BlogRepository(AppDataSource)
const userRepository = new RegisteredUserRepository(AppDataSource)
const tagRepository = new TagRepository(AppDataSource)

const blogService = new BlogService(blogRepository, userRepository, tagRepository)
const blogController = new BlogController(blogService)

// Define routes
blogRouter.get('/', (req, res) => blogController.getAllBlogs(req, res))
blogRouter.get('/:blogId', authenticateToken,(req, res) => blogController.getBlogById(req, res))
blogRouter.post('/', authenticateToken, createBlogMiddleware, (req, res) => blogController.createBlog(req, res))
blogRouter.delete('/:blogId', authenticateToken, (req, res) => blogController.deleteBlog(req, res))

export default blogRouter
