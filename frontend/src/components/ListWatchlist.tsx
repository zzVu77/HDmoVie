import { WatchlistProps } from '@/types'
import WatchlistCard from './WatchlistCard'
import WatchlistInformationFormModal from './WatchlistInformationFormModal'
import { useState } from 'react'
type Props = {
  data: WatchlistProps[]
}

const ListWatchlist = ({ data }: Props) => {
  const [watchlists, setWatchlists] = useState<WatchlistProps[]>(data)

  function onAddWatchlistSubmit(watchlist: WatchlistProps) {
    setWatchlists((prev) => [watchlist, ...prev])
  }

  return (
    <div className='flex flex-col items-center justify-center gap-y-5'>
      <div className='w-full flex justify-end'>
        <WatchlistInformationFormModal
          watchlist={{ id: '', description: '', isPublic: true }}
          isAdd={true}
          submitCallBack={onAddWatchlistSubmit}
        />
      </div>
      {watchlists.length === 0 && <div className='text-gray-500 mt-5'>No watchlists have been added yet.</div>}
      {watchlists.map((watchlist) => (
        <WatchlistCard
          key={watchlist.id}
          onDelete={(id) => setWatchlists((prev) => prev.filter((w) => w.id !== id))}
          initialWatchlist={watchlist}
        />
      ))}
    </div>
  )
}

export default ListWatchlist
