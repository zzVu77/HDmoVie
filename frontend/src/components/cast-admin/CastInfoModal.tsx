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
import { CastType } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Text } from '../ui/typography'
import { toast } from 'sonner'
import * as React from 'react'
import { castService } from '@/services/castService'

// Zod schema for form validation
const castSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Name is required'),
  profilePath: z.string().optional(),
})

type CastFormValues = z.infer<typeof castSchema>

interface CastInfoModalProps {
  cast?: CastType
  onSave?: () => void
  children?: React.ReactNode
  icon?: React.ReactNode
  title?: string
}

export function CastInfoModal({ cast, onSave, children, icon, title }: CastInfoModalProps) {
  const [open, setOpen] = React.useState(false)

  const form = useForm<CastFormValues>({
    resolver: zodResolver(castSchema),
    defaultValues: {
      id: cast?.id || '',
      name: cast?.name || '',
      profilePath: cast?.profilePath || '',
    },
  })

  const onSubmit = async (data: CastFormValues) => {
    try {
      const payload = {
        name: data.name,
        profilePath: data.profilePath,
      }

      if (cast?.id) {
        await castService.updateCast(cast.id, payload)
        toast.success('Cast updated successfully')
      } else {
        await castService.createCast(payload)
        toast.success('Cast created successfully')
      }

      form.reset(data)
      setOpen(false)

      onSave?.()
    } catch {
      toast.error('Failed to save cast. Please try again.')
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
          <DialogTitle className='text-center font-bold text-xl'>{title || 'Edit Cast'}</DialogTitle>
          <DialogDescription className='text-center text-sm text-muted-foreground'>
            {cast ? 'Edit cast details below.' : 'Create a new cast.'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 px-1'>
            <div className='space-y-4 py-4'>
              {cast?.id && (
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
                      <Input id='name' className='col-span-3' placeholder='Enter cast name' {...field} />
                    </FormControl>
                    <FormMessage className='col-span-4 text-right' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='profilePath'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-4 items-center gap-4'>
                    <FormLabel className='text-right font-medium'>Profile Image URL</FormLabel>
                    <FormControl>
                      <Input id='profilePath' className='col-span-3' placeholder='Enter image URL' {...field} />
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
