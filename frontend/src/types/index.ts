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
export type TagType = {
  id: string
  name: string
}
export type RegisteredUserType = {
  id: string
  name: string
}
