import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/typography'

const Home = () => {
  return (
    <div className='mx-auto text-center flex item justify-center'>
      <div className='w-auto flex gap-10 p-10'>
        <a href='/home'>
          <Button className='bg-primary-yellow p-8 cursor-pointer'>
            <Text body={1} className='font-extrabold text-2xl'>
              Home
            </Text>
          </Button>
        </a>
        <a href='/about'>
          <Button className='bg-primary-yellow p-8 cursor-pointer'>
            <Text body={1} className='font-extrabold text-2xl'>
              About
            </Text>
          </Button>
        </a>
        <a href='/login'>
          <Button className='bg-primary-yellow p-8 cursor-pointer'>
            <Text body={1} className='font-extrabold text-2xl'>
              Login
            </Text>
          </Button>
        </a>
        <a href='/test'>
          <Button className='bg-primary-yellow p-8 cursor-pointer'>
            <Text body={1} className='font-extrabold text-2xl '>
              Test component
            </Text>
          </Button>
        </a>
        <a href='/movie'>
          <Button className='bg-primary-yellow p-8 cursor-pointer'>
            <Text body={1} className='font-extrabold text-2xl '>
              Movie Page
            </Text>
          </Button>
        </a>
      </div>
    </div>
  )
}

export default Home
