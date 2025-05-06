import { DataSource, Repository, FindOptionsWhere } from 'typeorm'
import { Report } from '~/models/report.model'
import { BlogReport } from '~/models/blogReport.model'
import { CommentReport } from '~/models/commentReport.model'

export class ReportRepository {
  private reportRepo: Repository<Report>
  private blogReportRepo: Repository<BlogReport>
  private commentReportRepo: Repository<CommentReport>

  constructor(dataSource: DataSource) {
    this.reportRepo = dataSource.getRepository(Report)
    this.blogReportRepo = dataSource.getRepository(BlogReport)
    this.commentReportRepo = dataSource.getRepository(CommentReport)
  }

  async createBlogReport(report: BlogReport): Promise<BlogReport> {
    return this.blogReportRepo.save(report)
  }

  async createCommentReport(report: CommentReport): Promise<CommentReport> {
    return this.commentReportRepo.save(report)
  }

  async findReportById(id: string): Promise<Report | null> {
    return this.reportRepo.findOne({ where: { id } as FindOptionsWhere<Report> })
  }

  async findBlogReportById(id: string): Promise<BlogReport | null> {
    return this.blogReportRepo.findOne({ where: { id } as FindOptionsWhere<BlogReport> })
  }

  async findCommentReportById(id: string): Promise<CommentReport | null> {
    return this.commentReportRepo.findOne({ where: { id } as FindOptionsWhere<CommentReport> })
  }

  async getAllReports(): Promise<Report[]> {
    return this.reportRepo.find()
  }

  async getAllBlogReports(): Promise<BlogReport[]> {
    return this.blogReportRepo.find({ relations: ['blog', 'reporter'] })
  }

  async getAllCommentReports(): Promise<CommentReport[]> {
    return this.commentReportRepo.find({ relations: ['comment', 'reporter'] })
  }
}
