import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from '@/components/ui/input-otp'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import ForgotPasswordService from '@/services/forgotPasswordService'

const otpSchema = z.object({
  otp: z.string().length(6, 'OTP must be 6 digits'),
})

export default function VerifyOtpForm() {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [email, setEmail] = useState<string>('')

  useEffect(() => {
    const storedEmail = localStorage.getItem('resetEmail')
    if (!storedEmail) {
      toast.error('Please start from forgot password page')
      navigate('/forgot-password')
      return
    }
    setEmail(storedEmail)
  }, [navigate])

  const form = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: '',
    },
  })

  async function onSubmit(values: z.infer<typeof otpSchema>) {
    if (!email) return

    setIsSubmitting(true)
    try {
      const response = await ForgotPasswordService.verifyOtp(email, values.otp)
      if (response.data.success) {
        toast.success(response.data.message)
        localStorage.setItem('resetOtp', values.otp)
        navigate('/reset-password')
      } else {
        toast.error(response.data.errorMessage || 'Invalid OTP')
      }
    } catch {
      toast.error('Failed to verify OTP. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className='flex min-h-[40vh] items-center justify-center px-4'>
      <Card className='mx-auto w-full'>
        <CardHeader>
          <CardTitle className='text-2xl'>Verify OTP</CardTitle>
          <CardDescription>Enter the 6-digit code sent to your email</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
              <FormField
                control={form.control}
                name='otp'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>OTP</FormLabel>
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type='submit' className='w-full' disabled={isSubmitting}>
                {isSubmitting ? 'Verifying...' : 'Verify OTP'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
