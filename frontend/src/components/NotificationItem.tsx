import { cn } from '@/lib/utils'
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow'
import { NotificationType } from '@/types'

export function NotificationItem({ time, status, type, userName }: NotificationType) {
  const getNotificationMessage = () => {
    switch (type) {
      case 'FOLLOW':
        return `${userName} started following you`
      case 'LIKE':
        return `${userName} liked your post`
      case 'COMMENT':
        return `${userName} commented on your post`
      case 'REPORT':
        return `${userName}'s content was reported`
      default:
        return 'New notification'
    }
  }

  return (
    <div
      className={cn(
        'p-4 rounded-md cursor-pointer flex items-start gap-2 transition-colors relative overflow-hidden group',
        status === 'UNREAD' ? 'bg-tertiary-dark' : 'bg-secondary-dark/50',
      )}
    >
      {/* Overlay hiệu ứng hover */}
      <div className='absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none rounded-md' />

      <div className='flex-1 z-10'>
        <p className='text-sm text-white'>{getNotificationMessage()}</p>
        <p className='text-xs text-muted-foreground'>{formatDistanceToNow(new Date(time), { addSuffix: true })}</p>
      </div>

      {status === 'UNREAD' && <div className='w-2 h-2 mt-1 rounded-full bg-white z-10' />}
    </div>
  )
}
