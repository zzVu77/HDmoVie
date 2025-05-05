export type GenreType = {
  id?: string
  name?: string
}
export type CastType = {
  id?: string
  name?: string
  profilePath?: string
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
  index?: number
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
  id?: string
  title?: string
  description?: string
  isPublic?: boolean
  movies?: WatchlistMovieProps[]
}
export type TagType = {
  id?: string
  name?: string
}
export type MediaItem = {
  index: number
  file: File
  type: 'image' | 'video'
  url: string
}
export type NotificationItemProps = {
  id: string
  message: string
  time: Date
  status: 'UNREAD' | 'READ'
}
