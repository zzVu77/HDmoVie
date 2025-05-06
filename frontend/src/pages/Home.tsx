import Carousel3D from '@/components/Carousel3D'
import MovieSlider from '@/components/MovieSlider'
import Wrapper from '@/components/shared/Wrapper'
import { dummyMovies } from '@/data/dummyData'
import { TitleSection } from './MovieDetail'

const Home = () => {
  return (
    <div className=' flex flex-col scroll-smooth '>
      <Carousel3D></Carousel3D>
      <Wrapper className='mt-5'>
        <TitleSection>Newest</TitleSection>
        <MovieSlider movies={dummyMovies}></MovieSlider>
      </Wrapper>
      <Wrapper>
        <TitleSection>Top Trending</TitleSection>
        <MovieSlider movies={dummyMovies}></MovieSlider>
      </Wrapper>
      <Wrapper>
        <TitleSection>Top Rated</TitleSection>
        <MovieSlider movies={dummyMovies}></MovieSlider>
      </Wrapper>
    </div>
  )
}

export default Home
