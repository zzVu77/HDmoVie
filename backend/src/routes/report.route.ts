import { Router } from 'express'
import { AppDataSource } from '~/data-source'
import { ReportRepository } from '~/repositories/report.repository'
import { RegisteredUserRepository } from '~/repositories/registeredUser.repository'
import { BlogRepository } from '~/repositories/blog.repository'
import { CommentRepository } from '~/repositories/comment.repository'
import { ReportService } from '~/services/report.service'
import { ReportController } from '~/controllers/report.controller'
import { MovieRepository } from '~/repositories/movie.repository'
import { authenticateToken, isAdmin } from '~/middlewares/auth.middleware'

const reportRouter = Router()

// Initialize dependencies
const reportRepository = new ReportRepository(AppDataSource)
const userRepository = new RegisteredUserRepository(AppDataSource)
const blogRepository = new BlogRepository(AppDataSource)
const commentRepository = new CommentRepository(AppDataSource)
const movieRepository = new MovieRepository(AppDataSource)

const reportService = new ReportService(
  reportRepository,
  userRepository,
  blogRepository,
  commentRepository,
  movieRepository,
)
const reportController = new ReportController(reportService)

// GET routes - require authentication (role check in controller)
reportRouter.get('/blog/:blogId', authenticateToken, isAdmin, (req, res) => reportController.getReportBlog(req, res))
reportRouter.get('/comment/blog/:blogId', authenticateToken, isAdmin, (req, res) =>
  reportController.getReportCommentBlog(req, res),
)
reportRouter.get('/comment/movie/:movieId', authenticateToken, isAdmin, (req, res) =>
  reportController.getReportCommentMovie(req, res),
)
reportRouter.get('/comment/blog', authenticateToken, isAdmin, (req, res) =>
  reportController.getReportCommentBlogAll(req, res),
)
reportRouter.get('/blog', authenticateToken, isAdmin, (req, res) => reportController.getReportBlogAll(req, res))
// POST routes - require authentFication (any registered user can report)
reportRouter.post('/blog', authenticateToken, (req, res) => reportController.reportBlog(req, res))
reportRouter.post('/comment', authenticateToken, (req, res) => reportController.reportComment(req, res))

export default reportRouter
