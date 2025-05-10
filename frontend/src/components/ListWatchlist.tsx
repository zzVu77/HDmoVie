import { WatchlistProps } from '@/types'
import WatchlistCard from './WatchlistCard'
type Props = {
  data: WatchlistProps[]
}

const ListWatchlist = ({ data }: Props) => {
  return (
    <div className='flex flex-col items-center justify-center gap-y-5'>
      {data.map((watchlist) => (
        <WatchlistCard
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
