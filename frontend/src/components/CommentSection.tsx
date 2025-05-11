// components/CommentSection.tsx
import { useState, useEffect } from 'react'
import BlogCommentCard from './BlogCommentCard'
import { BlogCommentType } from '@/types'
import { Button } from '@/components/ui/button'
import { Text } from './ui/typography'
import { Textarea } from './ui/textarea'
import { Send } from 'lucide-react'
import { apiPost } from '@/utils/axiosConfig'

// interface CommentSectionProps {
//   blogId: string
// }

const sampleComments: BlogCommentType[] = [
  {
    id: '0',
    content:
      'This looks amazing! I would love to try making this at home. This looks amazing! I would love to try making this at home. This looks amazing! I would love to try making this at home. This looks amazing! I would love to try making this at home.',
    dateCreated: new Date('2025-05-01T12:30:00Z').toISOString(),
    owner: {
      id: 'user-1',
      name: 'foodie_lover',
    },
  },
  {
    id: '1',
    content: 'This looks amazing! I would love to try making this at home.',
    dateCreated: new Date('2025-05-01T12:30:00Z').toISOString(),
    owner: {
      id: 'user-1',
      name: 'foodie_lover',
    },
    replies: [
      {
        id: '1-1',
        content:
          'Thanks for sharing! Did you modify any ingredients? Thanks for sharing! Did you modify any ingredients? Thanks for sharing! Did you modify any ingredients? Thanks for sharing! Did you modify any ingredients?',
        dateCreated: new Date('2025-05-01T12:45:00Z').toISOString(),
        owner: {
          id: 'user-2',
          name: 'helenscchin',
        },
      },
      {
        id: '1-2',
        content: 'Damnnn?',
        dateCreated: new Date('2025-05-01T11:30:00Z').toISOString(),
        owner: {
          id: 'user-2',
          name: 'helenscchin',
        },
      },
    ],
  },
  {
    id: '2',
    content: 'This is a placeholder comment.',
    dateCreated: new Date('2025-05-01T14:00:00Z').toISOString(),
    owner: {
      id: 'user-3',
      name: 'chef_marcus',
    },
    replies: [
      {
        id: '2-1',
        content: 'Thanks for sharing! Did you modify any ingredients?',
        dateCreated: new Date('2025-05-01T15:30:00Z').toISOString(),
        owner: {
          id: 'user-4',
          name: 'helenscchin',
        },
      },
      {
        id: '2-2',
        content: 'Damnnn?',
        dateCreated: new Date('2025-05-01T11:30:00Z').toISOString(),
        owner: {
          id: 'user-5',
          name: 'helenscchin',
        },
      },
    ],
  },
]

// const CommentSection = ({ blogId }: CommentSectionProps) => {
export default function CommentSection() {
  const [comments, setComments] = useState<BlogCommentType[]>([])
  const [commentText, setCommentText] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setComments(sampleComments)
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const handleSubmitComment = async () => {
    if (!commentText.trim() || isSubmitting) return

    try {
      setIsSubmitting(true)
      const response = await apiPost<BlogCommentType>('/comments/blog', {
        blogId: '3', // You might want to make this dynamic based on the current blog
        content: commentText.trim(),
        parentCommentId: null,
      })

      // Add the new comment to the list
      setComments((prevComments) => [...prevComments, response.data])
      setCommentText('')
      // } catch (error) {
      //   console.error('Failed to post comment:', error)
      //   // You might want to show an error message to the user here
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      {/* Input Box */}
      <div className='px-4 mb-4'>
        <div className='flex items-start gap-2'>
          <Textarea
            className='resize-none min-h-0 flex-1 rounded-xl px-2 py-1 border-none bg-secondary-dark text-white shadow-inner focus-visible:ring-0'
            placeholder='Share your thoughts...'
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            disabled={isSubmitting}
          />
        </div>
        <div
          className={`flex justify-end mr-5 my-0 bg-secondary-dark overflow-hidden transition-all duration-300 ${
            commentText.trim().length > 0 ? 'h-9' : 'h-0'
          }`}
        >
          <Button
            className='text-sm font-medium text-primary-dark cursor-pointer bg-tertiary-yellow rounded-md px-3 py-1.5 disabled:opacity-50'
            disabled={!commentText.trim() || isSubmitting}
            onClick={handleSubmitComment}
          >
            <Send size={16} className='mr-1' />
            {isSubmitting ? 'Posting...' : 'Reply'}
          </Button>
        </div>
      </div>

      {/* Comments */}
      {isLoading ? (
        <Text className='text-center py-4'>Loading comments...</Text>
      ) : comments.length === 0 ? (
        <Text className='text-center py-4'>No comments yet. Be the first to comment!</Text>
      ) : (
        <div>
          {comments.map((comment) => (
            <div key={comment.id} className='m-0'>
              <BlogCommentCard comment={comment} />
              {comment.replies?.map((reply) => <BlogCommentCard key={reply.id} comment={reply} isReply />)}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
