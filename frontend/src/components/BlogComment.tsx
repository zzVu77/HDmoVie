// components/Comment.tsx
import { useState } from 'react'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Text } from './ui/typography'
import { Reply } from 'lucide-react'

export interface RegisteredUser {
  id: string
  name: string
}

export interface Blog {
  id: string
  content: string
  dateCreated: Date
  owner: RegisteredUser
  tags: Tag[]
}

export interface Tag {
  id: string
  name: string
}

export interface CommentProps {
  id: string
  content: string
  dateCreated: string
  owner: {
    name: string
  }
  replies?: CommentProps[]
}

export interface BlogComment {
  id: string
  content: string
  date: Date
  type: string
  user: RegisteredUser
  parentComment?: BlogComment
  blog?: Blog
}

const Comment = ({ comment, isReply = false }: { comment: CommentProps; isReply?: boolean }) => {
  const [showReplyInput, setShowReplyInput] = useState(false)
  const [replyText, setReplyText] = useState('')

  const handleReply = () => {
    setShowReplyInput(!showReplyInput)
  }

  const submitReply = () => {
    setReplyText('')
    setShowReplyInput(false)
  }

  return (
    <Card className={`bg-tertiary-dark border border-zinc-800 mb-3 ${isReply ? 'ml-12' : ''}`}>
      <CardHeader className='px-4 py-3 flex flex-row items-start gap-3'>
        <Avatar className='h-8 w-8'>
          <AvatarImage src={`/api/placeholder/40/40`} />
          <AvatarFallback>{comment.owner.name.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <div className='flex-1'>
          <div className='flex items-center gap-1'>
            <Text className='text-sm font-semibold'>{comment.owner.name}</Text>
          </div>
          <Text className='text-xs text-muted-foreground'>{new Date(comment.dateCreated).toLocaleString()}</Text>
        </div>
      </CardHeader>

      <CardContent className='px-4 py-2'>
        <Text className='line-clamp-3'>{comment.content}</Text>
      </CardContent>

      <CardFooter className='px-4 py-2 flex justify-between border-t border-zinc-800'>
        <div className='flex items-center gap-4'>
          <Button
            variant='ghost'
            size='sm'
            className='p-0 h-auto flex items-center gap-1 text-primary-yellow hover:text-yellow-300 hover:bg-zinc-700 transition-colors'
            onClick={handleReply}
          >
            <Reply size={14} />
            <Text className='text-xs'>Reply</Text>
          </Button>
        </div>
      </CardFooter>

      {showReplyInput && (
        <div className='px-4 pb-3'>
          <div className='flex items-start gap-2 mt-2'>
            <Avatar className='h-6 w-6 mt-1'>
              <AvatarImage src={`/api/placeholder/30/30`} />
              <AvatarFallback>ME</AvatarFallback>
            </Avatar>
            <div className='flex-1 rounded-xl border border-zinc-700 bg-tertiary-dark shadow-inner overflow-hidden'>
              <textarea
                className='w-full bg-tertiary-dark p-3 text-sm text-white placeholder-zinc-400 outline-none resize-none'
                rows={2}
                placeholder='Write a reply...'
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
              />
              <div className='flex justify-end px-3 py-2 border-t border-zinc-700 bg-tertiary-dark'>
                <Button
                  size='sm'
                  className='text-sm font-medium text-white border-zinc-800 hover:bg-zinc-700 rounded-md px-3 py-1.5 disabled:opacity-50'
                  disabled={!replyText.trim()}
                  onClick={submitReply}
                >
                  Reply
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Card>
  )
}

export default Comment
