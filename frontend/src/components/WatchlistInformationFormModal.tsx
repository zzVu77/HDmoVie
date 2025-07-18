import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Switch } from '@/components/ui/switch'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { WatchlistProps } from '@/types'
import { Pen } from 'lucide-react'
import { toast } from 'sonner'
import { createWatchlist, updateWatchlist } from '@/services/watchlistService'
import { useState } from 'react'

// Define form schema
const formSchema = z.object({
  title: z.string().trim().min(1, { message: 'Title is required.' }),
  isPublic: z.boolean(),
  description: z.string().trim().optional(),
})

export type WatchlistFormProps = {
  watchlist: WatchlistProps
  isAdd: boolean
  submitCallBack: (watchlist: WatchlistProps) => void
}

export default function WatchlistInformationFormModal({
  watchlist: { id, title, description, isPublic },
  isAdd = true,
  submitCallBack,
}: WatchlistFormProps) {
  const [open, setOpen] = useState(false)

  // Initialize form with default values
  // Use the zodResolver to validate the form schema
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: isAdd ? '' : title || '',
      description: isAdd ? '' : description || '',
      isPublic: isAdd ? true : isPublic || false,
    },
  })

  // HANDLE SUBMITTING
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (isAdd) {
        const newWatchlist = await createWatchlist(values.title, values.description, values.isPublic)
        setOpen(false)

        toast.success('Watchlist added')
        submitCallBack(newWatchlist)
      } else {
        const updatedWatchlist = await updateWatchlist(id, values.title, values.description, values.isPublic)
        setOpen(false)

        toast.success('Watchlist updated')
        submitCallBack(updatedWatchlist)
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'System error')
    }
  }

  // Main component render
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button
        onClick={() => setOpen(true)}
        className='bg-secondary-dark text-white cursor-pointer border border-tertiary-dark 
             hover:[box-shadow:0_0_8px_#ffa000] hover:[text-shadow:0_0_6px_#fff] 
             transition duration-200'
      >
        {isAdd ? 'Add new Watchlist' : <Pen className='w-4 h-4' />}
      </Button>
      <DialogContent className='sm:max-w-[425px] bg-secondary-dark border-tertiary-dark border-2 rounded-lg'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <DialogHeader>
              <DialogTitle className='text-white'>{isAdd ? 'Add new Watchlist' : 'Edit Watchlist'}</DialogTitle>
              <DialogDescription>
                {isAdd
                  ? 'Create a new watchlist to organize your favorite movies and shows.'
                  : 'Update the details of your watchlist.'}
              </DialogDescription>
            </DialogHeader>

            {/* Title (editable) */}
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-white'>Title</FormLabel>
                  <FormControl>
                    <Input className='text-white border-tertiary-dark' placeholder='My favorite' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description (editable) */}
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-white'>Description</FormLabel>
                  <FormControl>
                    <Input
                      className='text-white border-tertiary-dark'
                      placeholder='A collection of my favorite movies and shows'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Public/Private Switch */}
            <FormField
              control={form.control}
              name='isPublic'
              render={({ field }) => (
                <FormItem className='flex flex-row items-center justify-between rounded-lg border border-tertiary-dark p-3 shadow-sm'>
                  <div className='space-y-0.5'>
                    <FormLabel className='text-white'>Public</FormLabel>
                    <FormDescription className='mt-1'>Make this watchlist visible to others</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} className='border-tertiary-dark' />
                  </FormControl>
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button className='w-full bg-tertiary-yellow' type='submit'>
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
