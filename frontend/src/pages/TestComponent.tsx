import Banner from '@/components/Banner'
import CommentBox from '@/components/CommentBox'
import MovieCard from '@/components/MovieCard'
import MovieComment from '@/components/MovieComment'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { MovieType } from '@/types'
import { Loader2 } from 'lucide-react'

const dummyMovies: MovieType[] = [
  {
    posterSource: 'https://image.tmdb.org/t/p/original/janjdSMrTRGtPrI1p9uOX66jv7x.jpg',
    release: '2023',
    title: 'The Great Adventure',
    voteAvg: 8.5,
    genres: [
      { id: '1', name: 'Action' },
      { id: '2', name: 'Adventure' },
    ],
  },
  {
    posterSource: 'https://image.tmdb.org/t/p/original/O7REXWPANWXvX2jhQydHjAq2DV.jpg',
    release: '2022',
    title: 'Romantic Escape',
    voteAvg: 7.8,
    genres: [
      { id: '3', name: 'Romance' },
      { id: '4', name: 'Drama' },
    ],
  },
  {
    posterSource: 'https://image.tmdb.org/t/p/original/janjdSMrTRGtPrI1p9uOX66jv7x.jpg',
    release: '2021',
    title: 'Sci-Fi Chronicles',
    voteAvg: 9.0,
    genres: [
      { id: '5', name: 'Sci-Fi' },
      { id: '6', name: 'Thriller' },
    ],
  },
  {
    posterSource: 'https://image.tmdb.org/t/p/original/O7REXWPANWXvX2jhQydHjAq2DV.jpg',
    release: '2020',
    title: 'Mystery of the Lost City',
    voteAvg: 8.2,
    genres: [
      { id: '7', name: 'Mystery' },
      { id: '8', name: 'Adventure' },
    ],
  },
  {
    posterSource: 'https://image.tmdb.org/t/p/original/janjdSMrTRGtPrI1p9uOX66jv7x.jpg',
    release: '2019',
    title: 'Comedy Nights',
    voteAvg: 7.5,
    genres: [
      { id: '9', name: 'Comedy' },
      { id: '10', name: 'Family' },
    ],
  },
]
const dummyComments = [
  {
    userName: 'John Doe',
    comment: 'This movie was absolutely amazing! The story was captivating.',
    rating: 4.8,
    date: '2025-04-30',
  },
  {
    userName: 'Jane Smith',
    comment: 'I enjoyed the visuals, but the plot was a bit predictable.',
    rating: 3.5,
    date: '2025-04-29',
  },
  {
    userName: 'Michael Johnson',
    comment:
      'A masterpiece! The acting and direction were top-notch asdasd dsd asds sdas dasdasd sda sdassad asd ádasđá as asdsadas asd asd adsa a asdasds .',
    rating: 5.0,
    date: '2025-04-28',
  },
  {
    userName: 'Emily Davis',
    comment: 'Not my cup of tea, but I can see why others might like it.',
    rating: 2.8,
    date: '2025-04-27',
  },
  {
    userName: 'Chris Brown',
    comment: 'Great movie for a family night. Highly recommend it!',
    rating: 4.2,
    date: '2025-04-26',
  },
]
const TestComponent = () => {
  return (
    <div>
      <Banner></Banner>
      <div className='flex flex-wrap items-center justify-center gap-10  '>
        {dummyMovies.map((movie, index) => (
          <MovieCard
            key={index}
            posterSource={movie.posterSource}
            release={movie.release}
            title={movie.title}
            voteAvg={movie.voteAvg}
            genres={movie.genres}
          />
        ))}
      </div>
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
    </div>
  )
}

export default TestComponent
