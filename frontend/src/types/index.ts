export type GenreType = {
  id?: string
  name: string
}
export type CastType = {
  id?: string
  name: string
  profilePath?: string
}

export type MovieType = {
  id: string
  trailerSource?: string
  posterSource?: string
  releaseYear?: string
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
export type MovieCommentReportType = {
  id: string
  reporter: ReporterType
  reason: string
  content: string
  commentId: string
  movieId: string
  title: string
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
export type BlogReportType = {
  id: string
  reporter: ReporterType
  reason: string
  content: string
  blogId: string
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
  name: string
}

export type BlogOwnerType = {
  id: string
  fullName: string
}

export type BlogType = {
  id: string
  content: string
  dateCreated: string
  owner: BlogOwnerType
  tags: TagType[]
  imageUrls: Array<string | { id: string; url: string }>
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
  type: 'COMMENT' | 'FOLLOW' | 'LIKE' | 'REPORT'
  userId?: string
  commentId?: string
  followerId?: string
  reportId?: string
  blogId?: string
}
export type RegisteredUserType = {
  id: string
  fullName: string
}
export type BlogCommentType = {
  id: string
  content: string
  date: string
  user: RegisteredUserType
  replies?: BlogCommentType[]
  parentComment?: {
    id: string
  }
}

export type BlogPost = {
  id: string
  content: string
  dateCreated: string
  owner: RegisteredUserType
  tags: TagType[]
  likeCount: number
  commentCount: number
  imageUrls?: { id: string; url: string }[]
  isLiked: boolean
}
export type MovieCommentProps = {
  id: string
  user: {
    id: string
    fullName: string
  }
  comment: string
  rating: number
  date: string
}

export type MovieCommentResponse = {
  id: string
  score: number
  content: string
  movieId: string
  createdAt: string
  user: {
    id: string
    fullName: string
  }
}

export type MovieDetailResponse = {
  status: boolean
  movie: MovieType
  comments: MovieCommentProps[]
  relatedMovies: MovieType[]
}

export type LikeResponse = {
  id: string
  blogID: string
  likers: RegisteredUserType[]
}
