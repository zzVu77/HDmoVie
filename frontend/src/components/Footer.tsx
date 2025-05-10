import { Text } from './ui/typography'
import { Github, Youtube, Facebook } from 'lucide-react'

const navLinks = [
  {
    label: 'Home',
    link: '/',
  },
  {
    label: 'Forum',
    link: '/blogs',
  },
  {
    label: 'About',
    link: '/about',
  },
  {
    label: 'Contact Us',
    link: '/contact',
  },
  {
    label: 'Our Team',
    link: '/team',
  },
]

export default function Footer() {
  return (
    <footer className='bg-gradient-to-b from-primary-dark to-gray-900 mt-5 pt-10'>
      <div className='mx-auto w-full max-w-screen-xl p-5 py-6 lg:py-8'>
        <div className='flex flex-row justify-center gap-x-6'>
          <a
            href='https://github.com/zzVu77/HDmoVie'
            className='bg-tertiary-dark text-white p-2 rounded-2xl transition-all duration-300 hover:scale-120 hover:bg-gray-100 hover:text-black'
          >
            <Github className='w-6 h-5' />
          </a>
          <a
            href='https://www.youtube.com/watch?v=dQw4w9WgXcQ'
            className='bg-tertiary-dark text-white p-2 rounded-2xl transition-all duration-300 hover:scale-120 hover:bg-gray-100 hover:text-red-600'
          >
            <Youtube className='w-6 h-5' />
          </a>
          <a
            href='https://www.facebook.com/dhspkt.hcmute'
            className='bg-tertiary-dark text-white p-2 rounded-2xl transition-all duration-300 hover:scale-120 hover:bg-gray-100 hover:text-blue-600'
          >
            <Facebook className='w-6 h-5' />
          </a>
        </div>

        <div className='flex flex-row flex-wrap justify-center gap-x-4 md:gap-x-6 mt-5'>
          {navLinks.map((nav) => (
            <a key={nav.link} href={nav.link}>
              <Text body={4} className='text-gray-400 hover:text-gray-300'>
                {nav.label}
              </Text>
            </a>
          ))}
        </div>

        <div className='flex justify-center w-full mt-4'>
          <Text className='text-sm text-gray-500 text-center'>F5 - UTE</Text>
        </div>

        <hr className='my-5 sm:mx-auto lg:my-8 border-gray-200' />

        <div className='flex justify-center w-full'>
          <Text className='text-sm text-gray-500 text-center'>© 2025 HDmoVie. All Rights Reserved.</Text>
        </div>
      </div>
    </footer>
  )
}
