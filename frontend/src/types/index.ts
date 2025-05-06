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
// Define Comment Report Type
export type ReporterType = {
  id: string
  fullName: string
}

export type BlogCommentReportType = {
  id: string
  reporter: ReporterType
  reason: string
  dateReported: string
  content: string
  commentId: string
  blogId: string
}
