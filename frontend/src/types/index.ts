export type GenreType = {
  id?: string
  name?: string
}
export type Cast = {
  id?: string
  name?: string
  profilePath?: string
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
