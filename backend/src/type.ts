// This file defines the types used in the application
export type CastType = {
  id: string
  name: string
  profilePath: string
}
export type GenreType = {
  name: string
  id: string
}
export type MovieType = {
  id: string
  title: string
  description: string
  releaseYear: string
  trailerSource: string
  posterSource: string
  backdropSource: string
  voteAvg: number
  voteCount: number
  genres: GenreType[]
  casts: CastType[]
}
