import { InformationContainer } from '@/components/Banner'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { MovieType } from '@/types'
import { useEffect, useState } from 'react'
import { Carousel } from 'react-responsive-3d-carousel'
import 'react-responsive-3d-carousel/dist/styles.css'
import { useMediaQuery } from 'usehooks-ts'
import Desktop from './shared/Desktop'
type Carousel3DProps = {
  movies: MovieType[]
}
const Carousel3D = ({ movies }: Carousel3DProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentMovie, setCurrentMovie] = useState<MovieType>(movies[0])
  const items = movies.map((movie) => (
    <img src={movie.backdropSource} alt={movie.title} key={movie.id} className='rounded-lg object-cover' />
  ))
  const isDesktopBreakPoint = useMediaQuery('(min-width: 1024px)')
  useEffect(() => {
    setCurrentMovie(movies[currentIndex])
  }, [currentIndex, movies])
  return (
    <div>
      <Desktop.Show>
        <div className='flex flex-col items-center justify-center '>
          <AspectRatio ratio={2 / 1}>
            <img
              src={currentMovie.backdropSource}
              className='rounded-md object-cover w-full h-full relative'
              alt='Movie poster'
            />
            <div className='absolute top-0 left-0 w-full h-full bg-black opacity-55 rounded-md shadow-2xl drop-shadow-white-glow'></div>
          </AspectRatio>
          <div className='w-full h-auto absolute pt-[100px]'>
            <InformationContainer {...currentMovie} exploreNow />
            <Carousel
              boxShadow='0 0.1rem 0.5rem rgba(0, 0, 0, 0.5)'
              width='280px'
              height='150px'
              perspective='auto'
              showStatus={false}
              showArrows={false}
              items={items}
              startIndex={0}
              onChange={(index) => {
                if (isDesktopBreakPoint) {
                  setCurrentIndex(index)
                }
              }}
            />
          </div>
        </div>
      </Desktop.Show>

      <Desktop.Hide>
        <div className='flex flex-col gap-10 items-center justify-center'>
          <AspectRatio ratio={3 / 2}>
            <img
              src={currentMovie.backdropSource}
              className='rounded-md object-cover w-full h-full'
              alt='Movie poster'
            />
            <div className='absolute top-0 left-0 w-full h-full bg-black opacity-55 rounded-md shadow-2xl drop-shadow-white-glow'></div>
          </AspectRatio>
          <div className='w-full h-auto absolute top-20 sm:top-50 md:top-80'>
            <Carousel
              boxShadow='0 0.1rem 0.5rem rgba(0, 0, 0, 0.5)'
              width='200px'
              height='250px'
              perspective='auto'
              showStatus={false}
              showArrows={false}
              items={items}
              startIndex={0}
              onChange={(index) => {
                if (!isDesktopBreakPoint) {
                  setCurrentIndex(index)
                }
              }}
              autoPlay={false}
              pauseOnHover={true}
            />
          </div>
          <div className='mt-12 sm:mt-10 md:mt-8'>
            <InformationContainer exploreNow {...currentMovie} isDesktop={isDesktopBreakPoint} />
          </div>
        </div>
      </Desktop.Hide>
    </div>
  )
}

export default Carousel3D
