import { MovieType } from '@/types'
import MovieCard from './MovieCard'

type ListMovieProps = {
  movies: MovieType[]
}
const ListMovie = ({ movies }: ListMovieProps) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-center justify-center'>
      {movies.map((movie, index) => (
        <MovieCard
          id={movie.id}
          key={index}
          posterSource={movie.posterSource}
          releaseYear={movie.releaseYear}
          title={movie.title}
          voteAvg={movie.voteAvg}
          genres={movie.genres}
        ></MovieCard>
      ))}
    </div>
  )
}

export default ListMovie
