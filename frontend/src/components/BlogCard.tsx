import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MessageCircle, Heart, MessageSquareWarning } from 'lucide-react'
import { Text } from './ui/typography'
import { cn } from '@/lib/utils'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import ReportDialog from './ReportModal'
import { BlogPost } from '@/types'
export interface BlogCardProps {
  blog: BlogPost
  className?: string
  isFirst?: boolean
  isLast?: boolean
  isShowCommentDivider?: boolean
  isDetailView?: boolean
}

export default function BlogCard({
  blog,
  className,
  isFirst = false,
  isLast = false,
  isShowCommentDivider = false,
  isDetailView = false,
}: BlogCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(blog.likeCount)
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
  }, [blog.content])

  const hasImages = blog.imageUrls && blog.imageUrls.length > 0
  const cardContent = (
    <Card
      className={cn(
        'w-full overflow-hidden bg-secondary-dark border-0 border-tertiary-dark hover:shadow-md py-0 gap-0 rounded-none',
        !isFirst && 'border-t',
        isFirst && isLast && 'border-none',
        isShowCommentDivider ? '' : '',
        className,
      )}
    >
      <CardHeader className='px-5 pt-4 pb-1 space-y-0'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <Avatar className='h-8 w-8'>
              <AvatarImage src={`/api/placeholder/50/50`} />
              <AvatarFallback>{blog.owner.fullName.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div className='flex flex-col ml-2'>
              <div className='flex items-center gap-1'>
                <Text className='text-sm text-white'>{blog.owner.fullName}</Text>
              </div>
              <Text className='text-muted-foreground text-xs'>{new Date(blog.dateCreated).toLocaleString()}</Text>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className='px-5 mb-1'>
        <div className='mb-2'>
          <Text body={4} ref={contentRef} className={`transition-all duration-300', ${!isExpanded && 'line-clamp-3'}`}>
            {blog.content}
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

        <div className='flex items-center gap-2 mb-0 flex-wrap'>
          {blog.tags.map((tag) => (
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
          <Carousel opts={{ dragFree: true }} className='w-[90%] flex justify-center mx-auto mt-3 my-1 px-1'>
            <CarouselContent className='px-1 -ml-2'>
              {blog.imageUrls!.map((image, index) => (
                <>
                  <CarouselItem key={index} className='basis-auto pl-2 w-auto'>
                    <div className=' rounded-sm overflow-hidden h-auto   '>
                      <img
                        src={image.url}
                        alt={`Blog image ${index + 1}`}
                        className='object-cover object-center h-[280px]  w-[30api0px]'
                        onError={(e) => {
                          ;(e.target as HTMLImageElement).src =
                            'https://makerworld.bblmw.com/makerworld/model/US2ab61bb7d3000c/design/2024-01-30_029b2304056c.png?x-oss-process=image/resize,w_1000/format,webp'
                        }}
                      />
                    </div>
                  </CarouselItem>
                </>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        )}
      </CardContent>

      <CardFooter className='flex items-center px-1 py-1'>
        <Button
          variant='ghost'
          size='lg'
          className={`p-1 h-auto flex items-center gap-1 hover:bg-tertiary-dark transition-colors ${
            isLiked ? 'text-red-500 hover:text-red-400' : 'text-primary-yellow hover:text-yellow-300'
          }`}
          onClick={handleLike}
        >
          <Heart size={18} fill={isLiked ? 'currentColor' : 'none'} />
          <Text>{likeCount ?? 0}</Text>
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
          <Text>{blog.commentCount}</Text>
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
          <ReportDialog>
            <MessageSquareWarning size={18} />
          </ReportDialog>
        </Button>
      </CardFooter>

      {isShowCommentDivider && <div className='border-t border-tertiary-dark' />}
    </Card>
  )

  if (isDetailView) {
    return cardContent
  }

  return (
    <Link to={`/blog/${blog.id}`} className='w-full'>
      {cardContent}
    </Link>
  )
}
