import { cn } from '@/lib/utils'
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow'

interface NotificationItemProps {
  message: string
  time: Date
  status: 'UNREAD' | 'READ'
}

export function NotificationItem({ message, time, status }: NotificationItemProps) {
  return (
    <div
      className={cn(
        'p-4 rounded-md border cursor-pointer flex items-start gap-2 transition-colors',
        status === 'UNREAD' ? 'bg-yellow-50' : 'bg-background',
      )}
    >
      <div className='flex-1'>
        <p className='text-sm text-black'>{message}</p>
        <p className='text-xs text-muted-foreground'>{formatDistanceToNow(new Date(time), { addSuffix: true })}</p>
      </div>
      {status === 'UNREAD' && <div className='w-2 h-2 mt-1 rounded-full bg-yellow-500' />}
    </div>
  )
}
