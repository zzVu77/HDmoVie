import { Star1 } from 'iconsax-reactjs'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { Card, CardContent, CardHeader } from './ui/card'
import { Text, Title } from './ui/typography'

type MovieCommentProps = {
  userName: string
  comment: string
  rating: number
  date: string
}
const MovieComment = ({ userName, comment, date, rating }: MovieCommentProps) => {
  return (
    <div>
      <Card className='w-full  flex flex-row items-center gap-10 bg-tertiary-dark border-none drop-shadow-white-glow'>
        <CardHeader className='px-2'>
          <Avatar className='w-[50px] h-[50px]'>
            <AvatarImage src='https://github.com/shadcn.png' />
            <AvatarFallback>Avatar</AvatarFallback>
          </Avatar>
        </CardHeader>
        <CardContent className='w-full'>
          <div className='flex flex-col gap-2  '>
            <div className='flex flex-row items-center justify-between pr-5 gap-2 '>
              <Title level={3}>{userName || 'Nguyen Van Vu'}</Title>
              <div className='flex flex-row items-center gap-2 h-auto'>
                <Text body={4} className='text-white '>
                  {date || '30/04/2025'}
                </Text>
                <Badge className='bg-white text-black font-bold rounded-2xl flex flex-row items-start justify-around gap-2 px-3 text-center'>
                  <Text body={3} className='text-black font-extrabold '>
                    {rating || 4.5}
                  </Text>
                  <div>
                    <Star1 variant='Bold' size={20} color='var(--accent-yellow)'></Star1>
                  </div>
                </Badge>
              </div>
            </div>
            <Text>{comment || 'This movie is so good! I love it!'}</Text>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default MovieComment
