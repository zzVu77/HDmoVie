import { Text, Title } from '@/components/ui/typography'
import { WatchlistProps } from '@/types'
import { Film, Globe, Lock, Trash } from 'lucide-react'
import WatchlistInformationFormModal from './WatchlistInformationFormModal'
import ListWatchlistDialog from './ListWatchlistDialog'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter } from '@/components/ui/dialog'
import { Button } from './ui/button'
import { toast } from 'sonner'
import { deleteWatchlist } from '@/services/watchlistService'

interface WatchlistCardProps {
  onDelete: (id: string) => void
  initialWatchlist: WatchlistProps
  isQuickAdd?: boolean
  isOwner?: boolean
}

export default function WatchlistCard({ onDelete, initialWatchlist, isQuickAdd, isOwner = false }: WatchlistCardProps) {
  const [watchlist, setWatchlist] = useState(initialWatchlist)

  // Handle edit watchlist modal result
  function onEditInformationSubmit(updated: WatchlistProps) {
    setWatchlist((prev) => ({
      ...prev,
      title: updated.title,
      description: updated.description,
      isPublic: updated.isPublic,
    }))
  }

  // Delete watchlist call
  async function handleDeleteWatchlist(wid: string) {
    try {
      await deleteWatchlist(wid)
      toast.success('Watchlist deleted')
      onDelete(id!)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'System error')
    }
  }

  const { id, title, description, isPublic, movies } = watchlist

  const backdropUrl =
    typeof movies?.[0]?.backdropSource === 'string' && movies[0].backdropSource.trim() !== ''
      ? movies[0].backdropSource
      : 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Hubble_ultra_deep_field.jpg/1200px-Hubble_ultra_deep_field.jpg'

  return (
    <div
      className={cn(
        'group relative w-full max-h-[144px] overflow-hidden rounded-lg border-none shadow-none p-3 bg-secondary-dark',
        isQuickAdd && 'w-fit sm:w-full',
      )}
    >
      <div
        className='absolute inset-0 bg-cover bg-center blur-[10px] w-auto opacity-100'
        style={{ backgroundImage: `url(${backdropUrl})` }}
      ></div>
      <div className='relative z-10 flex flex-row items-start  '>
        <ListWatchlistDialog watchlist={{ id, title, description, isPublic, movies }} isOwner={isOwner}>
          <div className='min-w-[90px] min-h-[120px] flex items-center justify-center'>
            <img
              src={
                typeof movies?.[0]?.posterSource === 'string' && movies[0].posterSource.trim() !== ''
                  ? movies[0].posterSource
                  : 'https://www.subtraction.com/wp-content/uploads/2018/01/2018-01-04-2017-movies-watched.jpg'
              }
              alt={movies?.[0]?.title || 'Movie poster'}
              className='w-[90px] h-[120px] object-cover rounded-lg shadow-sm cursor-pointer ease-in-out transition duration-300 hover:shadow-[0_0_15px_0px] hover:shadow-tertiary-yellow'
              loading='lazy'
            />
          </div>
        </ListWatchlistDialog>
        <div
          className={cn(
            'flex w-full flex-col items-start justify-start bg-transparent border-none gap-0 px-0 py-0 ml-2 ',
            isQuickAdd && 'hidden sm:flex',
          )}
          style={{ textShadow: '0 0 3px #000, 0 0 6px #000, 0 0 9px #000' }}
        >
          <div className='w-full px-2'>
            <Title level={5} className='font-semibold text-tertiary-yellow'>
              {title ?? 'Watchlist'}
            </Title>
          </div>
          <div className='w-full flex flex-col items-start justify-start gap-1 px-2 mt-1'>
            <div className='flex items-center gap-4'>
              <Text body={4} className='text-gray-300 flex items-center gap-1'>
                Titles: {movies ? movies.length : 0}
                <Film className='w-4 h-4 ml-2 text-gray-300' />
              </Text>
              <Text body={4} className='text-gray-300 flex items-center gap-1'>
                {isPublic ? <Globe className='w-4 h-4 text-gray-300' /> : <Lock className='w-4 h-4 text-gray-300' />}
              </Text>
            </div>
            <Text body={4} className='text-white lg:line-clamp-3 line-clamp-2 mt-1'>
              {description?.trim() ? description : 'No description'}
            </Text>
          </div>
        </div>
        <div className={cn('flex flex-row items-center justify-between gap-2', (!isOwner || isQuickAdd) && 'hidden')}>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                className='bg-secondary-dark text-white cursor-pointer border border-tertiary-dark 
             hover:[box-shadow:0_0_8px_#ffa000] hover:[text-shadow:0_0_6px_#fff] 
             transition duration-200'
              >
                <Trash />
              </Button>
            </DialogTrigger>
            <DialogContent className='max-w-[350px] bg-secondary-dark border-tertiary-dark text-white'>
              <DialogHeader className='font-bold text-primary-yellow'>Delete watchlist</DialogHeader>

              <div className='max-w-[500px] text-sm'>
                Are you sure to delete this watchllist? <br />
                This is an un-recoverable action!
              </div>

              <DialogFooter>
                <Button
                  className='bg-tertiary-dark'
                  onClick={async () => {
                    await handleDeleteWatchlist(id!)
                  }}
                >
                  Confirm
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <WatchlistInformationFormModal
            isAdd={false}
            watchlist={{ id, title, description, isPublic }}
            submitCallBack={onEditInformationSubmit}
          ></WatchlistInformationFormModal>
        </div>
      </div>
    </div>
  )
}
