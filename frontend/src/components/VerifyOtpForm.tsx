import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from '@/components/ui/input-otp'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const otpSchema = z.object({
  otp: z.string().length(6, 'OTP must be 6 digits'),
})

export default function VerifyOtpForm() {
  const navigate = useNavigate()
  const form = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: '',
    },
  })

  // async function onSubmit(values: z.infer<typeof otpSchema>) {
  //   try {
  //     toast.success('OTP verified')
  //     navigate('/reset-password') // chuyển tới trang đặt lại mật khẩu
  //   } catch (error) {
  //     toast.error('Invalid OTP. Please try again.')
  //   }
  // }

  async function onSubmit() {
    try {
      toast.success('OTP verified')
      navigate('/reset-password') // chuyển tới trang đặt lại mật khẩu
    } catch {
      toast.error('Invalid OTP. Please try again.')
    }
  }

  return (
    <div className='flex min-h-[40vh] items-center justify-center px-4'>
      <Card className='mx-auto max-w-sm'>
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
              <Button type='submit' className='w-full'>
                Verify OTP
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
