import { Link } from 'react-router-dom'
import { Bell, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Text } from './ui/typography'
import { SearchBar } from './SearchBar' // điều chỉnh đường dẫn nếu cần
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { NotificationItem } from './NotificationItem'
export type NotificationType = {
  id: string
  message: string
  time: Date
  status: 'UNREAD' | 'READ'
}

const notifications: NotificationType[] = [
  { id: '1', message: 'New comment on your post', time: new Date(), status: 'UNREAD' },
  { id: '2', message: 'Your profile was updated', time: new Date(), status: 'READ' },
  { id: '1', message: 'New comment on your post', time: new Date(), status: 'UNREAD' },
  { id: '1', message: 'New comment on your post', time: new Date(), status: 'UNREAD' },
  { id: '1', message: 'New comment on your post', time: new Date(), status: 'UNREAD' },
  { id: '1', message: 'New comment on your post', time: new Date(), status: 'UNREAD' },
]
export default function Header() {
  return (
    <div className='container mx-auto px-4 md:px-6 lg:px-8'>
      <header className='flex h-20 w-full shrink-0 items-center justify-between px-4 md:px-6 text-[var(--secondary)] bg-[var(--primary-dark)]'>
        <Link to='/' className='flex items-center gap-2 '>
          <Text body={1} className='text-[var(--accent-yellow-dark)]'>
            HDMovie
          </Text>
        </Link>

        {/* Navigation + Icons */}
        <div className='flex items-center gap-4'>
          {/* Nav Links */}
          <nav className='flex gap-2'>
            <div className='hidden md:block'>
              <SearchBar placeholder='Search movies...' />
            </div>
            <Link
              to='/'
              className='group inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-medium hover:text-[var(--accent-yellow)] transition-all duration-200 ease-in-out hover:scale-105'
            >
              Home
            </Link>
            <Link
              to='/trending'
              className='group inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-medium hover:text-orange-400 transition-all duration-200 ease-in-out hover:scale-105'
            >
              Trending
            </Link>
            <Link
              to='/blog'
              className='group inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-medium hover:text-orange-400 transition-all duration-200 ease-in-out hover:scale-105'
            >
              Blog
            </Link>
          </nav>

          {/* Notification Icon */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className='group relative hover:ring-2 hover:ring-offset-2 hover:ring-[var(--accent-yellow)] transition-all duration-200 ease-in-out hover:scale-110 rounded-full p-2'>
                <Bell className='h-5 w-5 text-[var(--secondary)] group-hover:text-[var(--accent-yellow)]' />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-80 max-h-96 overflow-auto p-2 space-y-2'>
              {notifications.length > 0 ? (
                notifications.map((noti) => <NotificationItem key={noti.id} {...noti} />)
              ) : (
                <div className='text-sm text-muted-foreground px-2 py-4'>No notifications</div>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Profile Dropdown with Icon */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant='ghost'
                size='icon'
                className='group relative hover:ring-2 hover:ring-offset-2 hover:ring-orange-400 transition-all duration-200 ease-in-out hover:scale-110'
              >
                <User className='h-5 w-5 text-[var(--secondary)] group-hover:text-[var(--accent-yellow)]' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-56'>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  Profile
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Billing
                  <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Settings
                  <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Keyboard shortcuts
                  <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem>Email</DropdownMenuItem>
                      <DropdownMenuItem>Message</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>More...</DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuItem>
                  New Team
                  <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>GitHub</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuItem disabled>API</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                Log out
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    </div>
  )
}

// function CarIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
//   return (
//     <svg
//       {...props}
//       xmlns='http://www.w3.org/2000/svg'
//       width='24'
//       height='24'
//       viewBox='0 0 24 24'
//       fill='none'
//       stroke='currentColor'
//       strokeWidth='2'
//       strokeLinecap='round'
//       strokeLinejoin='round'
//     >
//       <path d='M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2' />
//       <circle cx='7' cy='17' r='2' />
//       <path d='M9 17h6' />
//       <circle cx='17' cy='17' r='2' />
//     </svg>
//   )
// }
