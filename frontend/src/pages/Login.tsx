import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Text, Title } from '@/components/ui/typography'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { apiPost } from '@/utils/axiosConfig'
import { toast } from 'sonner'

interface ApiErrorResponse {
  message?: string
}
const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
})

type LoginFormValues = z.infer<typeof loginSchema>

const Login: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: LoginFormValues) => {
    setIsSubmitting(true)
    try {
      const response = await apiPost<{ accessToken: string }>(
        '/registeredusers/login',
        data,
        { withCredentials: true }, // cần thiết nếu dùng refresh token qua cookie
      )
      const token = response.data.accessToken
      localStorage.setItem('access-token', token)
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

      // console.log(response.data)
      toast.success('Login successful!')
      form.reset()
      navigate('/')
    } catch (error: unknown) {
      let errorMessage = 'Login Fail:'

      if (axios.isAxiosError<ApiErrorResponse>(error)) {
        if (error.response?.data?.message) {
          errorMessage = error.response.data.message // e.g., "Password is required"
        } else if (error.response?.status === 500) {
          errorMessage = 'Error Server'
        }
      }

      toast.error(errorMessage, {
        description: 'Please check your information or try again',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className='flex min-h-screen flex-row items-center justify-center'>
      <div className='hidden lg:flex lg:justify-center w-full lg:w-1/2 h-screen relative '>
        <img src='/poster.jpg' alt='backdrop' className='w-full  object-cover rounded-3xl object-center' />
        <div className='absolute inset-0 bg-primary-dark opacity-30 '></div>
      </div>
      <div className='w-full lg:w-1/2 h-screen flex flex-col items-center justify-center gap-10 p-4 sm:p-4'>
        <img src='/brand_logo.png' alt='HDMovie Logo' className='h-14 w-full object-contain mb-4' />
        <div className='w-full max-w-sm sm:max-w-md space-y-6'>
          <Title level={2} className='text-center mb-4 text-white'>
            Login
          </Title>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-white' htmlFor='email'>
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        id='email'
                        type='email'
                        placeholder='Enter your email'
                        className='w-full bg-white text-black placeholder--drop-shadow-white-glow focus-visible:ring-2 focus-visible:ring-yellow-400'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='text-white' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-white' htmlFor='password'>
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        id='password'
                        type='password'
                        placeholder='Enter your password'
                        className='w-full bg-white text-black placeholder--drop-shadow-white-glow focus-visible:ring-2 focus-visible:ring-yellow-400'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='text-white' />
                  </FormItem>
                )}
              />
              <Button
                type='submit'
                disabled={isSubmitting}
                className='w-full bg-secondary-yellow hover:bg-tertiary-yellow text-black'
              >
                {isSubmitting ? 'Logging in...' : 'Login'}
              </Button>
            </form>
          </Form>
          <Text className='text-center text-sm text-white'>
            Don't have an account?{' '}
            <a href='/register' className='text-secondary-yellow hover:text-tertiary-yellow'>
              Register
            </a>
          </Text>
        </div>
      </div>
    </div>
  )
}

export default Login
