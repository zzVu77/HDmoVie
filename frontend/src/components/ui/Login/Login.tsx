import { Input } from '@/components/ui/input' // shadcn/ui Input component
import { Label } from '@/components/ui/label' // shadcn/ui Label component
import { Button } from '@/components/ui/button' // shadcn/ui Button component
import pornhub from '@/assets/pornhub.svg' // Replace with appropriate image

const LoginForm = () => {
  return (
    <div className='flex min-h-screen flex-row items-center justify-center bg-black'>
      {/* Left Side: Image with Overlay (Hidden on Mobile) */}
      <div className='hidden lg:block w-full lg:w-1/2 h-screen relative'>
        <img
          src={pornhub} // Replace with your hot air balloon image path
          alt='Hot Air Balloon'
          className='w-full h-full object-contain'
        />
        <div className='absolute inset-0 bg-yellow-400 opacity-50 rounded-r-[50px]'></div>
      </div>

      {/* Right Side: Form */}
      <div className='w-full lg:w-1/2 h-screen flex items-center justify-center p-4 sm:p-8'>
        <div className='w-full max-w-sm sm:max-w-md space-y-6'>
          <h2 className='text-xl sm:text-2xl font-bold text-center text-white'>Login</h2>

          {/* Form Fields */}
          <div className='space-y-4'>
            {/* Email */}
            <div className='space-y-2'>
              <Label htmlFor='email' className='text-white'>
                Email
              </Label>
              <Input
                id='email'
                type='email'
                placeholder='Enter your email'
                className='w-full bg-gray-800 text-white placeholder-gray-400'
              />
            </div>

            {/* Password */}
            <div className='space-y-2'>
              <Label htmlFor='password' className='text-white'>
                Password
              </Label>
              <Input
                id='password'
                type='password'
                placeholder='Enter your password'
                className='w-full bg-gray-800 text-white placeholder-gray-400'
              />
            </div>
          </div>

          {/* Create Account Button */}
          <Button className='w-full bg-yellow-400 hover:bg-yellow-500 text-black'>Login</Button>

          {/* Log in Link */}
          <p className='text-center text-sm text-white'>
            Don't have an account?{' '}
            <a href='/register' className='text-blue-300 hover:text-blue-200'>
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginForm
