import { WatchlistProps } from '@/types'
import WatchlistCard from './WatchlistCard'
type Props = {
  data: WatchlistProps[]
}

const ListWatchlist = ({ data }: Props) => {
  return (
    <div className='flex flex-col items-center justify-center gap-y-5'>
      {data.length === 0 && <div className='text-gray-500 mt-5'>No watchlists have been added yet.</div>}
      {data.map((watchlist, index) => (
        <WatchlistCard
          key={index}
          title={watchlist.title}
          description={watchlist.description}
          isPublic={watchlist.isPublic}
          movies={watchlist.movies}
        />
      ))}
    </div>
  )
}

export default ListWatchlist
