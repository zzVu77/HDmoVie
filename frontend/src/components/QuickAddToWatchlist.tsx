import { useEffect, useState } from 'react'
import { WatchlistProps } from '@/types'
import { Button } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import { Label } from './ui/label'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Text } from './ui/typography'
import { ScrollArea } from './ui/scroll-area'
import WatchlistCard from './WatchlistCard'
import { getWatchlists } from '@/services/profileService'

type Props = {
  onAddToWatchlist?: (watchlistId: string) => void // Callback for adding movie to watchlist
  onCreateWatchlist?: () => void // Callback for creating a new watchlist
  children?: React.ReactNode
}

const QuickAddToWatchlist = ({ onAddToWatchlist, onCreateWatchlist, children }: Props) => {
  const [selectedWatchlist, setSelectedWatchlist] = useState<string>('')
  const [watchlists, setWatchlists] = useState<WatchlistProps[]>([])

  const userId = '1'
  useEffect(() => {
    const fetchWatchlists = async () => {
      const data = await getWatchlists(userId)
      setWatchlists(data)
    }
    fetchWatchlists()
  }, [userId])

  const handleSubmit = () => {
    if (selectedWatchlist && onAddToWatchlist) {
      onAddToWatchlist(selectedWatchlist)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children || <Button variant='outline'>Add to Watchlist</Button>}</DialogTrigger>
      <DialogContent className='sm:max-w-[600px] bg-primary-dark flex flex-col items-center justify-center border-white/30 border-1'>
        <DialogHeader>
          <DialogTitle className='text-center text-white'>Choose a Watchlist</DialogTitle>
          <DialogDescription className='text-center text-white'>
            {watchlists.length > 0
              ? 'Select an existing watchlist to add your movie.'
              : 'You don’t have any watchlists yet. Create a new one to get started.'}
          </DialogDescription>
        </DialogHeader>

        {watchlists.length > 0 ? (
          <ScrollArea className='h-[auto] max-h-[200px] md:max-h-[300px] w-full'>
            <RadioGroup value={selectedWatchlist} onValueChange={setSelectedWatchlist} className='space-y-4'>
              {watchlists.map((watchlist) => (
                <div key={watchlist.id} className='flex items-center gap-4 mb-4 mx-auto'>
                  <RadioGroupItem value={watchlist.id || '1'} id={`watchlist-${watchlist.id}`} />
                  <Label htmlFor={`watchlist-${watchlist.id}`} className='flex'>
                    <WatchlistCard
                      title={watchlist.title}
                      description={watchlist.description}
                      isPublic={watchlist.isPublic}
                      movies={watchlist.movies}
                      isQuickAdd={true}
                    />
                  </Label>
                  <Text body={3} className='text-white sm:hidden'>
                    {watchlist.title}
                  </Text>
                </div>
              ))}
            </RadioGroup>
          </ScrollArea>
        ) : (
          <Button variant='secondary' className='mt-4 bg-primary-yellow' onClick={onCreateWatchlist}>
            Create New Watchlist
          </Button>
        )}

        <DialogFooter className='flex justify-center'>
          {watchlists.length > 0 && (
            <Button type='submit' className='w-fit mx-auto' onClick={handleSubmit} disabled={!selectedWatchlist}>
              Add to Watchlist
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default QuickAddToWatchlist
