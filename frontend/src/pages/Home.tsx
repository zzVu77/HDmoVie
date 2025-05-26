import Carousel3D from '@/components/Carousel3D'
import MovieSlider from '@/components/MovieSlider'
import Wrapper from '@/components/shared/Wrapper'
import { getHighlightMovies, MoviesHighlightResponse } from '@/services/movieService'
import { useEffect, useState } from 'react'
import { TitleSection } from './MovieDetail'

const Home = () => {
  const [movies, setMovies] = useState<MoviesHighlightResponse | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getHighlightMovies()
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
    <div className='flex flex-col scroll-smooth'>
      <Carousel3D movies={movies.latestMovies} />
      <Wrapper className='mt-20'>
        <TitleSection>Newest</TitleSection>
        <MovieSlider movies={movies.latestMovies} />
      </Wrapper>
      <Wrapper>
        <TitleSection>Top Trending</TitleSection>
        <MovieSlider movies={movies.trendingMovies} />
      </Wrapper>
      <Wrapper>
        <TitleSection>Top Rated</TitleSection>
        <MovieSlider movies={movies.topRatedMovies} />
      </Wrapper>
    </div>
  )
}

export default Home
