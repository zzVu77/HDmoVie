import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Bell, User, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import logo from '@/assets/brand_logo.png'
import { SearchBar } from './SearchBar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { NotificationItem } from '@/components/NotificationItem'

export type NotificationType = {
  id: string
  message: string
  time: Date
  status: 'UNREAD' | 'READ'
}

const notifications: NotificationType[] = [
  { id: '1', message: 'New comment on your post', time: new Date(), status: 'UNREAD' },
  { id: '2', message: 'Your profile was updated', time: new Date(), status: 'READ' },
  { id: '3', message: 'You are banned', time: new Date(), status: 'READ' },
]

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  return (
    <header className='flex h-20 w-full shrink-0 items-center justify-between px-4 md:px-6 text-white bg-secondary-dark/50 rounded-lg shadow-md relative backdrop-blur-[2px]'>
      {/* Left Section: Hamburger Menu + Logo */}
      <div className='flex items-center gap-2'>
        <DropdownMenu>
          {/* Hamburger Menu Icon (Mobile Only) */}
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' size='icon' className='md:hidden'>
              <Menu className='h-5 w-5 text-[var(--secondary)]' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='start' className='w-56 bg-secondary-dark border-tertiary-dark text-white'>
            <DropdownMenuGroup>
              {['Home', 'Genre', 'Blog'].map((label) => (
                <>
                  <DropdownMenuItem asChild key={label}>
                    <Link to='#' className='active:text-primary-yellow transition-colors rounded-md px-2 py-1'>
                      {label}
                    </Link>
                  </DropdownMenuItem>
                  {label !== 'Blog' && <DropdownMenuSeparator className='bg-tertiary-dark' />}
                </>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Logo */}
        <Link to='#' className={`flex items-center gap-2 ${isSearchOpen ? 'hidden md:flex' : 'flex'}`}>
          {/* Logo Image */}
          <img src={logo} alt='HDMovie Logo' className='h-16 md:h-20 w-auto object-contain' />
        </Link>

        {/* Navigation Links (Desktop Only) */}
        <nav className='hidden md:flex gap-2'>
          {['Home', 'Genre', 'Blog'].map((label) => (
            <Link
              key={label}
              to='#'
              className='inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-md font-medium hover:text-tertiary-yellow transition'
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Right Section */}
      <div className='flex items-center gap-4 relative' ref={searchRef}>
        {/* Search Icon */}
        <SearchBar placeholder='Search...' onExpandChange={(expanded) => setIsSearchOpen(expanded)} />

        {/* Notification & Profile (hidden on mobile when search is open) */}
        <div
          className={`items-center gap-4 transition-all duration-200 ease-in-out ${isSearchOpen ? 'hidden sm:flex' : 'flex'}`}
        >
          {/* Notification Icon */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className='group relative hover:ring-2 hover:ring-offset-2 hover:ring-[var(--accent-yellow)] transition-all duration-200 ease-in-out rounded-full p-2'>
                <Bell className='h-5 w-5 text-white group-hover:text-accent-yellow' />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align='end'
              className='w-80 max-h-96 overflow-auto p-2 space-y-2 bg-secondary-dark border-tertiary-dark text-white'
            >
              {notifications.length > 0 ? (
                notifications.map((n) => <NotificationItem key={n.id} {...n} />)
              ) : (
                <div className='text-sm text-muted-foreground px-2 py-4'>No notifications</div>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant='ghost'
                size='icon'
                className='hover:ring-2 hover:ring-offset-2 hover:ring-[var(--accent-yellow)] transition-all duration-200 ease-in-out rounded-full p-2'
              >
                <User className='h-5 w-5 text-white group-hover:text-accent-yellow' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-56 bg-secondary-dark border-tertiary-dark text-white'>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator className='bg-tertiary-dark' />
              <DropdownMenuGroup>
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Log out</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
