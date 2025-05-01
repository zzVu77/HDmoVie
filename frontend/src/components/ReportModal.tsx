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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

// Định nghĩa lý do báo cáo
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
  comment: z.string().optional(),
})

export function ReportDialog() {
  const [open, setOpen] = useState(false)

  const form = useForm({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      reason: ReportReason.SPAM, // Default value
      comment: '', // Optional comment
    },
  })

  //   const onSubmit = async (data: any) => {
  //     try {
  //       toast.success("Report submitted successfully!")
  //       setOpen(false)
  //     } catch (error) {
  //       toast.error("Failed to submit report.")
  //     }
  //   }

  const onSubmit = async () => {
    try {
      toast.success('Report submitted successfully!')
      setOpen(false)
    } catch {
      toast.error('Failed to submit report.')
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='outline'>Report</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Report Content</DialogTitle>
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

          <div>
            <Label htmlFor='comment'>Additional Comments</Label>
            <Input id='comment' {...form.register('comment')} placeholder='Enter any additional comments (optional)' />
          </div>

          <DialogFooter>
            <Button type='submit'>Submit Report</Button>
            <Button type='button' onClick={() => setOpen(false)} variant='outline'>
              Cancel
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
