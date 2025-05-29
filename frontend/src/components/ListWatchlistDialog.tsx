import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { ScrollArea } from './ui/scroll-area'
import { Text } from '@/components/ui/typography'
import WatchlistItem from './WatchlistItem'
import { WatchlistMovieProps, WatchlistProps } from '@/types'

type Props = {
  watchlist: WatchlistProps
  children: React.ReactNode
  isOwner?: boolean
}
const ListWatchlistDialog = ({ watchlist, children, isOwner = false }: Props) => {
  const [watchlistMovies, setWatchlistMovies] = useState<WatchlistMovieProps[]>(watchlist.movies ?? [])

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent
          className='px-5 bg-primary-dark/90 py-5 mt-1 border-[2px] border-white/10 lg:w-[80vw] z-[1000]'
          iconCloseStyle='text-white '
        >
          <DialogHeader>
            <DialogTitle className='text-center text-white font-bold  text-2xl'>{watchlist.title}</DialogTitle>
          </DialogHeader>
          <ScrollArea className='h-[70vh] w-full'>
            {watchlist.movies && watchlist.movies.length === 0 ? (
              <div className='flex items-center justify-center h-[70vh] w-full'>
                <Text className='text-gray-500 text-center'>This watchlist is currently empty.</Text>
              </div>
            ) : (
              <div className='flex flex-col h-full items-center gap-4'>
                {watchlistMovies?.map((movie, index) => (
                  <WatchlistItem
                    key={movie.id}
                    watchlistId={watchlist.id ?? ''}
                    watchlistMovie={{
                      index: index + 1,
                      id: movie.id,
                      title: movie.title,
                      description: movie.description,
                      posterSource: movie.posterSource,
                      releaseYear: movie.releaseYear,
                      voteAvg: movie.voteAvg,
                      voteCount: movie.voteCount,
                      genres: movie.genres,
                    }}
                    onDelete={(id) => {
                      setWatchlistMovies((prev) => prev.filter((m) => m.id !== id))
                    }}
                    isOwner={isOwner}
                  />
                ))}
              </div>
            )}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ListWatchlistDialog
