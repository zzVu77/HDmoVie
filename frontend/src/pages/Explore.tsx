import ListMovie from '@/components/ListMovie'
import SearchBar from '@/components/shared/SearchBar'
import Wrapper from '@/components/shared/Wrapper'
import { Button } from '@/components/ui/button'
import { dummyMovies } from '@/data/dummyData'
import { Loader2 } from 'lucide-react'

const Explore = () => {
  return (
    <div>
      <div className='flex flex-col gap-5 items-center justify-center pb-5'>
        <Wrapper className='items-center mt-2'>
          <div className='w-full'>
            <SearchBar
              iconColor='text-white'
              className='lg:text-lg  bg-tertiary-dark/80 text-white font-bold drop-shadow-white-glow border-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent placeholder:text-white/70 h-12'
            ></SearchBar>
          </div>
        </Wrapper>
        <Wrapper>
          <ListMovie movies={dummyMovies}></ListMovie>
          <Button
            disabled
            className='w-fit mx-auto bg-tertiary-dark/70 text-primary-yellow font-bold drop-shadow-yellow-glow'
          >
            <Loader2 className='animate-spin' />
            Load more
          </Button>
        </Wrapper>
      </div>
    </div>
  )
}

export default Explore
