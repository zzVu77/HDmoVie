import { cn } from '@/lib/utils'
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow'
import { NotificationItemProps } from '@/types'

export function NotificationItem({ message, time, status }: NotificationItemProps) {
  // Convert time to Date object if it's a string
  const timeDate = typeof time === 'string' ? new Date(time) : time

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
        <p className='text-sm text-white'>{message}</p>
        <p className='text-xs text-muted-foreground'>{formatDistanceToNow(timeDate, { addSuffix: true })}</p>
      </div>

      {status === 'UNREAD' && <div className='w-2 h-2 mt-1 rounded-full bg-accent-yellow z-10' />}
    </div>
  )
}
