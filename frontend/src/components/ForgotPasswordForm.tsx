import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import ForgotPasswordService from '@/services/forgotPasswordService'

const formSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
})

export default function ForgotPasswordForm() {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    try {
      const response = await ForgotPasswordService.sendOtp(values.email)
      if (response.data.success) {
        toast.success(response.data.message)
        // Store email in localStorage for next steps
        localStorage.setItem('resetEmail', values.email)
        navigate('/verify-otp')
      } else {
        toast.error(response.data.errorMessage || 'Failed to send OTP')
      }
    } catch {
      toast.error('Failed to send OTP. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className='flex min-h-[40vh] items-center justify-center px-4 w-full'>
      <Card className='w-full'>
        <CardHeader>
          <CardTitle className='text-2xl'>Forgot Password</CardTitle>
          <CardDescription>Enter your email to receive an OTP</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder='johndoe@mail.com' {...field} className='w-full' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type='submit' className='w-full' disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send OTP'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
