import MovieCard from '@/components/MovieCard'
import { MovieCardProps } from '@/types'

export const dummyMovies: MovieCardProps[] = [
  {
    posterSource: 'https://image.tmdb.org/t/p/original/janjdSMrTRGtPrI1p9uOX66jv7x.jpg',
    releaseYear: '2023',
    title: 'The Great Adventure',
    voteAvg: 8.5,
    genres: [
      { id: '1', name: 'Action' },
      { id: '2', name: 'Adventure' },
    ],
  },
  {
    posterSource: 'https://image.tmdb.org/t/p/original/O7REXWPANWXvX2jhQydHjAq2DV.jpg',
    releaseYear: '2022',
    title: 'Romantic Escape',
    voteAvg: 7.8,
    genres: [
      { id: '3', name: 'Romance' },
      { id: '4', name: 'Drama' },
    ],
  },
  {
    posterSource: 'https://image.tmdb.org/t/p/original/janjdSMrTRGtPrI1p9uOX66jv7x.jpg',
    releaseYear: '2021',
    title: 'Sci-Fi Chronicles',
    voteAvg: 9.0,
    genres: [
      { id: '5', name: 'Sci-Fi' },
      { id: '6', name: 'Thriller' },
    ],
  },
  {
    posterSource: 'https://image.tmdb.org/t/p/original/O7REXWPANWXvX2jhQydHjAq2DV.jpg',
    releaseYear: '2020',
    title: 'Mystery of the Lost City',
    voteAvg: 8.2,
    genres: [
      { id: '7', name: 'Mystery' },
      { id: '8', name: 'Adventure' },
    ],
  },
  {
    posterSource: 'https://image.tmdb.org/t/p/original/janjdSMrTRGtPrI1p9uOX66jv7x.jpg',
    releaseYear: '2019',
    title: 'Comedy Nights',
    voteAvg: 7.5,
    genres: [
      { id: '9', name: 'Comedy' },
      { id: '10', name: 'Family' },
    ],
  },
]
const TestComponent = () => {
  const dummyGenres = [
    { id: '1', name: 'Action' },
    { id: '2', name: 'Adventure' },
    { id: '3', name: 'Fantasy' },
  ]
  return (
    <>
      <div className='flex flex-wrap items-center justify-center gap-10 p-4'>
        {dummyMovies.map((movie, index) => (
          <MovieCard
            key={index}
            posterSource={movie.posterSource}
            releaseYear={movie.releaseYear}
            title={movie.title}
            voteAvg={movie.voteAvg}
            genres={dummyGenres}
          />
        ))}
      </div>
    </>
  )
}

export default TestComponent
