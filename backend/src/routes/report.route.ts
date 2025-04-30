import { Router } from 'express'
import { AppDataSource } from '~/data-source'
import { ReportRepository } from '~/repositories/report.repository'
import { UserRepository } from '~/repositories/user.repository'
import { BlogRepository } from '~/repositories/blog.repository'
import { CommentRepository } from '~/repositories/comment.repository'
import { ReportService } from '~/services/report.service'
import { ReportController } from '~/controllers/report.controller'

const reportRouter = Router()

// Initialize dependencies
const reportRepository = new ReportRepository(AppDataSource)
const userRepository = new UserRepository(AppDataSource)
const blogRepository = new BlogRepository(AppDataSource)
const commentRepository = new CommentRepository(AppDataSource)

const reportService = new ReportService(reportRepository, userRepository, blogRepository, commentRepository)
const reportController = new ReportController(reportService)

// Define routes
reportRouter.post('/blog', (req, res) => reportController.reportBlog(req, res))
reportRouter.post('/comment', (req, res) => reportController.reportComment(req, res))

export default reportRouter
