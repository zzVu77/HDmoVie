import { cn } from '@/lib/utils'
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow'
import { NotificationItemProps } from '@/types'

export function NotificationItem({ message, time, status }: NotificationItemProps) {
  return (
    <div
      className={cn(
        'p-4 rounded-md border cursor-pointer flex items-start gap-2 transition-colors relative overflow-hidden group',
        status === 'UNREAD' ? 'bg-yellow-50' : 'bg-background',
      )}
    >
      {/* Overlay hiệu ứng hover */}
      <div className='absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none rounded-md' />

      <div className='flex-1 z-10'>
        <p className='text-sm text-black'>{message}</p>
        <p className='text-xs text-muted-foreground'>{formatDistanceToNow(new Date(time), { addSuffix: true })}</p>
      </div>

      {status === 'UNREAD' && <div className='w-2 h-2 mt-1 rounded-full bg-yellow-500 z-10' />}
    </div>
  )
}
