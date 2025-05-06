import { Router } from 'express'
import { AppDataSource } from '~/data-source'
import { ReportRepository } from '~/repositories/report.repository'
import { RegisteredUserRepository } from '~/repositories/registeredUser.repository'
import { BlogRepository } from '~/repositories/blog.repository'
import { CommentRepository } from '~/repositories/comment.repository'
import { ReportService } from '~/services/report.service'
import { ReportController } from '~/controllers/report.controller'
import { MovieRepository } from '~/repositories/movie.repository'

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

// Define routes

reportRouter.get('/blog/:blogId', (req, res) => reportController.getReportBlog(req, res))
reportRouter.get('/comment/blog/:blogId', (req, res) => reportController.getReportCommentBlog(req, res))
reportRouter.get('/comment/movie/:movieId', (req, res) => reportController.getReportCommentMovie(req, res))

reportRouter.post('/blog', (req, res) => reportController.reportBlog(req, res))
reportRouter.post('/comment', (req, res) => reportController.reportComment(req, res))

export default reportRouter
