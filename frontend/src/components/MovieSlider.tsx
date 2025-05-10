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
        slidesToScroll: 1,
        watchDrag: true,
        skipSnaps: true,
      }}
      className='w-full'
    >
      <CarouselContent>
        {movies.map((movie) => (
          <CarouselItem key={movie.id} className='sm:basis-1/2  lg:basis-1/3 xl:basis-1/5'>
            <div className='flex items-center justify-center w-full p-0'>
              <MovieCard {...movie} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}

export default MovieSlider
