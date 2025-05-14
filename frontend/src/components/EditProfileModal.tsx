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
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { updateProfile } from '@/services/profileService'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'

// Define form schema
const formSchema = z.object({
  fullName: z.string().trim().min(3, { message: 'Full name must be at least 3 characters.' }),
  dateOfBirth: z.coerce.date().refine((date) => !isNaN(date.getTime()), { message: 'Invalid date.' }),
})

export interface EditProfileModalProps {
  id?: string
  fullName?: string
  email?: string
  dateOfBirth?: Date
  updateProfileCallBack: () => void
}

export function EditProfileModal({
  id = '',
  fullName = '',
  email = '',
  dateOfBirth = new Date(),
  updateProfileCallBack,
}: EditProfileModalProps) {
  // Initialize form with default values
  // Use the zodResolver to validate the form schema
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: fullName,
      dateOfBirth: dateOfBirth,
    },
  })

  // Handle update profile
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true)
      await updateProfile(id, values.fullName, values.dateOfBirth)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Error when fetching follow interaction')
    } finally {
      setIsLoading(false)
      handleCallBack(error === null)
    }
  }

  async function handleCallBack(success: boolean) {
    if (success) {
      toast.success('Updated successfully')
    } else {
      toast.error(error)
    }
    await new Promise((resolve) => setTimeout(resolve, 1000))
    updateProfileCallBack()
  }

  // Main component render
  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) form.reset({ fullName, dateOfBirth })
      }}
    >
      <DialogTrigger asChild>
        <Button
          className='bg-secondary-dark text-white cursor-pointer border border-tertiary-dark 
             hover:[box-shadow:0_0_8px_#ffa000] hover:[text-shadow:0_0_6px_#fff] 
             transition duration-200 data-[scroll-locked="1"]:mr-0'
        >
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px] bg-secondary-dark border-tertiary-dark border-2 rounded-lg'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <DialogHeader>
              <DialogTitle className='text-white'>Edit profile</DialogTitle>
              <DialogDescription>Make changes to your profile here. Click save when you're done.</DialogDescription>
            </DialogHeader>

            {/* Email (read-only) */}
            <FormItem>
              <FormLabel className='text-white'>Email</FormLabel>
              <FormControl>
                <Input className='text-white border-tertiary-dark' value={email} disabled readOnly />
              </FormControl>
              <FormDescription>This is your registered email and cannot be changed.</FormDescription>
            </FormItem>

            {/* Full Name (editable) */}
            <FormField
              control={form.control}
              name='fullName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-white'>Full Name</FormLabel>
                  <FormControl>
                    <Input className='text-white border-tertiary-dark' placeholder='John Do' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Date of Birth (editable) */}
            <FormField
              control={form.control}
              name='dateOfBirth'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-white'>Release Date (MM/dd/yyyy)</FormLabel>
                  <FormControl>
                    <Input
                      type='date'
                      className='hide-icon-calendar text-white border-tertiary-dark'
                      {...field}
                      value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                className={`w-full bg-tertiary-yellow flex flex-row items-center ${isLoading ? 'cursor-pointer' : ''}`}
                type='submit'
                disabled={isLoading}
              >
                {isLoading && <Loader2 className='animate-spin text-white' />}
                Save changes{' '}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
