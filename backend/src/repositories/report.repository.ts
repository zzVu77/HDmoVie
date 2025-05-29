import { DataSource, FindOptionsWhere, Repository, FindOptionsSelect } from 'typeorm'
import { BlogReport } from '~/models/blogReport.model'
import { CommentReport } from '~/models/commentReport.model'
import { Report } from '~/models/report.model'
import { BlogComment } from '~/models/blogComment.model'
import { MovieComment } from '~/models/movieComment.model'
import { title } from 'process'
export class ReportRepository {
  private reportRepo: Repository<Report>
  private blogReportRepo: Repository<BlogReport>
  private commentReportRepo: Repository<CommentReport>

  constructor(dataSource: DataSource) {
    this.reportRepo = dataSource.getRepository(Report)
    this.blogReportRepo = dataSource.getRepository(BlogReport)
    this.commentReportRepo = dataSource.getRepository(CommentReport)
  }

  async findReportBlogAll(blogId: string): Promise<BlogReport[]> {
    return this.blogReportRepo.find({
      where: {
        blog: { id: blogId },
      } as FindOptionsWhere<BlogReport>,
    })
  }
  async findReportCommentBlogAll(blogId: string): Promise<CommentReport[]> {
    return this.commentReportRepo
      .createQueryBuilder('report')
      .leftJoinAndSelect('report.comment', 'comment')
      .where('comment.blogId = :blogId', { blogId })
      .getMany()
  }
  async findReportCommentBlog(): Promise<CommentReport[]> {
    return this.commentReportRepo.find({
      select: {
        id: true,
        reason: true,
        reporter: {
          id: true,
          email: true,
          password: false,
          fullName: true,
          dateOfBirth: true,
        },
        comment: {
          id: true,
          content: true,
          blog: { id: true, tags: false, imageUrls: false }, // Excludes tags and imageUrls
        },
      } as FindOptionsSelect<CommentReport>,
      where: { comment: { type: 'BLOG' } as FindOptionsWhere<BlogComment> },
      relations: ['reporter', 'comment', 'comment.blog'], // Include the blog relation
    })
  }

  async findReportCommentMovie(): Promise<CommentReport[]> {
    return this.commentReportRepo.find({
      select: {
        id: true,
        reason: true,
        reporter: {
          id: true,
          email: true,
          password: false,
          fullName: true,
          dateOfBirth: true,
        },
        comment: {
          id: true,
          content: true,
          movie: { id: true, title: true }, // Excludes tags and imageUrls
        },
      } as FindOptionsSelect<CommentReport>,
      where: { comment: { type: 'MOVIE' } as FindOptionsWhere<MovieComment> },
      relations: ['reporter', 'comment', 'comment.movie'], // Include the blog relation
    })
  }
  async findReportBlog(): Promise<BlogReport[]> {
    return this.blogReportRepo.find({
      select: {
        id: true,
        reason: true,
        reporter: {
          id: true,
          email: true,
          password: false,
          fullName: true,
          dateOfBirth: true,
        },
        blog: { id: true, content: true },
      } as FindOptionsSelect<BlogReport>,
      relations: ['reporter', 'blog'], // Include the blog relation
    })
  }
  async findReportCommentMovieAll(movieId: string): Promise<CommentReport[]> {
    return this.commentReportRepo
      .createQueryBuilder('report')
      .leftJoinAndSelect('report.comment', 'comment')
      .where('comment.movieId = :movieId', { movieId })
      .getMany()
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
