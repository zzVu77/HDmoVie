import VerifyOtpForm from '@/components/VerifyOtpForm'

export default function VerifyOtpPage() {
  return (
    <div className='flex min-h-screen flex-row items-center justify-center'>
      <div className='hidden lg:flex lg:justify-center w-full lg:w-1/2 h-screen relative '>
        <img src='/poster.jpg' alt='backdrop' className='w-full  object-cover rounded-3xl object-center' />
        <div className='absolute inset-0 bg-primary-dark opacity-30 '></div>
      </div>
      <div className='w-full lg:w-1/2 h-screen flex flex-col items-center justify-center gap-10 p-4 sm:p-4'>
        <img src='/brand_logo.png' alt='HDMovie Logo' className='h-14 w-full object-contain mb-4' />
        <div className='w-full max-w-sm sm:max-w-md space-y-6'>
          <VerifyOtpForm />
        </div>
      </div>
    </div>
  )
}
