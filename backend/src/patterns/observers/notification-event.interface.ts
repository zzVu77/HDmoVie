export interface NotificationEvent {
  type: 'COMMENT' | 'FOLLOW' | 'LIKE' | 'REPORT'
  data: any
  timestamp: Date
}
