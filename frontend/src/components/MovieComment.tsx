import { Star1 } from 'iconsax-reactjs'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { Card, CardContent, CardHeader } from './ui/card'
import { Text, Title } from './ui/typography'
import { MovieCommentProps } from '@/types'

const MovieComment = ({ userName, comment, date, rating }: MovieCommentProps) => {
  // console.log('MovieComment', userName, comment, date, rating)
  return (
    <div>
      <Card className='w-auto flex flex-row items-center gap-10 bg-tertiary-dark border-none drop-shadow-white-glow'>
        <CardHeader className='px-5'>
          <Avatar className='lg:w-[50px] lg:h-[50px] w-[40px] h-[40px]'>
            <AvatarImage src='https://github.com/shadcn.png' />
            <AvatarFallback>{userName?.charAt(0) || 'A'}</AvatarFallback>
          </Avatar>
        </CardHeader>
        <CardContent className='w-full'>
          <div className='flex flex-col gap-2'>
            <div className='flex flex-row items-center justify-between gap-2'>
              <Title level={4}>{userName}</Title>
              <div className='flex flex-row items-center gap-2 h-auto'>
                <Text body={4} className='text-gray-300 italic'>
                  {date}
                </Text>
                <Badge className='bg-white text-black font-bold rounded-2xl min-w-20 flex flex-row items-start justify-center gap-2 px-3 text-center'>
                  <Text body={3} className='text-black font-extrabold'>
                    {rating}
                  </Text>
                  <div>
                    <Star1 variant='Bold' size={20} color='var(--accent-yellow)' />
                  </div>
                </Badge>
              </div>
            </div>
            <Text className='w-10'>{comment}</Text>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default MovieComment
