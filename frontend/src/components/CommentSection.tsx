// components/CommentSection.tsx
import { useState, useEffect } from 'react'
import BlogCommentCard from './BlogCommentCard'
import { BlogCommentType } from '@/types'
import { Button } from '@/components/ui/button'
import { Text } from './ui/typography'
import { Textarea } from './ui/textarea'
import { Send } from 'lucide-react'
import CommentService from '@/services/commentService'
import { apiPost } from '@/utils/axiosConfig'

interface CommentSectionProps {
  blogId: string
}

export default function CommentSection({ blogId }: CommentSectionProps) {
  const [comments, setComments] = useState<BlogCommentType[]>([])
  const [commentText, setCommentText] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const response = await CommentService.getBlogComments(blogId)
        if (!response.data || !Array.isArray(response.data.data)) {
          throw new Error('Invalid response format from server')
        }
        setComments(response.data.data)
      } catch (err: unknown) {
        alert((err as Error).message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchComments()
  }, [blogId])

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
      ) : error ? (
        <Text className='text-center py-4 text-red-400'>{error}</Text>
      ) : comments.length === 0 ? (
        <Text className='text-center py-4'>No comments yet. Be the first to comment!</Text>
      ) : (
        <div>
          {comments.map((comment) => (
            <div key={comment.id} className='m-0'>
              <BlogCommentCard
                comment={comment}
                blogId={blogId}
                onCommentAdded={(newComment) => {
                  setComments((prevComments) =>
                    prevComments.map((c) =>
                      c.id === comment.id ? { ...c, replies: [...(c.replies || []), newComment] } : c,
                    ),
                  )
                }}
              />
              {comment.replies?.map((reply) => (
                <BlogCommentCard key={reply.id} comment={reply} isReply blogId={blogId} />
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
