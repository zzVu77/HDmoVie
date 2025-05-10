import ListMovie from '@/components/ListMovie'
import Wrapper from '@/components/shared/Wrapper'
import { Button } from '@/components/ui/button'
import { dummyMovies } from '@/data/dummyData'
import { Loader2 } from 'lucide-react'

const Explore = () => {
  return (
    <div>
      <div className='flex flex-col gap-5 items-center justify-center pb-5 pt-28'>
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
