import { getWatchlists } from '@/services/profileService'
import { WatchlistProps } from '@/types'
import { jwtDecode } from 'jwt-decode'
import { useState } from 'react'
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
import { Input } from './ui/input'
import { Label } from './ui/label'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { ScrollArea } from './ui/scroll-area'
import { Text } from './ui/typography'
import WatchlistCard from './WatchlistCard'
import { toast } from 'sonner'
import { addMovieToWatchlist, createNewWatchlist } from '@/services/movieService'

type Props = {
  movieId?: string
  children?: React.ReactNode
}

const QuickAddToWatchlist = ({ movieId, children }: Props) => {
  const [selectedWatchlist, setSelectedWatchlist] = useState<string>('')
  const [watchlists, setWatchlists] = useState<WatchlistProps[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newTitle, setNewTitle] = useState('')

  const token = localStorage.getItem('access-token')
  let userId: string | null = null
  if (token) {
    const decoded = jwtDecode(token) as { id: string }
    userId = decoded.id
  }

  const handleSubmit = async () => {
    if (!selectedWatchlist || !movieId) {
      toast.error('Please select a watchlist first')
      return
    }

    try {
      await addMovieToWatchlist(selectedWatchlist, movieId)
      toast.success('Movie added to your watchlist!')
      setIsDialogOpen(false)
    } catch (error) {
      toast.error('Failed to add movie to watchlist. Please try again.')
      throw new Error(error instanceof Error ? error.message : 'Failed to add movie to watchlist')
    }
  }

  const handleDialogOpen = async (open: boolean) => {
    if (open && !token) {
      window.location.href = '/login'
      return
    }

    if (open && userId) {
      try {
        const data = await getWatchlists(userId)
        setWatchlists(data)
      } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'Failed to fetch watchlists')
      }
    }

    setIsDialogOpen(open)
    if (!open) {
      // Reset form states when dialog closes
      setShowCreateForm(false)
      setNewTitle('')
      setSelectedWatchlist('')
    }
  }
  const handleCreateWatchlist = async () => {
    if (!newTitle.trim()) {
      toast.error('Please enter a watchlist title')
      return
    }

    try {
      await createNewWatchlist(newTitle)
      toast.success('Watchlist created successfully!')

      // Fetch updated watchlists
      if (userId) {
        const data = await getWatchlists(userId)
        setWatchlists(data)
      }

      // Reset form and show watchlist selection
      setShowCreateForm(false)
      setNewTitle('')
    } catch (error) {
      toast.error('Failed to create watchlist. Please try again.')
      throw new Error(error instanceof Error ? error.message : 'Failed to create watchlist')
    }
  }
  return (
    <Dialog open={isDialogOpen} onOpenChange={handleDialogOpen}>
      <DialogTrigger asChild>{children || <Button variant='outline'>Add to Watchlist</Button>}</DialogTrigger>

      <DialogContent className='sm:max-w-[600px] bg-primary-dark flex flex-col items-center justify-center border-white/30 border-1'>
        <DialogHeader>
          <DialogTitle className='text-center text-white'>
            {!showCreateForm ? 'Choose a Watchlist' : 'Create a new Watchlist'}
          </DialogTitle>
          <DialogDescription className='text-center text-white'>
            {watchlists.length > 0
              ? 'Select an existing watchlist to add your movie.'
              : 'You don’t have any watchlists yet. Create a new one to get started.'}
          </DialogDescription>
        </DialogHeader>

        {/* Ẩn danh sách watchlists khi showCreateForm và watchlists tồn tại */}
        {watchlists.length > 0 && !showCreateForm && (
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
        )}

        {/* Form tạo watchlist mới */}
        {showCreateForm ? (
          <div className='w-full mt-4 space-y-3'>
            <div className='space-y-2'>
              <Label htmlFor='new-watchlist-title' className='text-white'>
                Watchlist Title
              </Label>
              <Input
                id='new-watchlist-title'
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder='Enter watchlist title'
                className='bg-white text-black'
              />
            </div>
            <div className='flex gap-2'>
              <Button onClick={handleCreateWatchlist} className='bg-primary-yellow text-black'>
                Save
              </Button>
              <Button
                variant='outline'
                onClick={() => {
                  setShowCreateForm(false)
                  setNewTitle('')
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : null}

        {/* Buttons layout */}
        <div className='mt-4 flex flex-col md:flex-row gap-3 w-full justify-center'>
          {!showCreateForm && (
            <Button
              variant='secondary'
              className='bg-primary-yellow text-black'
              onClick={() => setShowCreateForm(true)}
            >
              Create New Watchlist
            </Button>
          )}

          {watchlists.length > 0 && !showCreateForm && (
            <Button type='submit' className='w-full md:w-auto' onClick={handleSubmit} disabled={!selectedWatchlist}>
              Add to Watchlist
            </Button>
          )}
        </div>

        <DialogFooter />
      </DialogContent>
    </Dialog>
  )
}

export default QuickAddToWatchlist
