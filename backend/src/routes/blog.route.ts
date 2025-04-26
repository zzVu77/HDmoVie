import { Router } from 'express'
import { BlogController } from '~/controllers/blog.controller'
import { AppDataSource } from '~/data-source'
import { BlogRepository } from '~/repositories/blog.repository'
import { BlogService } from '~/services/blog.service'
// import { authMiddleware } from '~/middlewares/auth.middleware'

const blogRouter = Router()

// Initialize dependencies
const blogRepository = new BlogRepository(AppDataSource)
const blogService = new BlogService(blogRepository)
const blogController = new BlogController(blogService)

// Define routes
blogRouter.get('/', (req, res) => blogController.getAllBlogs(req, res))
blogRouter.get('/:blogId', (req, res) => blogController.getBlogById(req, res))
// blogRouter.delete('/:blogId', authMiddleware, (req, res) => blogController.deleteBlog(req, res))
blogRouter.delete('/:blogId', (req, res) => blogController.deleteBlog(req, res))
export default blogRouter
