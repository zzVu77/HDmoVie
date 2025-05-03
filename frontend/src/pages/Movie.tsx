import Banner from '@/components/Banner'
import CommentBox from '@/components/CommentBox'
import ListCastCard from '@/components/ListCastCard'
import MovieComment from '@/components/MovieComment'
import MovieSlider from '@/components/MovieSlider'
import Wrapper from '@/components/shared/Wrapper'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Text } from '@/components/ui/typography'
import VideoCard from '@/components/VideoCard'
import { dummyComments, dummyMovies } from '@/data/dummyData'
import { MovieType } from '@/types'
import { Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
const Movie = () => {
  const { id } = useParams<{ id: string }>()
  const [movieData, setMovieData] = useState<MovieType>()
  useEffect(() => {
    if (id) {
      // Giả sử bạn fetch từ API hoặc tìm trong dummyMovies
      const foundMovie = dummyMovies.find((movie) => movie.id === id)
      setMovieData(foundMovie)
    }
  }, [id])

  return (
    <div className=' flex flex-col scroll-smooth '>
      <Banner
        backdropSource={movieData?.backdropSource}
        casts={movieData?.casts}
        description={movieData?.description}
        genres={movieData?.genres}
        posterSource={movieData?.posterSource}
      ></Banner>
      <Wrapper className='mt-5'>
        <Title>Top Cast</Title>
        <ListCastCard></ListCastCard>
      </Wrapper>
      <Wrapper>
        <Title>Trailer Video</Title>
        <VideoCard></VideoCard>
      </Wrapper>
      <Wrapper>
        <Title>Related Movie</Title>
        <MovieSlider movies={dummyMovies}></MovieSlider>
      </Wrapper>
      <Wrapper>
        <Title>Review</Title>
        <div className='flex flex-col gap-5 w-[90vw] mx-auto '>
          <div className='w-full'>
            <CommentBox></CommentBox>
          </div>
          <ScrollArea className=' h-[70vh] w-[90vw] mx-auto flex flex-col items-center mb-10 lg:px-5'>
            {dummyComments.map((comment, index) => (
              <div className='pb-8' key={index}>
                <MovieComment
                  userName={comment.userName}
                  comment={comment.comment}
                  date={comment.date}
                  rating={comment.rating}
                />
              </div>
            ))}
            <div className='mx-auto text-center'>
              <Button disabled className='w-fit mx-auto bg-secondary-yellow text-black font-bold'>
                <Loader2 className='animate-spin' />
                Load more ...
              </Button>
            </div>
          </ScrollArea>
        </div>
      </Wrapper>
    </div>
  )
}
type TitleProps = {
  children: React.ReactNode
}
const Title = ({ children }: TitleProps) => {
  return (
    <div className='w-fit px-3'>
      <Text className='lg:text-[40px] text-[30px] font-extrabold '>{children}</Text>
      <hr className=' w-3/5  border-2 border-primary-yellow' />
    </div>
  )
}

export default Movie
