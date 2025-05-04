import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MessageCircle, Heart, MessageSquareWarning, ArrowRight } from 'lucide-react'
import { Text } from './ui/typography'
import { cn } from '@/lib/utils'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { RegisteredUserType, TagType } from '@/types'

export interface BlogPostComponentProps {
  id: string
  content: string
  dateCreated: Date
  owner: RegisteredUserType
  tags: TagType[]
  likes: number
  comments: number
  images?: string[]
  className?: string
  isFirst?: boolean
  isLast?: boolean
  isShowCommentDivider?: boolean
}

export default function BlogCard({
  content,
  dateCreated,
  owner,
  tags,
  likes,
  comments,
  images,
  className,
  isFirst = false,
  isLast = false,
  isShowCommentDivider = false,
}: BlogPostComponentProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(likes)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isClamped, setIsClamped] = useState(false)
  const contentRef = useRef<HTMLParagraphElement>(null)

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsLiked(!isLiked)
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1)
  }

  useEffect(() => {
    const el = contentRef.current
    if (el) {
      const lineHeight = parseFloat(getComputedStyle(el).lineHeight)
      const maxHeight = lineHeight * 3
      setIsClamped(el.scrollHeight > maxHeight)
    }
  }, [])

  const hasImages = images && images.length > 0

  return (
    <Link to={`#`}>
      <Card
        className={cn(
          'w-full overflow-hidden bg-secondary-dark border-tertiary-dark hover:shadow-md py-0 px-2 gap-0',
          isFirst && 'rounded-t-3xl rounded-b-none border-1 border-b-0',
          isLast && 'rounded-b-3xl rounded-t-none border-1 border-t-0',
          !isFirst && !isLast && 'rounded-none border-1',
          isShowCommentDivider ? 'border-b-0' : '',
          className,
        )}
      >
        <CardHeader className='px-4 pt-4 pb-1 space-y-0'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <Avatar className='h-8 w-8'>
                <AvatarImage src={`/api/placeholder/50/50`} />
                <AvatarFallback>{owner.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div className='flex flex-col ml-2'>
                <div className='flex items-center gap-1'>
                  <Text className='text-sm text-white'>{owner.name}</Text>
                </div>
                <Text className='text-muted-foreground text-xs'>{new Date(dateCreated).toLocaleString()}</Text>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className='px-4 mb-1'>
          <div className='mb-2'>
            <Text
              body={4}
              ref={contentRef}
              className={`transition-all duration-300', ${!isExpanded && 'line-clamp-3'}`}
            >
              {content}
            </Text>
            {isClamped && (
              <button
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setIsExpanded(!isExpanded)
                }}
                className='text-sm text-blue-300 hover:underline mt-1 block'
              >
                {isExpanded ? 'Show less' : 'Show more'}
              </button>
            )}
          </div>

          <div className='flex items-center gap-2 mb-3 flex-wrap'>
            {tags.map((tag) => (
              <Badge
                key={tag.id}
                variant='outline'
                className='text-white cursor-pointer hover:border-primary-yellow hover:text-primary-yellow'
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                }}
              >
                {tag.name}
              </Badge>
            ))}
          </div>

          {hasImages && (
            <Carousel className='w-full mx-auto my-1'>
              <CarouselContent>
                {images!.map((imageUrl, index) => (
                  <CarouselItem key={index} className='flex justify-center'>
                    <img
                      src={imageUrl}
                      alt={`Blog image ${index + 1}`}
                      className='w-full object-cover rounded-sm self-center'
                      onError={(e) => {
                        ;(e.target as HTMLImageElement).src =
                          'https://makerworld.bblmw.com/makerworld/model/US2ab61bb7d3000c/design/2024-01-30_029b2304056c.png?x-oss-process=image/resize,w_1000/format,webp'
                      }}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              {images!.length > 1 && (
                <div className='group absolute top-1/2 -translate-y-1/2 right-4 flex justify-end items-center'>
                  <div className='rounded-full opacity-30 bg-secondary-dark text-white w-8 h-8 flex items-center justify-center'>
                    <ArrowRight size={16} className='text-white' />
                  </div>
                </div>
              )}
            </Carousel>
          )}
        </CardContent>

        <CardFooter className='flex items-center px-0 py-1'>
          <Button
            variant='ghost'
            size='lg'
            className={`p-1 h-auto flex items-center gap-1 hover:bg-tertiary-dark transition-colors ${
              isLiked ? 'text-red-500 hover:text-red-400' : 'text-primary-yellow hover:text-yellow-300'
            }`}
            onClick={handleLike}
          >
            <Heart size={18} fill={isLiked ? 'currentColor' : 'none'} />
            <Text>{likeCount}</Text>
          </Button>
          <Button
            variant='ghost'
            size='lg'
            className='p-1 h-auto flex items-center gap-1 text-primary-yellow hover:text-yellow-300 hover:bg-tertiary-dark transition-colors'
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
            }}
          >
            <MessageCircle size={18} />
            <Text>{comments}</Text>
          </Button>
          <Button
            variant='ghost'
            size='lg'
            className='p-1 h-auto flex items-center gap-1 text-primary-yellow hover:text-yellow-300 hover:bg-tertiary-dark transition-colors'
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
            }}
          >
            <MessageSquareWarning size={18} />
            &nbsp;
          </Button>
        </CardFooter>

        {isShowCommentDivider && <div className='mx-4 border-t border-tertiary-dark' />}
      </Card>
    </Link>
  )
}
