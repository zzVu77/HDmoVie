import { WatchlistProps } from '@/types'
import { Text } from '@/components/ui/typography'
import { Title } from '@/components/ui/typography'
import { ScrollArea } from '@/components/ui/scroll-area'

export default function WatchlistCard({ title, description, isPublic, movies }: WatchlistProps) {
  const backdropUrl =
    (movies ?? [])[0]?.backdropSource?.trim() !== ''
      ? (movies ?? [])[0].backdropSource
      : 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Hubble_ultra_deep_field.jpg/1200px-Hubble_ultra_deep_field.jpg'

  return (
    <div
      className={`group relative w-full max-h-[144px] overflow-hidden rounded-lg border-none shadow-none p-3 bg-secondary-dark cursor-pointer transition duration-300 hover:shadow-[0_0_7px_0px] hover:shadow-primary-yellow`}
    >
      <div
        className='absolute inset-0 bg-cover bg-center blur-[1px] opacity-100'
        style={{ backgroundImage: `url(${backdropUrl})` }}
      ></div>
      <div className='relative z-10 flex flex-row items-start '>
        <div className='min-w-[90px] min-h-[120px] flex items-center justify-center'>
          {movies && movies.length > 0 && (
            <img
              src={
                movies?.[0]?.posterSource?.trim() !== ''
                  ? movies[0].posterSource
                  : 'https://www.subtraction.com/wp-content/uploads/2018/01/2018-01-04-2017-movies-watched.jpg'
              }
              alt={movies[0].title}
              className='w-[90px] h-[120px] object-cover rounded-lg shadow-sm cursor-pointer transition duration-300 ease-in-out'
              loading='lazy'
            />
          )}
        </div>
        <div
          className='w-full flex flex-col items-start justify-start bg-transparent border-none gap-0 px-0 py-0 ml-2'
          style={{ textShadow: '0 0 3px #000, 0 0 6px #000, 0 0 9px #000' }}
        >
          <div className='w-full px-2'>
            <Title level={5} className='font-semibold text-tertiary-yellow cursor-pointer'>
              {title ?? 'Watchlist'}
            </Title>
          </div>
          <div className='w-full flex flex-col items-start justify-start gap-1 px-2'>
            <div>
              <Text body={4} className='text-gray-300 mr-3'>
                Titles: {movies ? movies.length : 0} 📽️
              </Text>
              <Text body={4} className='text-gray-300'>
                {isPublic ? '🌐' : '🔒'}
              </Text>
            </div>
            <ScrollArea className='flex flex-col max-h-[65px] overflow-hidden'>
              <Text body={4} className='text-white'>
                {description?.length !== 0 ? description : 'No description'}
              </Text>
            </ScrollArea>
          </div>
        </div>
        <div className='relative'>
          <div className='absolute top-0 right-0 backdrop-blur-3xl px-2 py-1 rounded'>
            <Text
              body={3}
              className='text-white hover:text-lg'
              style={{ textShadow: '0 0 3px #000, 0 0 6px #000, 0 0 9px #000' }}
            >
              🖉
            </Text>
          </div>
        </div>
      </div>
    </div>
  )
}
