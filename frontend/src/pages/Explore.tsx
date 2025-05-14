// Explore.tsx
import ListMovie from '@/components/ListMovie'
import SearchBar from '@/components/shared/SearchBar'
import Wrapper from '@/components/shared/Wrapper'
import { Button } from '@/components/ui/button'
import { getMovies } from '@/services/movieService'
import { MovieType } from '@/types'
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

  const handleSearch = (value: string | MovieType[]) => {
    if (Array.isArray(value)) {
      setMovies(value)
    }
  }

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

  if (!movies || movies.length === 0) {
    return (
      <Wrapper className='mt-[150px] flex flex-col items-center justify-center'>
        <p className='text-center text-3xl text-primary-yellow font-bold tracking-widest'>Movie not found...</p>
        <a href={`/explore`}>
          <Button
            type='button'
            className={
              'bg-primary-yellow text-tertiary-dark font-semibold shadow-white-glow-down  gap-2 lg:text-lg p-3 px-10 flex'
            }
          >
            Back
          </Button>
        </a>
      </Wrapper>
    )
  }

  return (
    <div>
      <div className='flex flex-col gap-5 items-center justify-center pb-5 pt-28'>
        <Wrapper>
          <SearchBar searchType='movies' onSearch={handleSearch}></SearchBar>
          <ListMovie movies={movies}></ListMovie>
          {/* <Button
            disabled
            className='w-fittec mx-auto bg-tertiary-dark/70 text-primary-yellow font-bold drop-shadow-yellow-glow'
          >
            <Loader2 className='animate-spin' />
            Load more
          </Button> */}
        </Wrapper>
      </div>
    </div>
  )
}

export default Explore
