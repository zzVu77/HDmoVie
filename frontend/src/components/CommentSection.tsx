// components/CommentSection.tsx
import { useState, useEffect } from 'react'
import BlogCommentCard from './BlogCommentCard'
import { BlogCommentType } from '@/types'
import { Button } from '@/components/ui/button'
import { Text } from './ui/typography'
import { Textarea } from './ui/textarea'
import { Send } from 'lucide-react'
import CommentService from '@/services/commentService'

interface CommentSectionProps {
  blogId: string
}

// Update type guard to only check for BlogCommentType
// const isValidCommentResponse = (response: any): response is BlogCommentType => {
//   return (
//     response &&
//     typeof response === 'object' &&
//     'id' in response &&
//     'content' in response &&
//     'user' in response
//   )
// }

export default function CommentSection({ blogId }: CommentSectionProps) {
  const [comments, setComments] = useState<BlogCommentType[]>([])
  const [commentText, setCommentText] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Function to transform comments data structure
  const organizeComments = (comments: BlogCommentType[]): BlogCommentType[] => {
    // Create a map to store comments by their ID
    const commentMap = new Map<string, BlogCommentType>()

    // First pass: add all comments to the map
    comments.forEach((comment) => {
      commentMap.set(comment.id, { ...comment, replies: [] })
    })

    // Second pass: organize comments into a tree structure
    const rootComments: BlogCommentType[] = []

    comments.forEach((comment) => {
      const commentWithReplies = commentMap.get(comment.id)!
      if (comment.parentComment) {
        // This is a reply, add it to its parent's replies
        const parent = commentMap.get(comment.parentComment.id)
        if (parent) {
          parent.replies = parent.replies || []
          parent.replies.push(commentWithReplies)
        }
      } else {
        // This is a root comment
        rootComments.push(commentWithReplies)
      }
    })

    return rootComments
  }

  // Function to scroll to a specific comment
  const scrollToComment = (commentId: string) => {
    const element = document.getElementById(`comment-${commentId}`)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' })
      // Add a highlight effect
      element.classList.add('bg-tertiary-dark')
      setTimeout(() => {
        element.classList.remove('bg-tertiary-dark')
      }, 2000)
    }
  }

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const response = await CommentService.getBlogComments(blogId)
        // if (!Array.isArray(response)) {
        //   throw new Error('Invalid response format from server')
        // }
        // Transform the comments data structure
        const organizedComments = organizeComments(response.data)
        setComments(organizedComments)

        // Check if there's a comment ID in the URL hash
        const hash = window.location.hash
        if (hash) {
          const commentId = hash.substring(1) // Remove the # symbol
          // Wait for comments to be rendered
          setTimeout(() => scrollToComment(commentId), 100)
        }
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
      const response = await CommentService.createComment({
        blogId: blogId,
        content: commentText.trim(),
        parentCommentId: undefined,
      })

      // Add the new comment to the list using the response data
      setComments((prevComments) => [...prevComments, response.data])
      setCommentText('')
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to submit comment'
      alert(errorMessage)
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
