export type GenreType = {
  id?: string
  name: string
}
export type CastType = {
  id?: string
  name: string
  profilePath?: string
}

export interface MovieType {
  id?: string
  trailerSource?: string
  posterSource?: string
  release?: string
  title?: string
  voteAvg?: number
  genres?: GenreType[]
  backdropSource?: string
  description?: string
  casts?: CastType[]
  voteCount?: number
}
