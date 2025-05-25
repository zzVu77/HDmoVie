import { MovieCommentProps } from '@/types'
import { Star1 } from 'iconsax-reactjs'
import { MessageSquareWarning } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { Card, CardContent, CardHeader } from './ui/card'
import { Text, Title } from './ui/typography'
import ReportDialog from './ReportModal'

const MovieComment = ({ userName, comment, date, rating, id }: MovieCommentProps) => {
  // console.log('MovieComment', userName, comment, date, rating)
  return (
    <div>
      <Card
        id={`comment-${id}`}
        className='w-full flex flex-col sm:flex-row items-center gap-2 md:gap-10 bg-tertiary-dark border-none drop-shadow-white-glow py-5 justify-center'
      >
        <CardHeader className='px-5  w-full md:w-auto flex justify-center md:justify-start'>
          <Avatar className='w-[50px] h-[50px]'>
            <AvatarImage src='https://github.com/shadcn.png' />
            <AvatarFallback>{userName?.charAt(0) || 'A'}</AvatarFallback>
          </Avatar>
        </CardHeader>
        <CardContent className='w-full'>
          <div className='flex flex-col gap-2'>
            <div className='flex flex-col md:flex-row items-center justify-between gap-2'>
              <Title level={4}>{userName}</Title>
              <div className='flex flex-row items-center gap-2 h-auto'>
                <Text body={4} className='text-gray-300 italic'>
                  {new Date(date).toLocaleDateString('en-US')}
                </Text>
                <Badge className='bg-white/90 text-black font-bold rounded-xl min-w-12 flex flex-row items-start justify-center gap-1 px-2 text-center '>
                  <Text body={3} className='text-black font-extrabold'>
                    {rating}
                  </Text>
                  <div>
                    <Star1 variant='Bold' size={20} color='var(--accent-yellow)' />
                  </div>
                </Badge>
                <ReportDialog targetId={id} type='comment'>
                  <MessageSquareWarning className='h-10 w-10 text-primary-yellow ' />
                </ReportDialog>
              </div>
            </div>
            <Text className='w-full text-wrap text-center md:text-start block max-w-[90vw] '>{comment}</Text>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default MovieComment
