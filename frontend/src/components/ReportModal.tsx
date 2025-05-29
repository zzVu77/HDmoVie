import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import React, { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import reportService from '@/services/reportService'
import { useNavigate, useLocation } from 'react-router-dom'

export enum ReportReason {
  SPAM = 'Spam or scams',
  DISCRIMINATION = 'Hate speech or discrimination',
  FALSE_INFORMATION = 'Misinformation or false information',
  HARASSMENT = 'Harassment or bullying',
  VIOLENCE = 'Violence or threats of violence',
  ILLEGAL_CONTENT = 'Illegal content or activity',
  SEXUAL_CONTENT = 'Sexual content or nudity',
}

// Định nghĩa schema cho form báo cáo
const reportSchema = z.object({
  reason: z.enum([
    ReportReason.SPAM,
    ReportReason.DISCRIMINATION,
    ReportReason.FALSE_INFORMATION,
    ReportReason.HARASSMENT,
    ReportReason.VIOLENCE,
    ReportReason.ILLEGAL_CONTENT,
    ReportReason.SEXUAL_CONTENT,
  ]),
})

type Props = {
  children?: React.ReactNode
  type: 'blog' | 'comment'
  targetId: string
}

export function ReportDialog({ children, type, targetId }: Props) {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const handleReportClick = () => {
    const accessToken = localStorage.getItem('access-token')
    if (!accessToken) {
      navigate(`/login?redirect=${location.pathname}`)
      return
    }
    setOpen(true)
  }

  const form = useForm<z.infer<typeof reportSchema>>({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      reason: ReportReason.SPAM,
    },
  })

  const onSubmit = async (data: z.infer<typeof reportSchema>) => {
    try {
      if (type === 'blog') {
        await reportService.reportBlog(targetId, data.reason)
      } else {
        await reportService.reportComment(targetId, data.reason)
      }
      toast.success('Report submitted successfully!')
      setOpen(false)
    } catch (error) {
      toast.error('Failed to submit report: ' + (error as Error).message)
    }
  }

  return (
    <Dialog modal={true} open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant='outline'
          className='w-fit h-fit bg-transparent hover:bg-transparent hover:text-primary-yellow border-none shadow-none'
          onClick={handleReportClick}
        >
          {children || 'Report'}
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Report {type === 'blog' ? 'Blog' : 'Comment'}</DialogTitle>
          <DialogDescription>Select a reason for the report and add any relevant comments.</DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <div>
            <Label htmlFor='reason'>Reason</Label>
            <select id='reason' {...form.register('reason')} className='w-full p-2 border rounded'>
              {Object.values(ReportReason).map((reason) => (
                <option key={reason} value={reason}>
                  {reason}
                </option>
              ))}
            </select>
          </div>

          <DialogFooter>
            <Button type='submit' onClick={form.handleSubmit(onSubmit)}>
              Submit Report
            </Button>
            <Button type='button' onClick={() => setOpen(false)} variant='outline'>
              Cancel
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default ReportDialog
