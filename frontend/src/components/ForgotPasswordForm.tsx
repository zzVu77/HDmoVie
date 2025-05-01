import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const formSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
})

export default function ForgotPasswordForm() {
  const navigate = useNavigate()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  })

  // async function onSubmit(values: z.infer<typeof formSchema>) {
  //   try {
  //     toast.success('OTP sent to your email')
  //     navigate('/verify-otp') // dùng React Router để chuyển trang
  //   } catch (error) {
  //     toast.error('Failed to send OTP. Try again.')
  //   }
  // }
  async function onSubmit() {
    try {
      toast.success('OTP sent to your email')
      navigate('/verify-otp')
    } catch {
      toast.error('Failed to send OTP. Try again.')
    }
  }

  return (
    <div className='flex min-h-[40vh] items-center justify-center px-4'>
      <Card className='mx-auto max-w-sm'>
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
                      <Input placeholder='johndoe@mail.com' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type='submit' className='w-full'>
                Send OTP
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
