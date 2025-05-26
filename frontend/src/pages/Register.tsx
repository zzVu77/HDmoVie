import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Text, Title } from '@/components/ui/typography'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { z } from 'zod'
import { useState } from 'react'
import { apiPost } from '@/utils/axiosConfig'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
// Define schema for form validation

interface ApiErrorResponse {
  message?: string
}
const registerSchema = z
  .object({
    fullName: z.string().min(1, 'Full name is required'),
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
    repassword: z.string().min(8, 'Please confirm your password'),
    dateOfBirth: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, 'Please select a valid date')
      .refine(
        (date) => {
          const parsedDate = new Date(date)
          return !isNaN(parsedDate.getTime())
        },
        { message: 'Invalid date format' },
      ),
  })
  .refine((data) => data.password === data.repassword, {
    message: 'Passwords do not match',
    path: ['repassword'],
  })
  .refine(
    (data) => {
      const parsedDate = new Date(data.dateOfBirth)
      const today = new Date()
      const age = today.getFullYear() - parsedDate.getFullYear()
      const monthDiff = today.getMonth() - parsedDate.getMonth()
      const dayDiff = today.getDate() - parsedDate.getDate()

      const isOver16 = age > 16 || (age === 16 && (monthDiff > 0 || (monthDiff === 0 && dayDiff >= 0)))

      const isUnder100 = age < 100 || (age === 100 && (monthDiff < 0 || (monthDiff === 0 && dayDiff <= 0)))

      return isOver16 && isUnder100
    },
    {
      message: 'Age must be between 16 and 100 years old',
      path: ['dateOfBirth'],
    },
  )

type RegisterFormValues = z.infer<typeof registerSchema>

const RegisterForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  // Initialize form with React Hook Form and Zod
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      repassword: '',
      dateOfBirth: '',
    },
  })

  const onSubmit = async (data: RegisterFormValues) => {
    if (isSubmitting) return
    try {
      setIsSubmitting(true)
      await apiPost('/registeredusers/register', data)

      toast.success('Register Successfully!!')
      form.reset()
      navigate('/login')
    } catch (error: unknown) {
      let errorMessage = 'Register Fail:'

      if (axios.isAxiosError<ApiErrorResponse>(error)) {
        if (error.response?.data?.message) {
          errorMessage = error.response.data.message
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
    <div className='flex min-h-screen flex-row items-center justify-center bg-black'>
      {/* Left Side: Image with Overlay (Hidden on Mobile) */}
      <div className='hidden lg:flex lg:justify-center w-full lg:w-1/2 h-screen relative '>
        <img src='/poster.jpg' alt='backdrop' className='w-full  object-cover rounded-3xl object-center' />
        <div className='absolute inset-0 bg-primary-dark opacity-30 '></div>
      </div>

      {/* Right Side: Form */}
      <div className='w-full lg:w-1/2 h-screen flex items-center justify-center p-4 sm:p-8'>
        <div className='w-full max-w-sm sm:max-w-md space-y-6'>
          <Title level={2} className='text-center mb-4 text-white'>
            Register Your Account
          </Title>
          {/* Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
              {/* Full Name Field */}
              <FormField
                control={form.control}
                name='fullName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-white'>Full Name</FormLabel>
                    <FormControl>
                      <Input
                        id='fullName'
                        placeholder='Enter your full name'
                        className='w-full bg-white text-black placeholder-gray-400 focus-visible:ring-2 focus-visible:ring-tertiary-yellow'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='text-red-400' />
                  </FormItem>
                )}
              />

              {/* Email Field */}
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-white'>Email</FormLabel>
                    <FormControl>
                      <Input
                        id='email'
                        type='email'
                        placeholder='Enter your email'
                        className='w-full bg-white text-black placeholder-gray-400 focus-visible:ring-2 focus-visible:ring-tertiary-yellow'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='text-red-400' />
                  </FormItem>
                )}
              />

              {/* Password Field */}
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-white'>Password</FormLabel>
                    <FormControl>
                      <Input
                        id='password'
                        type='password'
                        placeholder='Enter your password'
                        className='w-full bg-white text-black placeholder-gray-400 focus-visible:ring-2 focus-visible:ring-tertiary-yellow'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='text-red-400' />
                  </FormItem>
                )}
              />

              {/* Confirm Password Field */}
              <FormField
                control={form.control}
                name='repassword'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-white'>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        id='repassword'
                        type='password'
                        placeholder='Confirm your password'
                        className='w-full bg-white text-black placeholder-gray-400 focus-visible:ring-2 focus-visible:ring-tertiary-yellow'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='text-red-400' />
                  </FormItem>
                )}
              />

              {/* Date of Birth Field */}
              <FormField
                control={form.control}
                name='dateOfBirth'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-white'>Date of Birth</FormLabel>
                    <FormControl>
                      <Input
                        id='dateOfBirth'
                        type='date'
                        className='w-full bg-white text-black placeholder-gray-400 focus-visible:ring-2 focus-visible:ring-tertiary-yellow'
                        max={new Date().toISOString().split('T')[0]} // Prevent future dates
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='text-red-400' />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button
                type='submit'
                disabled={isSubmitting}
                className='w-full bg-tertiary-yellow hover:bg-secondary-yellow text-black'
              >
                {isSubmitting ? 'Registering...' : 'Register New Account'}
              </Button>
            </form>
          </Form>

          {/* Login Link */}
          <Text className='text-center py-4 text-white'>
            Already have an account?{' '}
            <a href='/login' className='text-tertiary-yellow hover:text-secondary-yellow'>
              Log in
            </a>
          </Text>
        </div>
      </div>
    </div>
  )
}

export default RegisterForm
