// components/CommentSection.tsx
import { useState, useEffect } from 'react'
import Comment, { CommentProps } from './BlogComment'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Text, Title } from './ui/typography'

// interface CommentSectionProps {
//   blogId: string
// }

const sampleComments: CommentProps[] = [
  {
    id: '1',
    content: 'This looks amazing! I would love to try making this at home.',
    dateCreated: new Date('2025-05-01T12:30:00Z').toISOString(),
    owner: {
      name: 'foodie_lover',
    },
  },
  {
    id: '2',
    content: 'Great recommendation! I tried this recipe and it turned out fantastic.',
    dateCreated: new Date('2025-05-01T14:15:00Z').toISOString(),
    owner: {
      name: 'chef_marcus',
    },
    replies: [
      {
        id: '2-1',
        content: 'Thanks for sharing! Did you modify any ingredients?',
        dateCreated: new Date('2025-05-01T15:30:00Z').toISOString(),
        owner: {
          name: 'helenscchin',
        },
      },
    ],
  },
]

// const CommentSection = ({ blogId }: CommentSectionProps) => {
const CommentSection = () => {
  const [comments, setComments] = useState<CommentProps[]>([])
  const [commentText, setCommentText] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setComments(sampleComments)
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const handleSubmitComment = () => {
    if (!commentText.trim()) return

    const newComment: CommentProps = {
      id: `new-${Date.now()}`,
      content: commentText,
      dateCreated: new Date().toISOString(),
      owner: {
        name: 'current_user',
      },
    }
    setComments([...comments, newComment])
    setCommentText('')
  }

  return (
    <div>
      <Title level={4} className='mb-4'>
        Comments
      </Title>

      {/* Input Box */}
      <Card className='bg-bg-tertiary-dark border border-zinc-700 mb-6'>
        <CardContent className='p-4'>
          <div className='flex items-start gap-3'>
            <Avatar className='h-10 w-10'>
              <AvatarImage src={`/api/placeholder/50/50`} />
              <AvatarFallback>ME</AvatarFallback>
            </Avatar>
            <div className='flex-1 rounded-xl border border-zinc-700 bg-tertiary-dark shadow-inner overflow-hidden'>
              <textarea
                className='w-full bg-tertiary-dark p-3 text-sm text-white placeholder-zinc-400 outline-none resize-none'
                rows={3}
                placeholder='Add a comment...'
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <div className='flex justify-end px-3 py-2 border-t border-zinc-700 bg-tertiary-dark'>
                <Button
                  disabled={!commentText.trim()}
                  onClick={handleSubmitComment}
                  className='text-sm font-medium text-white bg-zinc-900 hover:bg-zinc-700 rounded-md px-3 py-1.5 disabled:opacity-50'
                >
                  Comment
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comments */}
      {isLoading ? (
        <Text className='text-center py-4'>Loading comments...</Text>
      ) : comments.length === 0 ? (
        <Text className='text-center py-4'>No comments yet. Be the first to comment!</Text>
      ) : (
        <div className='space-y-4'>
          {comments.map((comment) => (
            <div key={comment.id}>
              <Comment comment={comment} />
              {comment.replies?.map((reply) => <Comment key={reply.id} comment={reply} isReply />)}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CommentSection
