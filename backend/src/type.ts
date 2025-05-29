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
export type BaseNotification = {
  id: string
  time: Date
  status: 'READ' | 'UNREAD'
  type: 'COMMENT' | 'FOLLOW' | 'LIKE' | 'REPORT'
  owner: {
    id: string
    fullName: string
  }
}

// Từng loại notification có các trường bổ sung
export type CommentNotification = BaseNotification & {
  type: 'COMMENT'
  commentId: string
}

export type FollowNotification = BaseNotification & {
  type: 'FOLLOW'
  followerId: string
}

export type LikeNotification = BaseNotification & {
  type: 'LIKE'
  userId: string
}

export type ReportNotification = BaseNotification & {
  type: 'REPORT'
  reportId: string
}

export type NotificationResponse = {
  id: string
  time: Date
  status: 'READ' | 'UNREAD'
  type: 'COMMENT' | 'FOLLOW' | 'LIKE' | 'REPORT'
  owner: {
    id: string
    fullName: string
  }
  user: {
    id: string
    fullName: string
  }
  commentId?: string
  followerId?: string
  userId?: string
  reportId?: string
  blogId?: string
  blog?: {
    id: string
    title: string
  }
}
