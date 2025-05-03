import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Bell, User, Menu, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import logo from '@/assets/brand_logo.png'
import { SearchBar } from './SearchBar'
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
  { id: '3', message: 'New comment on your post', time: new Date(), status: 'UNREAD' },
  { id: '4', message: 'New comment on your post', time: new Date(), status: 'UNREAD' },
  { id: '5', message: 'New comment on your post', time: new Date(), status: 'UNREAD' },
  { id: '6', message: 'New comment on your post', time: new Date(), status: 'UNREAD' },
]

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen)
  }

  return (
    <div className='container mx-auto px-4 md:px-6 lg:px-8'>
      <header className='flex h-20 w-full shrink-0 items-center justify-between px-4 md:px-6 text-[var(--secondary)] bg-[var(--primary-dark)]'>
        {/* Left Section: Hamburger Menu + Logo */}
        <div className='flex items-center gap-2'>
          {/* Hamburger Menu (Mobile Only) */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant='ghost'
                size='icon'
                className='md:hidden group relative hover:ring-2 hover:ring-offset-2 hover:ring-[var(--accent-yellow)] transition-all duration-200 ease-in-out hover:scale-110'
              >
                <Menu className='h-5 w-5 text-[var(--secondary)] group-hover:text-[var(--accent-yellow)]' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='start' className='w-56'>
              <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                  <Link to='/' className='w-full'>
                    Home
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to='/trending' className='w-full'>
                    Trending
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to='/blog' className='w-full'>
                    Blog
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Logo */}
          <Link to='/' className='flex items-center gap-2'>
            <img src={logo} alt='HDMovie Logo' className='h-16 md:h-20 w-auto object-contain' />
          </Link>
        </div>

        {/* Right Section: Navigation (Desktop) + Search + Icons */}
        <div className='flex items-center gap-4'>
          {/* Navigation Links (Desktop Only) */}
          <nav className='hidden md:flex gap-2'>
            <div>
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

          {/* Search Icon (Mobile Only) */}
          <button
            className='md:hidden group relative hover:ring-2 hover:ring-offset-2 hover:ring-[var(--accent-yellow)] transition-all duration-200 ease-in-out hover:scale-110 rounded-full p-2'
            onClick={toggleSearch}
            aria-label='Toggle search'
          >
            <Search className='h-5 w-5 text-[var(--secondary)] group-hover:text-[var(--accent-yellow)]' />
          </button>

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

      {/* Search Bar (Mobile Only, Toggles Below Header) */}
      {isSearchOpen && (
        <div className='md:hidden px-4 py-2 bg-[var(--primary-dark)]'>
          <SearchBar placeholder='Search...' />
        </div>
      )}
    </div>
  )
}
