import { WatchlistMovieProps } from '@/types'
import { Star, Minus } from 'lucide-react'
import { Text, Title } from '@/components/ui/typography'

export default function WatchlistItem({
  index,
  title,
  description,
  posterSource,
  releaseYear,
  voteAvg,
  voteCount,
  genres,
  casts,
}: WatchlistMovieProps) {
  return (
    <div className='w-full flex flex-col bg-secondary-dark rounded-lg p-3'>
      {/* Above: Movie Poster and Info */}
      <div className='flex flex-row items-start justify-between w-full'>
        {/* Left: Movie Info */}
        <div className='flex flex-row items-center'>
          <img
            src={
              posterSource ??
              'https://www.subtraction.com/wp-content/uploads/2018/01/2018-01-04-2017-movies-watched.jpg'
            }
            alt='Poster'
            className='w-[90px] h-[120px] object-cover rounded-lg shadow-sm cursor-pointer hover:shadow-[0_0_15px_0px] hover:shadow-tertiary-yellow transition duration-300 ease-in-out'
            loading='lazy'
          />
          {/* Movie Title and Info */}
          <div className='flex flex-col ml-4'>
            <Title level={5} className='font-semibold text-primary-yellow cursor-pointer hover:text-tertiary-yellow'>
              {index ?? '#'}. {title ?? 'Unknown Title'}
            </Title>
            <div className='flex flex-row flex-wrap items-center mt-1'>
              <Text body={4} className='text-gray-300 mt-1 mr-3'>
                {releaseYear ?? 'Unknown Year'}
              </Text>
              {genres && genres.length > 0 && (
                <>
                  {genres.map((genre, index) => (
                    <a
                      key={index}
                      className='m-0 p-0'
                      href='https://www.youtube.com/watch?v=E4WlUXrJgy4&themeRefresh=1'
                    >
                      <Text body={4} className='text-gray-300 mr-2 hover:text-white'>
                        {genre.name}
                        {index < genres.length - 1 ? ', ' : ''}
                      </Text>
                    </a>
                  ))}
                </>
              )}
            </div>
            <div className='flex flex-row items-center mt-2'>
              <Star className='w-4 h-4 text-secondary-yellow fill-secondary-yellow' />
              <Text body={4} className='text-gray-300 ml-1'>
                {voteAvg ?? 0}
              </Text>
              <Text body={4} className='text-gray-300 ml-2'>
                (
                {voteCount !== undefined && voteCount > 0
                  ? voteCount / 1000000 > 1
                    ? (voteCount / 1000000).toFixed(1) + 'M'
                    : (voteCount / 1000).toFixed(1) + 'K'
                  : '0'}
                )
              </Text>
            </div>
          </div>
        </div>
        {/* Right: Delete Icon */}
        <Minus className='text-gray-300 w-4 h-4 mr-1 cursor-pointer hover:w-5 hover:h-5' />
      </div>

      {/* Below: Description and Casts */}
      <div className='flex flex-col mt-3'>
        <Text body={4} className='text-gray-300'>
          {description?.length !== 0 ? description : 'No description'}
        </Text>
        {casts && casts.length > 0 && (
          <div className='flex flex-row items-center mt-2 flex-wrap'>
            <Title level={5} className='font-semibold text-primary-yellow mr-2'>
              Casts
            </Title>
            {casts.map((cast, index) => (
              <a
                key={index}
                className='m-0 p-0'
                href={cast.profilePath || '#'}
                target={cast.profilePath ? '_blank' : '_self'}
                rel={cast.profilePath ? 'noopener noreferrer' : undefined}
              >
                <Text body={4} className='text-blue-400 mr-3 hover:underline'>
                  {cast.name}
                </Text>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
