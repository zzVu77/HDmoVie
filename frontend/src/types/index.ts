export type GenreType = {
  id?: string
  name?: string
}
export type MovieCardProps = {
  posterSource?: string
  releaseYear?: string
  title?: string
  voteAvg?: number
  genres?: GenreType[]
}
