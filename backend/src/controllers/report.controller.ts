import { Request, Response } from 'express'
import { ReportService } from '~/services/report.service'
import { ReportReason } from '~/models/report.model'

export class ReportController {
  constructor(private reportService: ReportService) {}

  async getReportBlog(req: Request, res: Response): Promise<void> {
    try {
      const { blogId } = req.params
      const reports = await this.reportService.getReportBlog(blogId)
      //console.log(reports)
      res.status(201).json({ status: 'success', data: reports })
    } catch (error) {
      console.error('Error reporting blog:', error)

      const message = (error as Error).message
      if (message === 'Blog not found') {
        res.status(404).json({ status: 'failed', message })
      } else {
        res.status(400).json({ status: 'failed', message })
      }
    }
  }
  async getReportCommentBlog(req: Request, res: Response): Promise<void> {
    try {
      const { blogId } = req.params
      const reports = await this.reportService.getReportCommentBlog(blogId)
      //console.log(reports)
      res.status(201).json({ status: 'success', data: reports })
    } catch (error) {
      console.error('Error reporting blog:', error)

      const message = (error as Error).message
      if (message === 'Blog not found') {
        res.status(404).json({ status: 'failed', message })
      } else {
        res.status(400).json({ status: 'failed', message })
      }
    }
  }
  async getReportCommentMovie(req: Request, res: Response): Promise<void> {
    try {
      const { movieId } = req.params
      const reports = await this.reportService.getReportCommentMovie(movieId)
      //console.log(reports)
      res.status(201).json({ status: 'success', data: reports })
    } catch (error) {
      console.error('Error reporting blog:', error)

      const message = (error as Error).message
      if (message === 'Blog not found') {
        res.status(404).json({ status: 'failed', message })
      } else {
        res.status(400).json({ status: 'failed', message })
      }
    }
  }
  async reportBlog(req: Request, res: Response): Promise<void> {
    try {
      const { reporterId, blogId, reason } = req.body

      if (!Object.values(ReportReason).includes(reason)) {
        res.status(400).json({ status: 'failed', message: 'Invalid report reason' })
        return
      }

      const report = await this.reportService.reportBlog(reporterId, blogId, reason)
      res.status(201).json({ status: 'success', data: report })
    } catch (error) {
      console.error('Error reporting blog:', error)

      const message = (error as Error).message
      if (message === 'Reporter not found' || message === 'Blog not found') {
        res.status(404).json({ status: 'failed', message })
      } else {
        res.status(400).json({ status: 'failed', message })
      }
    }
  }

  async reportComment(req: Request, res: Response): Promise<void> {
    try {
      const { reporterId, commentId, reason } = req.body

      if (!Object.values(ReportReason).includes(reason)) {
        res.status(400).json({ status: 'failed', message: 'Invalid report reason' })
        return
      }

      const report = await this.reportService.reportComment(reporterId, commentId, reason)
      res.status(201).json({ status: 'success', data: report })
    } catch (error) {
      console.error('Error reporting comment:', error)

      const message = (error as Error).message
      if (message === 'Reporter not found' || message === 'Comment not found') {
        res.status(404).json({ status: 'failed', message })
      } else {
        res.status(400).json({ status: 'failed', message })
      }
    }
  }
}
