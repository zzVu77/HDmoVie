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
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { RegisteredUserProps } from '@/types' // adjust import path as needed
import { Calendar } from '@/components/ui/calendar'
import { useEffect, useRef, useState } from 'react'

// Define form schema
const formSchema = z.object({
  fullName: z.string().trim().min(3, { message: 'Full name must be at least 3 characters.' }),
  dateOfBirth: z.coerce.date().refine((date) => !isNaN(date.getTime()), { message: 'Invalid date.' }),
})

export function EditProfileModal({ id, fullName, email, dateOfBirth }: RegisteredUserProps) {
  // Use state to manage calendar visibility
  const [showCalendar, setShowCalendar] = useState(false)
  const calendarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setShowCalendar(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Initialize form with default values
  // Use the zodResolver to validate the form schema
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName,
      dateOfBirth,
    },
  })

  // USED TO IGNORE THE ERROR MESSAGE
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Handle form submission logic here
    fetch(`http://localhost:3001/api/profiles/${id}/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    }).then((response) => {
      if (!response.ok) {
        throw new Error('Failed to update profile')
      }
      return response.json()
    })
  }

  // Main component render
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className='bg-secondary-dark text-white cursor-pointer border border-tertiary-dark 
             hover:[box-shadow:0_0_8px_#ffa000] hover:[text-shadow:0_0_6px_#fff] 
             transition duration-200'
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
                <FormItem className='flex flex-col'>
                  <FormLabel className='text-white'>Date of Birth</FormLabel>
                  <FormControl>
                    <div className='relative' ref={calendarRef}>
                      <Input
                        className='text-white border-tertiary-dark'
                        value={field.value ? field.value.toLocaleDateString() : ''}
                        readOnly
                        onClick={() => setShowCalendar((prev) => !prev)}
                      />
                      {showCalendar && (
                        <div className='absolute bottom-full mb-2 z-10 rounded-md border bg-secondary-dark text-white'>
                          <Calendar
                            mode='single'
                            selected={field.value}
                            onSelect={(date) => {
                              field.onChange(date)
                              setShowCalendar(false)
                            }}
                            className='rounded-md border-secondary-dark bg-secondary-dark text-white'
                          />
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
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
