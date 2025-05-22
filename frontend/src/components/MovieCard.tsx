import { MovieType } from '@/types'
import { SaveAdd, Star1 } from 'iconsax-reactjs'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Text } from './ui/typography'
import QuickAddToWatchlist from './QuickAddToWatchlist'
const MovieCard = ({ posterSource = '', releaseYear = '', title = '', voteAvg = 0, genres, id }: MovieType) => {
  return (
    <div className='mx-auto'>
      <Card className='w-[250px]  flex flex-col rounded-none bg-transparent border-none shadow-none hover:scale-100 transition-all duration-300 gap-1 cursor-pointer '>
        <a href={`/movie/${id}`} className='w-fit'>
          <CardHeader className='flex flex-col items-center p-0 gap-7 w-[250px] '>
            <img
              className='object-cover w-[full] h-[350px] object-center rounded-lg filter hover:drop-shadow-[0_4px_50px_rgba(255,255,255,0.5)] hover:scale-105 transition-all duration-300 drop-shadow-white-glow'
              src={posterSource || 'https://image.tmdb.org/t/p/original/janjdSMrTRGtPrI1p9uOX66jv7x.jpg'}
              alt='poster'
            />
            <CardTitle className='text-center '>
              <Text body={2} className='line-clamp-1'>
                {title || "A Knight's War"}
              </Text>
              <div className='flex items-center justify-between '></div>
            </CardTitle>
          </CardHeader>
          <CardContent className='flex flex-row justify-between items-center w-full gap-4 px-2 my-2 '>
            <Text body={4}>{releaseYear || '2018'}</Text>
            <Text body={4} className='flex items-center gap-2'>
              {voteAvg || 4.5}
              <Star1 size='18' variant='Bold' color='var(--accent-yellow)' />
            </Text>
          </CardContent>
        </a>

        <CardFooter className='gap-4 flex-col px-2'>
          <div className='flex flex-row gap-2'>
            {genres?.map((genre) => (
              <Badge key={genre.id} className='bg-tertiary-dark'>
                {genre.name}
              </Badge>
            ))}
          </div>
          <QuickAddToWatchlist>
            <Button className='grow bg-tertiary-yellow w-full rounded-4xl hover:ease-in-out hover:scale-105 cursor-pointer transition-all duration-300'>
              <SaveAdd size='32' color='#ffff' variant='Bold' />
              <Text body={4} className=' font-bold leading-3'>
                Add to Watchlist
              </Text>
            </Button>
          </QuickAddToWatchlist>
        </CardFooter>
      </Card>
    </div>
  )
}

export default MovieCard
