import { CastType } from '@/types'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Text } from './ui/typography'

const CastCard = ({ name, profilePath }: CastType) => {
  return (
    <div className='flex flex-col items-center gap-3 '>
      <Avatar className='w-[250px] h-[300px] rounded-[10px]  hover:scale-105 transition-transform duration-300 ease-in-out'>
        <AvatarImage
          src={profilePath || 'https://image.tmdb.org/t/p/original/8FMhYekyLR4ibHQ9Kpuaqe4cVjL.jpg'}
          className='object-cover object-top'
        />
        <AvatarFallback>Cast</AvatarFallback>
      </Avatar>
      <Text body={2}>{name || 'Jason Statham'}</Text>
    </div>
  )
}

export default CastCard
