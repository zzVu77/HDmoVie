import { ReportRepository } from '~/repositories/report.repository'
import { RegisteredUserRepository } from '~/repositories/registeredUser.repository'
import { BlogRepository } from '~/repositories/blog.repository'
import { CommentRepository } from '~/repositories/comment.repository'
import { BlogReport } from '~/models/blogReport.model'
import { CommentReport } from '~/models/commentReport.model'
import { ReportReason } from '~/models/report.model'
import { Comment } from '~/models/comment.model'
import { MovieRepository } from '~/repositories/movie.repository'
export class ReportService {
  constructor(
    private reportRepository: ReportRepository,
    private userRepository: RegisteredUserRepository,
    private blogRepository: BlogRepository,
    private commentRepository: CommentRepository,
    private movieRepository: MovieRepository,
  ) {}

  async getReportBlog(blogId: string): Promise<BlogReport[]> {
    try {
      const blog = await this.blogRepository.findById(blogId)
      if (!blog) throw new Error('Blog not found')
      return this.reportRepository.findReportBlogAll(blogId)
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }
  async getReportCommentBlog(blogId: string): Promise<CommentReport[]> {
    try {
      const blog = await this.blogRepository.findById(blogId)
      if (!blog) throw new Error('Blog not found')
      return this.reportRepository.findReportCommentBlogAll(blogId)
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }
  async getReportCommentMovie(movieId: string): Promise<CommentReport[]> {
    try {
      const blog = await this.movieRepository.findById(movieId)
      if (!blog) throw new Error('Movie not found')
      return this.reportRepository.findReportCommentMovieAll(movieId)
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }
  async reportBlog(reporterId: string, blogId: string, reason: ReportReason): Promise<BlogReport> {
    // Find the reporter
    const reporter = await this.userRepository.findOne(reporterId)
    if (!reporter) throw new Error('Reporter not found')

    // Find the blog
    const blog = await this.blogRepository.findById(blogId)
    if (!blog) throw new Error('Blog not found')

    // Create the report using direct constructor parameters
    const report = new BlogReport(reporter, reason, blog)

    // Save and return the report
    return this.reportRepository.createBlogReport(report)
  }

  async reportComment(reporterId: string, commentId: string, reason: ReportReason): Promise<CommentReport> {
    // Find the reporter
    const reporter = await this.userRepository.findOne(reporterId)
    if (!reporter) throw new Error('Reporter not found')

    // Find the comment (generic Comment type)
    const comment = await this.commentRepository.findCommentById(commentId)
    if (!comment) throw new Error('Comment not found')

    const report = new CommentReport(reporter, reason, comment)

    // Save and return the report
    return this.reportRepository.createCommentReport(report)
  }
}
