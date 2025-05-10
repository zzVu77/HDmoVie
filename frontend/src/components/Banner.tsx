import { Star1 } from 'iconsax-reactjs'
import { AspectRatio } from './ui/aspect-ratio'
import { Text, Title } from './ui/typography'
import { Badge } from './ui/badge'
import { MovieType } from '@/types'
import { useMediaQuery } from 'usehooks-ts'
import Desktop from './shared/Desktop'
import { dummyGenres } from '@/data/dummyData'
interface BannerProps extends MovieType {
  isDesktop?: boolean
  position?: string
}

const Banner = ({ description, backdropSource, genres = dummyGenres, release, title, voteAvg }: BannerProps) => {
  const isDesktopBreakPoint = useMediaQuery('(min-width: 1024px)')
  return (
    <div className='w-full flex flex-col mx-auto relative'>
      <div className='w-full flex flex-col mx-auto relative'>
        <AspectRatio ratio={isDesktopBreakPoint ? 2 / 1 : 3 / 4}>
          {/* Movie Poster Image */}
          <img
            src={backdropSource || 'https://image.tmdb.org/t/p/original/ce3prrjh9ZehEl5JinNqr4jIeaB.jpg'}
            className='rounded-md object-cover w-full h-full'
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
              release={release}
              title={title}
              voteAvg={voteAvg}
            ></InformationContainer>
          </Desktop.Show>
        </AspectRatio>
      </div>
      <Desktop.Hide>
        <InformationContainer isDesktop={isDesktopBreakPoint} genres={dummyGenres}></InformationContainer>
      </Desktop.Hide>
    </div>
  )
}
export const InformationContainer = ({ description, genres, release, title, voteAvg, isDesktop }: BannerProps) => {
  return (
    <div
      className={`${isDesktop ? 'absolute' : ''} bottom-0 left-0 w-full flex items-end justify-start text-white p-4 sm:p-6 lg:p-8 lg:mb-[5%]`}
    >
      <div className='flex flex-col gap-4 w-fit max-w-[100vw] lg:max-w-[70vw] '>
        {/* Movie Title */}
        <Title className='lg:text-[60px] text-[40px] font-extrabold text-gradient-yellow w-full py-  lg:text-start text-center'>
          {title || 'The Matrix Avengers'}
        </Title>
        {/* Release Date and Rating */}
        <div className='flex flex-row items-start justify-center lg:justify-between gap-12 text-xs lg:w-fit w-full  '>
          <Text body={4} className='font-light lg:text-start text-center'>
            Release:{release || ' March 31, 1999'}
          </Text>
          <div className='flex flex-row items-center gap-1'>
            <Text body={4} className='font-light'>
              Rating: {voteAvg || '8.7/10'}
            </Text>
            <Star1 size={18} variant='Bold' color='var(--accent-yellow)'></Star1>
          </div>
        </div>
        {/* Movie Overview/Description */}
        <Text body={3} className='line-clamp-3 font-normal text-center lg:text-start'>
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
      </div>
    </div>
  )
}
export default Banner
