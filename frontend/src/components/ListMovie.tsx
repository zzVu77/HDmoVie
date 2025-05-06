import { MovieType } from '@/types'
import MovieCard from './MovieCard'

type ListMovieProps = {
  movies: MovieType[]
}
const ListMovie = ({ movies }: ListMovieProps) => {
  return (
    <div className='flex flex-wrap justify-center gap-10'>
      {movies.map((movie, index) => (
        <MovieCard
          id={movie.id}
          key={index}
          posterSource={movie.posterSource}
          release={movie.release}
          title={movie.title}
          voteAvg={movie.voteAvg}
          genres={movie.genres}
        ></MovieCard>
      ))}
    </div>
  )
}

export default ListMovie
