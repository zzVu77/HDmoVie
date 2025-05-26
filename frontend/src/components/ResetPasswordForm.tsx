import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PasswordInput } from '@/components/ui/password-input'
import ForgotPasswordService from '@/services/forgotPasswordService'

const formSchema = z
  .object({
    password: z
      .string()
      .min(6, 'At least 6 characters')
      .regex(/[a-zA-Z0-9]/, 'Must be alphanumeric'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  })

export default function ResetPasswordForm() {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [email, setEmail] = useState<string>('')
  const [otp, setOtp] = useState<string>('')

  useEffect(() => {
    const storedEmail = localStorage.getItem('resetEmail')
    const storedOtp = localStorage.getItem('resetOtp')
    if (!storedEmail || !storedOtp) {
      toast.error('Please complete the verification process')
      navigate('/forgot-password')
      return
    }
    setEmail(storedEmail)
    setOtp(storedOtp)
  }, [navigate])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!email || !otp) return

    setIsSubmitting(true)
    try {
      const response = await ForgotPasswordService.resetPassword(email, otp, values.password)
      if (response.data.success) {
        toast.success(response.data.message)
        // Clear stored data
        localStorage.removeItem('resetEmail')
        localStorage.removeItem('resetOtp')
        // Redirect to login
        navigate('/login')
      } else {
        toast.error(response.data.errorMessage || 'Failed to reset password')
      }
    } catch {
      toast.error('Failed to reset password. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className='flex min-h-[40vh] items-center justify-center px-4'>
      <Card className='mx-auto w-full'>
        <CardHeader>
          <CardTitle className='text-2xl'>Reset Password</CardTitle>
          <CardDescription>Enter your new password below</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <PasswordInput placeholder='******' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='confirmPassword'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <PasswordInput placeholder='******' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type='submit' className='w-full' disabled={isSubmitting}>
                {isSubmitting ? 'Resetting...' : 'Reset Password'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
