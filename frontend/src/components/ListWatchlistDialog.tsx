import { dummyWatchlistMovies } from '@/pages/TestComponent'
import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { ScrollArea } from './ui/scroll-area'
import WatchlistItem from './WatchlistItem'

type Props = {
  children: React.ReactNode
}
const ListWatchlistDialog = ({ children }: Props) => {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent
          className='px-5 bg-primary-dark/90 py-5 mt-1 border-[2px] border-white/10 lg:w-[80vw] '
          iconCloseStyle='text-white '
        >
          //Todo: Dynamic title
          <DialogHeader>
            <DialogTitle className='text-center text-white font-bold  text-2xl'>Sci-Fi Favorites</DialogTitle>
          </DialogHeader>
          <ScrollArea className='h-[70vh] w-full'>
            <div className='flex flex-col gap-4 '>
              {dummyWatchlistMovies.map((movie, index) => (
                <WatchlistItem
                  key={index}
                  index={index + 1}
                  title={movie.title}
                  description={movie.description}
                  posterSource={movie.posterSource}
                  backdropSource={movie.backdropSource}
                  releaseYear={movie.releaseYear}
                  voteAvg={movie.voteAvg}
                  voteCount={movie.voteCount}
                  genres={movie.genres}
                />
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ListWatchlistDialog
