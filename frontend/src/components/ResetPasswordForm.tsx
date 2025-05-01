import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PasswordInput } from '@/components/ui/password-input'

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
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  })
  // async function onSubmit(values: z.infer<typeof formSchema>) {
  //   try {
  //     toast.success('Password reset successfully')
  //   } catch (error) {
  //     toast.error('Failed to reset password')
  //   }
  // }

  async function onSubmit() {
    try {
      toast.success('Password reset successfully')
    } catch {
      toast.error('Failed to reset password')
    }
  }

  return (
    <div className='flex min-h-[40vh] items-center justify-center px-4'>
      <Card className='mx-auto max-w-sm'>
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
              <Button type='submit' className='w-full'>
                Reset Password
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
