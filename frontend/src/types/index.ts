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
export type NotificationItemProps = {
  id: string
  message: string
  time: Date
  status: 'UNREAD' | 'READ'
}
