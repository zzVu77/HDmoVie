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
export type FollowPeopleProps = {
  id?: string
  fullName?: string
}
export type RegisteredUserProps = {
  id?: string
  fullName?: string
  email?: string
  dateOfBirth?: Date
}
export type WatchlistMovieProps = {
  id?: string
  title?: string
  description?: string
  posterSource?: string
  backdropSource?: string
  releaseYear?: string
  voteAvg?: number
  voteCount?: number
  genres?: GenreType[]
}
export type WatchlistProps = {
  title?: string
  description?: string
  isPublic?: boolean
  movies?: WatchlistMovieProps[]
}
