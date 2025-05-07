import { NotificationItem } from '@/components/NotificationItem'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Text } from '@/components/ui/typography'

import { Notification, Profile } from 'iconsax-reactjs'
import { Menu, Home, FileText, Telescope } from 'lucide-react'
import { useRef, useState, useEffect } from 'react'
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom'
import { SearchBar } from './SearchBar'
import { observeBodyChanges } from '@/utils/mutationObserver'

export type NotificationType = {
  id: string
  message: string
  time: Date
  status: 'UNREAD' | 'READ'
}
const menuItems = [
  { label: 'Home', path: '/' },
  { label: 'Explore', path: '/explore' },
  { label: 'Blogs', path: '/' },
]

const notifications: NotificationType[] = [
  { id: '1', message: 'New comment on your post', time: new Date(), status: 'UNREAD' },
  { id: '2', message: 'Your profile was updated', time: new Date(), status: 'READ' },
  { id: '3', message: 'You are banned', time: new Date(), status: 'READ' },
]

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  // Track location of current page
  const location = useLocation()
  const navValue = ['Home', 'Explore', 'Blog']
  // We store the nav value like Home, Explore,...
  // So to track the route THROUGH the value, using a dict like below
  const pathMap: Record<string, string> = {
    Home: '/',
    Explore: '/explore',
    Blog: '/blogs',
  }

  // Handle current time display
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString())

  // Observe the change of body tag
  // Due to the radix effect applies on the body to prevent screen from being scrolled
  useEffect(() => {
    // Observe body changes
    const observer = observeBodyChanges()

    // Update time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString())
    }, 1000)

    // Cleanup both on unmount
    return () => {
      observer.disconnect()
      clearInterval(timer)
    }
  }, [])

  return (
    <header className='flex h-20 w-[90vw] shrink-0 items-center justify-between px-4 md:px-6 text-white bg-tertiary-dark/55 drop-shadow-white-glow rounded-3xl shadow-md fixed backdrop-blur-[2px] z-[999] top-0 left-1/2 -translate-x-1/2 mt-1 '>
      {/* Left Section: Hamburger Menu + Logo */}
      <div className='flex items-center'>
        <Sheet>
          <SheetTrigger asChild className='ml-2 md:hidden'>
            <Menu></Menu>
          </SheetTrigger>
          <SheetContent side='left' className='z-[1001] bg-secondary-dark border-tertiary-dark custom-sheet'>
            <div className='text-lg font-bold mt-3 px-3 pb-3 text-secondary-yellow flex items-center border-b border-tertiary-dark shadow-md shadow-tertiary-dark'>
              <img src={'/public/brand_logo.png'} alt='HDMovie Logo' className='h-6 w-auto object-contain mr-2' />
              <Text body={4} className='text-secondary-yellow my-1'>
                {currentTime}
              </Text>
            </div>

            {/* The nav bar move to here on mobie device */}
            <div className='flex flex-col gap-2 pl-2'>
              {navValue.map((value) => {
                const isActive = location.pathname === pathMap[value]
                let icon
                switch (value) {
                  case 'Home':
                    icon = <Home className='mr-3' />
                    break
                  case 'Explore':
                    icon = <Telescope className='mr-3' />
                    break
                  case 'Blog':
                    icon = <FileText className='mr-3' />
                    break
                  default:
                    icon = null
                }

                return (
                  <a
                    key={value}
                    href={pathMap[value]}
                    className={`flex items-end space-x-3 p-3 ${
                      isActive
                        ? 'bg-secondary-light text-primary-yellow border-l-4 border-primary-yellow'
                        : 'text-white'
                    }`}
                  >
                    {icon}
                    <Text body={4} className='text-inherit'>
                      {value}
                    </Text>
                  </a>
                )
              })}
            </div>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <Link to='/' className={`flex items-center gap-2 ${isSearchOpen ? 'hidden md:flex' : 'flex'}`}>
          {/* Logo Image */}
          <img src={'/public/brand_logo.png'} alt='HDMovie Logo' className='h-15 md:h-16 w-auto object-contain p-4' />
        </Link>

        {/* Navigation Links (Desktop Only) */}
        <nav className='hidden md:flex gap-2'>
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className='inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-md font-medium hover:text-tertiary-yellow transition'
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Right Section */}
      <div className='flex items-center gap-1 md:gap-4 relative' ref={searchRef}>
        {/* Search Icon */}
        <SearchBar placeholder='Search...' onExpandChange={(expanded) => setIsSearchOpen(expanded)} />

        {/* Notification & Profile (hidden on mobile when search is open) */}
        <div
          className={`items-center gap-1 md:gap-4 transition-all duration-200 ease-in-out ${isSearchOpen ? 'hidden sm:flex' : 'flex'}`}
        >
          {/* Notification Icon */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className='group relative hover:ring-2 hover:ring-offset-2 hover:ring-[var(--accent-yellow)] transition-all duration-200 ease-in-out rounded-full p-2'>
                <Notification size='32' className='h-5 w-5 text-white group-hover:text-accent-yellow ' variant='Bold' />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align='end'
              className='w-80 max-h-96 overflow-auto p-2 space-y-2 bg-secondary-dark border-tertiary-dark text-white z-[1000]'
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
              <button className='group relative hover:ring-2 hover:ring-offset-2 hover:ring-[var(--accent-yellow)] transition-all duration-200 ease-in-out rounded-full p-2'>
                <Profile size='32' className='h-5 w-5 text-white group-hover:text-accent-yellow' variant='Bold' />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align='end'
              className='w-56 bg-secondary-dark border-tertiary-dark text-white z-[1000]'
            >
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
