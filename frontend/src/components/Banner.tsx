import { dummyGenres } from '@/data/dummyData'
import { cn } from '@/lib/utils'
import { MovieType } from '@/types'
import { Star1 } from 'iconsax-reactjs'
import { useMediaQuery } from 'usehooks-ts'
import Desktop from './shared/Desktop'
import { AspectRatio } from './ui/aspect-ratio'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Text, Title } from './ui/typography'
import { Link } from 'react-router-dom'
interface BannerProps extends MovieType {
  isDesktop?: boolean
  position?: string
  exploreNow?: boolean
}

const Banner = ({
  id,
  description,
  backdropSource,
  genres = dummyGenres,
  releaseYear,
  title,
  voteAvg,
  exploreNow = false,
}: BannerProps) => {
  const isDesktopBreakPoint = useMediaQuery('(min-width: 1024px)')
  return (
    <div className='w-full flex flex-col mx-auto relative'>
      <div className='w-full flex flex-col mx-auto relative'>
        <AspectRatio ratio={isDesktopBreakPoint ? 5 / 2 : 8 / 4}>
          {/* Movie Poster Image */}
          <img
            src={backdropSource || 'https://image.tmdb.org/t/p/original/ce3prrjh9ZehEl5JinNqr4jIeaB.jpg'}
            className='rounded-md object-cover object-top w-full h-full'
            alt='Movie poster'
          />
          {/* Dark Overlay */}
          {/* Movie Information Container */}
          <Desktop.Show>
            <div className='absolute top-0 left-0 w-full h-full bg-black opacity-55 rounded-md shadow-2xl drop-shadow-white-glow'></div>
            <InformationContainer
              isDesktop={isDesktopBreakPoint}
              description={description}
              genres={genres}
              releaseYear={releaseYear}
              title={title}
              voteAvg={voteAvg}
              exploreNow={exploreNow}
              id={id}
            ></InformationContainer>
          </Desktop.Show>
        </AspectRatio>
      </div>
      <Desktop.Hide>
        <InformationContainer
          isDesktop={isDesktopBreakPoint}
          description={description}
          genres={genres}
          releaseYear={releaseYear}
          title={title}
          voteAvg={voteAvg}
          exploreNow={exploreNow}
          id={id}
        ></InformationContainer>
      </Desktop.Hide>
    </div>
  )
}
export const InformationContainer = ({
  id,
  description,
  genres,
  releaseYear,
  title,
  voteAvg,
  isDesktop,
  exploreNow = false,
}: BannerProps) => {
  return (
    <div
      className={`${isDesktop ? 'absolute' : ''} bottom-0 left-0 w-full flex items-end justify-start text-white p-4 sm:p-6 lg:pt-8 `}
    >
      <div className='flex flex-col lg:items-start  items-center  justify-center gap-4 w-fit max-w-[100vw] lg:max-w-[70vw] '>
        {/* Movie Title */}
        <Title className='lg:text-[60px] text-[40px] font-extrabold text-gradient-yellow w-full py-  lg:text-start text-center'>
          {title || 'The Matrix Avengers'}
        </Title>
        {/* Release Date and Rating */}
        <div className='flex flex-row items-start justify-center lg:justify-between gap-12 text-xs lg:w-fit w-full  '>
          <Text body={4} className='font-light lg:text-start text-center'>
            Release:{releaseYear || ' March 31, 1999'}
          </Text>
          <div className='flex flex-row items-center gap-1'>
            <Text body={4} className='font-light'>
              Rating: {voteAvg || '8.7/10'}
            </Text>
            <Star1 size={18} variant='Bold' color='var(--accent-yellow)'></Star1>
          </div>
        </div>
        {/* Movie Overview/Description */}
        <Text body={3} className='line-clamp-2 font-normal text-center lg:text-start w-[80%]'>
          {description ||
            `  A fearless knight braves a deadly realm to save the Chosen One’s soul. Facing witches, demons, and brutal foes,
      he discovers her return could ignite chaos and doom humanity.`}
        </Text>
        <div className='flex flex-row items-center justify-center lg:justify-start gap-5'>
          {genres?.map((genre) => (
            <Badge
              key={genre.id}
              variant='outline'
              className='shadow-2xl bg-transparent opacity-75 border-secondary-yellow text-secondary-yellow font-semibold text-md px-2'
            >
              {genre.name || 'Action'}
            </Badge>
          ))}
        </div>
        <Link to={`/movie/${id}`}>
          <Button
            type='button'
            className={cn(
              `bg-primary-yellow text-primary-dark font-bold shadow-white-glow-down  gap-2 lg:text-lg p-3 `,
              exploreNow ? 'flex' : 'hidden',
            )}
          >
            Explore Now
          </Button>
        </Link>
      </div>
    </div>
  )
}
export default Banner
