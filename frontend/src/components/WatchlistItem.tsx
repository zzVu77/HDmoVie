import { WatchlistMovieProps } from '@/types'
import { Star, X } from 'lucide-react'
import { Text, Title } from '@/components/ui/typography'
import { Badge } from '@/components/ui/badge'
import { useNavigate } from 'react-router'
import { deletMovieFromeWatchlist } from '@/services/watchlistService'
import { toast } from 'sonner'

export interface WatchlistItemProps {
  onDelete: (id: string) => void
  watchlistId: string
  watchlistMovie: WatchlistMovieProps
  isOwner?: boolean
}

export default function WatchlistItem({ onDelete, watchlistId, watchlistMovie, isOwner = false }: WatchlistItemProps) {
  // Dumb data
  const { index, id, title, description, posterSource, releaseYear, voteAvg, voteCount, genres } = watchlistMovie

  // Used to navigate to another page
  const navigation = useNavigate()
  const navigateToMovie = () => {
    navigation(`/movie/${id}`)
  }

  // Handle delete movie
  async function handleDeleteMovieFromWatchlist(movieId: string) {
    try {
      await deletMovieFromeWatchlist(watchlistId, movieId)
      toast.success('Movie is deleted from watchlist')
      onDelete(id!)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'System error')
    }
  }

  return (
    //Todo: Add onClick to open movie details
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
            onClick={navigateToMovie}
          />
          {/* Movie Title and Info */}
          <div className='flex flex-col ml-4'>
            <Title
              level={4}
              className='font-bold text-primary-yellow cursor-pointer hover:text-tertiary-yellow line-clamp-1'
              onClick={navigateToMovie}
            >
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
                        <Badge className='bg-gray-600 hover:bg-gray-500'>{genre.name}</Badge>
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
        <X
          className={`text-gray-300 w-4 h-4 mr-1 cursor-pointer hover:text-red-400 ${!isOwner ? 'hidden' : ''}`}
          onClick={() => handleDeleteMovieFromWatchlist(id!)}
        />
      </div>

      {/* Below: Description */}
      <Text body={4} className='text-gray-300 mt-3 line-clamp-3 '>
        {description?.length !== 0 ? description : 'No description'}
      </Text>
    </div>
  )
}
