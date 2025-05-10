import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { GenreType } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Text } from '../ui/typography'

// Zod schema for form validation
const genreSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Name is required').max(100, 'Name must be 100 characters or less'),
})

type GenreFormValues = z.infer<typeof genreSchema>

interface GenreInfoModalProps {
  genre?: GenreType
  onSave?: () => void
  children?: React.ReactNode
  icon?: React.ReactNode
  title?: string
}

export function GenreInfoModal({ genre, onSave, children, icon, title }: GenreInfoModalProps) {
  const form = useForm<GenreFormValues>({
    resolver: zodResolver(genreSchema),
    defaultValues: {
      id: genre?.id || '',
      name: genre?.name || '',
    },
  })

  const onSubmit = (data: GenreFormValues) => {
    form.reset(data)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className={`flex flex-row items-center ${title ? 'gap-2' : 'gap-0'}`}>
          {icon}
          <Text body={4} className='text-primary-dark'>
            {children || ''}
          </Text>
        </div>
      </DialogTrigger>
      <DialogContent className='w-full max-w-md p-6'>
        <DialogHeader>
          <DialogTitle className='text-center font-bold text-xl'>{title || 'Edit Genre'}</DialogTitle>
          <DialogDescription className='text-center text-sm text-muted-foreground'>
            Update genre information below. Click save when done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input id='name' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className='pt-4'>
              <Button type='submit' onClick={onSave} className='w-full'>
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
