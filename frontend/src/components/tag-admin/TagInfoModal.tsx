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
import { TagType } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Text } from '../ui/typography'
import { toast } from 'sonner'
import * as React from 'react'
import { tagService } from '@/services/tagService'

// Zod schema for form validation
const tagSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Name is required').max(100, 'Name must be 100 characters or less'),
})

type TagFormValues = z.infer<typeof tagSchema>

interface TagInfoModalProps {
  tag?: TagType
  onSave?: () => void
  children?: React.ReactNode
  icon?: React.ReactNode
  title?: string
}

export function TagInfoModal({ tag, onSave, children, icon, title }: TagInfoModalProps) {
  const [open, setOpen] = React.useState(false)

  const form = useForm<TagFormValues>({
    resolver: zodResolver(tagSchema),
    defaultValues: {
      id: tag?.id || '',
      name: tag?.name || '',
    },
  })

  const onSubmit = async (data: TagFormValues) => {
    try {
      const payload = { name: data.name }
      if (!tag?.id) {
        await tagService.createTag(payload)
        toast.success('Tag created successfully')
      }
      form.reset(data)
      setOpen(false)

      onSave?.()
    } catch {
      toast.error('Failed to save tag. Please try again.')
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className={`flex flex-row items-center ${title ? 'gap-2' : ''}`}>
          {icon}
          {children && (
            <Text body={4} className='text-primary-dark'>
              {children}
            </Text>
          )}
        </div>
      </DialogTrigger>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle className='text-center font-bold text-xl'>{title || 'Edit Tag'}</DialogTitle>
          <DialogDescription className='text-center text-sm text-muted-foreground'>
            {tag ? 'Edit tag details below.' : 'Create a new tag.'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 px-1'>
            <div className='space-y-4 py-4'>
              {tag?.id && (
                <FormField
                  control={form.control}
                  name='id'
                  render={({ field }) => (
                    <FormItem className='grid grid-cols-4 items-center gap-4'>
                      <FormLabel className='text-right font-medium'>ID</FormLabel>
                      <FormControl>
                        <Input id='id' className='col-span-3' readOnly disabled {...field} value={field.value || ''} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              )}
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-4 items-center gap-4'>
                    <FormLabel className='text-right font-medium'>Name</FormLabel>
                    <FormControl>
                      <Input id='name' className='col-span-3' placeholder='Enter tag name' {...field} />
                    </FormControl>
                    <FormMessage className='col-span-4 text-right' />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className='flex justify-end gap-2'>
              <Button type='button' variant='outline' onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type='submit'>Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
