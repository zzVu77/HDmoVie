// components/Comment.tsx
import { useState } from 'react'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Text } from './ui/typography'
import { MessageCircle, Flag, Send } from 'lucide-react'
import { BlogCommentType } from '@/types'
import { cn } from '@/lib/utils'
import { Textarea } from './ui/textarea'
import ReportDialog from './ReportModal'
import CommentService from '@/services/commentService'

interface BlogCommentCardProps {
  comment: BlogCommentType
  isReply?: boolean
  blogId: string
  onCommentAdded?: (newComment: BlogCommentType) => void
}

export default function BlogCommentCard({ comment, isReply = false, blogId, onCommentAdded }: BlogCommentCardProps) {
  const [showReplyInput, setShowReplyInput] = useState(false)
  const [replyText, setReplyText] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const submitReply = async () => {
    if (!replyText.trim()) return

    try {
      setIsSubmitting(true)
      const response = await CommentService.createComment({
        content: replyText,
        blogId: blogId,
        parentCommentId: comment.id,
      })
      if (onCommentAdded) {
        onCommentAdded(response.data.data)
      }

      setReplyText('')
      setShowReplyInput(false)
    } catch (err) {
      alert((err as Error).message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Card
        className={cn(
          'bg-secondary-dark m-0 pb-2 pt-4 px-2 gap-0 rounded-none',
          !isReply
            ? 'border-tertiary-dark border-b-0 border-l-0 border-r-0'
            : 'border-tertiary-dark border-b-0 border-r-0 border-t-0 ml-8 pt-0 pb-2 pl-3',
        )}
      >
        <CardHeader className='px-4 space-y-0'>
          <div className='flex items-start justify-between'>
            <div className='flex items-center gap-2'>
              <Avatar className='h-8 w-8'>
                <AvatarImage src={`/api/placeholder/50/50`} />
                <AvatarFallback>{comment.owner?.fullName.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div className='flex flex-col ml-2 flex-nowrap'>
                <Text className='text-sm text-white ml-2'>{comment.owner?.fullName}</Text>
                <Text className='text-muted-foreground text-xs ml-2'>
                  {new Date(comment.dateCreated).toLocaleString()}
                </Text>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className='px-4 mt-1'>
          <Text>{comment.content}</Text>
        </CardContent>

        <CardFooter className='flex items-center px-0 py-1 mt-1'>
          {!isReply && (
            <>
              <Button
                variant='ghost'
                size='lg'
                className='p-1 h-auto flex items-center gap-1 text-primary-yellow hover:text-yellow-300 hover:bg-tertiary-dark transition-colors'
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setShowReplyInput(!showReplyInput)
                }}
              >
                <MessageCircle size={18} />
                <Text>{comment.replies?.length ?? 0}</Text>
              </Button>
            </>
          )}
          <Button
            variant='ghost'
            size='lg'
            className='p-1 h-auto flex items-center gap-1 text-primary-yellow hover:text-yellow-300 hover:bg-tertiary-dark transition-colors'
          >
            <ReportDialog>
              <Flag size={18} />
            </ReportDialog>
          </Button>
        </CardFooter>
      </Card>
      {showReplyInput && (
        <div className='px-2 pb-3'>
          <div className='px-4 flex items-start gap-2 mt-2'>
            <Avatar className='h-8 w-8'>
              <AvatarImage src={`/api/placeholder/30/30`} />
              <AvatarFallback>me</AvatarFallback>
            </Avatar>
            <Textarea
              className='resize-none flex-1 rounded-xl ml-2 mr-2 border-tertiary-dark bg-secondary-dark text-white shadow-inner'
              placeholder='Share your thoughts...'
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
            />
          </div>
          <div className='flex justify-end px-7 py-2 mt-1 bg-secondary-dark '>
            <Button
              className='text-sm font-medium text-primary-dark cursor-pointer bg-tertiary-yellow rounded-md px-3 py-1.5 disabled:opacity-50'
              disabled={!replyText.trim() || isSubmitting}
              onClick={submitReply}
            >
              <Send size={16} className='mr-1' />
              {isSubmitting ? 'Sending...' : 'Reply'}
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
