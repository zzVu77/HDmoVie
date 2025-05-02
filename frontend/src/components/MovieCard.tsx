import { SaveAdd, Star1 } from 'iconsax-reactjs'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Text } from './ui/typography'
import { AspectRatio } from './ui/aspect-ratio'
import { MovieType } from '@/types'

const MovieCard = ({ posterSource = '', release = '', title = '', voteAvg = 0, genres }: MovieType) => {
  return (
    <div>
      <Card className='w-fit flex flex-col rounded-none bg-transparent border-none shadow-none hover:scale-100 transition-all duration-300 gap-1 cursor-pointer '>
        <CardHeader className='w-full flex flex-col items-center p-0 gap-7 min-w-[250px] '>
          <AspectRatio ratio={3 / 4}>
            <img
              className='object-cover w-full h-[350px] object-center rounded-lg filter hover:drop-shadow-[0_4px_50px_rgba(255,255,255,0.5)] hover:scale-105 transition-all duration-300 drop-shadow-white-glow'
              src={posterSource || 'https://image.tmdb.org/t/p/original/janjdSMrTRGtPrI1p9uOX66jv7x.jpg'}
              alt='poster'
            />
          </AspectRatio>
          <CardTitle>
            <Text body={1}>{title || "A Knight's War"}</Text>
            <div className='flex items-center justify-between '></div>
          </CardTitle>
        </CardHeader>
        <CardContent className='flex flex-row justify-between items-center w-full gap-4 px-2 '>
          <Text body={4}>{release || '2018'}</Text>
          <Text body={4} className='flex items-center gap-2'>
            {voteAvg || 4.5}
            <Star1 size='18' variant='Bold' color='var(--accent-yellow)' />
          </Text>
        </CardContent>
        <CardFooter className='gap-2 flex-col px-2'>
          <div className='flex flex-row gap-2'>
            {genres?.map((genre) => (
              <Badge key={genre.id} className='bg-tertiary-dark'>
                {genre.name}
              </Badge>
            ))}
          </div>
          <Button className='grow bg-tertiary-yellow w-full rounded-4xl hover:ease-in-out hover:scale-105 cursor-pointer transition-all duration-300'>
            <SaveAdd size='32' color='#ffff' variant='Bold' />
            <Text body={3} className=' font-bold leading-3'>
              Add to Watchlist
            </Text>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default MovieCard
