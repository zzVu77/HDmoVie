import MovieCard from '@/components/MovieCard'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { MovieType } from '@/types'
import * as React from 'react'

type MovieSliderProps = {
  movies: MovieType[]
}

const MovieSlider: React.FC<MovieSliderProps> = ({ movies }) => {
  return (
    <Carousel
      opts={{
        align: 'start',
        dragFree: true,
      }}
      className='w-full'
    >
      <CarouselContent>
        {movies.map((movie) => (
          <CarouselItem key={movie.id} className='sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5'>
            <div className='flex items-center justify-center w-full'>
              <MovieCard {...movie} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}

export default MovieSlider
