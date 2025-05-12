import ListMovie from '@/components/ListMovie'
import Wrapper from '@/components/shared/Wrapper'
import { Button } from '@/components/ui/button'
import { getMovies } from '@/services/movieService'
import { MovieType } from '@/types'
import { Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'

const Explore = () => {
  const [movies, setMovies] = useState<MovieType[] | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getMovies()
        setMovies(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Không thể tải danh sách phim')
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
  }, [])
  if (loading) {
    return (
      <Wrapper className='mt-[100px]'>
        <p className='text-center'>Đang tải...</p>
      </Wrapper>
    )
  }

  if (error) {
    return (
      <Wrapper className='mt-[100px]'>
        <p className='text-red-500 text-center'>{error}</p>
      </Wrapper>
    )
  }

  if (!movies) {
    return (
      <Wrapper className='mt-[100px]'>
        <p className='text-center'>Không tìm thấy phim</p>
      </Wrapper>
    )
  }
  return (
    <div>
      <div className='flex flex-col gap-5 items-center justify-center pb-5 pt-28'>
        <Wrapper>
          <ListMovie movies={movies}></ListMovie>
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
