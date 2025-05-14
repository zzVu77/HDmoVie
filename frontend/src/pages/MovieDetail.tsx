import Banner from '@/components/Banner'
import CommentBox from '@/components/CommentBox'
import ListCastCard from '@/components/ListCastCard'
import MovieComment from '@/components/MovieComment'
import MovieSlider from '@/components/MovieSlider'
import Wrapper from '@/components/shared/Wrapper'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Text, Title } from '@/components/ui/typography'
import VideoCard from '@/components/VideoCard'
import { getMovieById, MovieDetailResponse } from '@/services/movieService'
import { MovieCommentProps } from '@/types'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const MovieDetail = () => {
  const { id } = useParams<{ id: string }>()
  const [movieData, setMovieData] = useState<MovieDetailResponse>()
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const data = await getMovieById(id as string)
        setMovieData(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Cannot fetch movie data')
      } finally {
        setLoading(false)
      }
    }

    fetchMovieData()
  }, [id])

  const handleCommentAdded = (newComment: MovieCommentProps) => {
    if (movieData) {
      setMovieData({
        ...movieData,
        comments: [newComment, ...movieData.comments],
        status: true, // Update status to indicate user has commented
      })
    }
  }

  if (loading) {
    return (
      <Wrapper className='mt-[100px]'>
        <p className='text-center'>Loading...</p>
      </Wrapper>
    )
  }

  if (error) {
    return (
      <Wrapper className='mt-[100px] flex flex-col items-center justify-center'>
        <p className='text-red-500 text-center'>{error}</p>
        <Link to={`/`}>
          <Button
            type='button'
            className={
              'bg-primary-yellow text-tertiary-dark font-semibold shadow-white-glow-down  gap-2 lg:text-lg p-3 flex'
            }
          >
            Back to Home
          </Button>
        </Link>
      </Wrapper>
    )
  }

  if (!movieData) {
    return (
      <Wrapper className='mt-[100px]'>
        <p className='text-center'>Movie not found</p>
      </Wrapper>
    )
  }
  return (
    <div className=' flex flex-col scroll-smooth '>
      <Banner {...movieData.movie}></Banner>
      <Wrapper className='mt-5'>
        <TitleSection>Top Cast</TitleSection>
        <ListCastCard casts={movieData.movie.casts}></ListCastCard>
      </Wrapper>
      <Wrapper>
        <TitleSection>Trailer Video</TitleSection>
        <VideoCard url={movieData.movie.trailerSource}></VideoCard>
      </Wrapper>
      <Wrapper>
        <TitleSection>Related Movie</TitleSection>
        <MovieSlider movies={movieData.relatedMovies}></MovieSlider>
      </Wrapper>
      <Wrapper>
        <TitleSection>Review</TitleSection>
        <div className='flex flex-col gap-5 w-[90vw] mx-auto'>
          {!movieData.status && (
            <div className='w-full'>
              <CommentBox onCommentAdded={handleCommentAdded} />
            </div>
          )}

          {movieData.comments.length === 0 ? (
            <div className='h-[40vh] '>
              <div className='text-center flex-col gap-3 flex items-center justify-center '>
                <Title level={1} className=' font-semibold text-primary-yellow '>
                  No comments yet
                </Title>
                <Text body={4} className=' text-gray-300'>
                  Be the first to leave a review!
                </Text>
              </div>
            </div>
          ) : (
            <ScrollArea className='h-[70vh] w-[90vw] mx-auto flex flex-col items-center mb-10 lg:px-5'>
              {movieData.comments.map((comment, index) => (
                <div className='pb-8' key={index}>
                  <MovieComment
                    userName={comment.userName}
                    comment={comment.comment}
                    date={comment.date}
                    rating={comment.rating}
                  />
                </div>
              ))}
              {/* <div className='mx-auto text-center'>
                <Button disabled className='w-fit mx-auto bg-secondary-yellow text-black font-bold'>
                  <Loader2 className='animate-spin mr-2 h-4 w-4' />
                  Load more ...
                </Button>
              </div> */}
            </ScrollArea>
          )}
        </div>
      </Wrapper>
    </div>
  )
}
type TitleProps = {
  children: React.ReactNode
}
export const TitleSection = ({ children }: TitleProps) => {
  return (
    <div className='w-fit px-3'>
      <Text className='lg:text-[40px] text-[30px] font-extrabold '>{children}</Text>
      <hr className=' w-3/5  border-2 border-primary-yellow' />
    </div>
  )
}

export default MovieDetail
