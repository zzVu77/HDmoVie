import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import pornhub from '@/assets/pornhub.svg' // Replace with appropriate image
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useState } from 'react'
import { Text, Title } from '../typography'
const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
})

type LoginFormValues = z.infer<typeof loginSchema>

const LoginForm: React.FC = () => {
  const [isSubmitting] = useState(false)

  // Initialize form with React Hook Form and Zod
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  // Handle form submission
  // const onSubmit = async (data: LoginFormValues) => {
  //   setIsSubmitting(true);
  //   try {
  //     // Simulate API call
  //     // await loginUser(data); // Replace with actual API call
  //     toast({
  //       title: 'Login Successful',
  //       description: 'You have been logged in!',
  //     });
  //     form.reset();
  //   } catch (error) {
  //     toast({
  //       title: 'Error',
  //       description: 'Failed to log in. Please check your credentials.',
  //       variant: 'destructive',
  //     });
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };
  const onSubmit = () => {
    form.reset()
  }
  return (
    <div className='flex min-h-screen flex-row items-center justify-center '>
      {/* Left Side: Image with Overlay (Hidden on Mobile) */}
      <div className='hidden lg:block w-full lg:w-1/2 h-screen relative'>
        <img
          src={pornhub} // Replace with your hot air balloon image path
          alt='Hot Air Balloon'
          className='w-full h-full object-contain'
        />
        <div className='absolute inset-0 bg-tertiary-yellow opacity-50 rounded-r-[50px]'></div>
      </div>

      {/* Right Side: Form */}
      <div className='w-full lg:w-1/2 h-screen flex items-center justify-center p-4 sm:p-8'>
        <div className='w-full max-w-sm sm:max-w-md space-y-6'>
          {/* <h2 className="text-xl sm:text-2xl font-bold text-center text-white">Login</h2> */}

          <Title level={2} className='text-center mb-4 text-white'>
            Login
          </Title>
          {/* Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
              {/* Email Field */}
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
                        className='w-full bg-white text-white placeholder--drop-shadow-white-glow focus-visible:ring-2 focus-visible:ring-yellow-400'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='text-white' />
                  </FormItem>
                )}
              />

              {/* Password Field */}
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
                        className='w-full bg-white text-white placeholder--drop-shadow-white-glow focus-visible:ring-2 focus-visible:ring-yellow-400'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='text-white' />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button
                type='submit'
                disabled={isSubmitting}
                className='w-full bg-secondary-yellow hover:bg-tertiary-yellow text-black'
              >
                {isSubmitting ? 'Logging in...' : 'Login'}
              </Button>
            </form>
          </Form>

          {/* Register Link */}
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

export default LoginForm
