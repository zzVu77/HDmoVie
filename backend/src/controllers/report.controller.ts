import { Request, Response } from 'express'
import { ReportService } from '~/services/report.service'
import { ReportReason } from '~/models/report.model'

export class ReportController {
    constructor(private reportService: ReportService) {}

    async reportBlog(req: Request, res: Response): Promise<void> {
        try {
        const { reporterId, blogId, reason } = req.body

        if (!Object.values(ReportReason).includes(reason)) {
            res.status(400).json({ message: 'Invalid report reason' })
            return
        }

        const report = await this.reportService.reportBlog(reporterId, blogId, reason)
        res.status(201).json(report)
        } catch (error) {
        console.error('Error reporting blog:', error)
        
        if ((error as Error).message === 'Reporter not found' || 
            (error as Error).message === 'Blog not found') {
            res.status(404).json({ message: (error as Error).message })
        } else {
            res.status(400).json({ message: (error as Error).message })
        }
        }
    }

    async reportComment(req: Request, res: Response): Promise<void> {
        try {
        const { reporterId, commentId, reason } = req.body

        if (!Object.values(ReportReason).includes(reason)) {
            res.status(400).json({ message: 'Invalid report reason' })
            return
        }

        const report = await this.reportService.reportComment(reporterId, commentId, reason)
        res.status(201).json(report)
        } catch (error) {
        console.error('Error reporting comment:', error)
        
        if ((error as Error).message === 'Reporter not found' || 
            (error as Error).message === 'Comment not found') {
            res.status(404).json({ message: (error as Error).message })
        } else {
            res.status(400).json({ message: (error as Error).message })
        }
        }
    }
}