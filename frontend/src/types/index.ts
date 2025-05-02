export type GenreType = {
  id?: string
  name?: string
}
export interface MovieType {
  posterSource?: string
  release?: string
  title?: string
  voteAvg?: number
  genres?: GenreType[]
  backdropSource?: string
  description?: string
}
