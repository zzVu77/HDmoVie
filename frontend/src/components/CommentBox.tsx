import { Send2, Star1 } from 'iconsax-reactjs'
import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Textarea } from './ui/textarea'
import { Text } from './ui/typography'
import { toast } from 'sonner'
import { useParams } from 'react-router-dom'
import { MovieCommentProps } from '@/types'
import CommentService from '@/services/commentService'

// Define schema for form validation
const reviewSchema = z.object({
  rating: z.number().min(1, 'Please select at least 1 star').max(10, 'Maximum 10 stars allowed'),
  content: z
    .string()
    .min(60, 'Review must be at least 60 characters long')
    .max(500, 'Review can be up to 500 characters long')
    .refine((val) => val.trim().length > 0, 'Review content is required'),
})

type ReviewFormValues = z.infer<typeof reviewSchema>

interface CommentBoxProps {
  onCommentAdded?: (comment: MovieCommentProps) => void
}

const CommentBox: React.FC<CommentBoxProps> = ({ onCommentAdded }) => {
  const { id } = useParams<{ id: string }>()
  const [hoveredRating, setHoveredRating] = useState<number | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 0,
      content: '',
    },
  })

  const onSubmit = async (data: ReviewFormValues) => {
    if (isSubmitting || !id) return

    try {
      setIsSubmitting(true)

      const response = await CommentService.createMovieComment(id, {
        score: data.rating,
        content: data.content,
      })

      // Transform and call onCommentAdded with the new comment
      if (onCommentAdded) {
        onCommentAdded(CommentService.transformMovieCommentResponse(response.data))
      }

      toast.success('Review submitted successfully!')
      form.reset()
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to submit review'
      toast.error(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle rating click
  const handleRatingClick = (rating: number) => {
    form.setValue('rating', rating)
  }

  return (
    <Card className='shadow-white-glow-down w-full mx-auto bg-secondary-dark border-[1px] border-tertiary-dark'>
      <CardHeader>
        <CardTitle className='text-2xl font-extrabold text-accent-yellow shadow-white-glow-down text-primary-yellow'>
          Write your review
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            {/* Rating Field */}
            <FormField
              control={form.control}
              name='rating'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-white '>Rating</FormLabel>
                  <FormControl>
                    <div className='flex space-x-1'>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
                        <Star1
                          variant='Bold'
                          key={star}
                          size={24}
                          className={`cursor-pointer transition-colors border-red-100 ${
                            (hoveredRating ?? field.value) >= star ? 'text-primary-yellow' : 'text-tertiary-dark'
                          }`}
                          onClick={() => handleRatingClick(star)}
                          onMouseEnter={() => setHoveredRating(star)}
                          onMouseLeave={() => setHoveredRating(null)}
                        />
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage className='text-red-400' />
                </FormItem>
              )}
            />

            {/* Textarea Field */}
            <FormField
              control={form.control}
              name='content'
              render={({ field }) => (
                <FormItem>
                  <div className='flex flex-row items-center justify-between'>
                    <FormLabel className='text-white font-semibold'>Your Review</FormLabel>
                    {/* Submit Button */}
                    <Button
                      type='submit'
                      disabled={isSubmitting}
                      className='bg-primary-yellow text-white shadow-white-glow-down w-fit flex flex-row items-center gap-2 disabled:opacity-50'
                    >
                      <Send2 size='32' color='var(--color-primary-dark)' variant='Bold' />
                      <Text body={4} className='text-primary-dark font-bold'>
                        {isSubmitting ? 'Submitting...' : 'Submit Review'}
                      </Text>
                    </Button>
                  </div>
                  <FormControl>
                    <Textarea
                      placeholder='Write your review about the movie...'
                      className='text-white focus:ring-primary-yellow focus:border-primary-yellow'
                      disabled={isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className='text-red-400' />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default CommentBox
