import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { Title } from '@/components/ui/typography'
import { ChevronDown, Clapperboard, LogOut, NotebookPen, Settings, User, UsersRound } from 'lucide-react'
import * as React from 'react'
import { ManageBlog } from './blog-admin/ManageBlog'
import { ManageMovie } from './movie-admin/ManageMovie'

import ManageBlogCommentReport from './blog-admin/ManageBlogCommentReport'
import ManageMovieCommentReport from './movie-admin/ManageMovieCommentReport'

import ManageBlogReport from './blog-admin/ManageBlogReport'
import ManageCast from './cast-admin/ManageCast'
import ManageTag from './tag-admin/ManageTag'
import ManageGenre from './genre-admin/ManageGenre'
import { apiGet } from '@/utils/axiosConfig'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'

interface MenuItem {
  title: string
  key: string
  icon: React.ComponentType<{ className?: string }>
  subItems?: { title: string; key: string }[]
}

const items: MenuItem[] = [
  {
    title: 'Manage Movie',
    key: 'movie',
    icon: Clapperboard,
    subItems: [
      { title: 'Movies', key: 'movies' },
      { title: 'Casts', key: 'casts' },
      { title: 'Genres', key: 'genres' },
      { title: 'Movie Comment Report', key: 'movie_comment_report' },
    ],
  },
  {
    title: 'Manage Blog',
    key: 'blog',
    icon: NotebookPen,
    subItems: [
      { title: 'Blogs', key: 'blogs' },
      { title: 'Blog Report', key: 'blog_report' },
      { title: 'Comment Report', key: 'conmment_report' },
      { title: 'Tags', key: 'tags' },
    ],
  },
  { title: 'Manage User', key: 'user', icon: UsersRound },
  { title: 'Settings', key: 'settings', icon: Settings },
]

export default function AppSidebar() {
  const [selected, setSelected] = React.useState<string>('home')
  const [expanded, setExpanded] = React.useState<string | null>(null)
  const navigate = useNavigate()

  const handleLogout = async () => {
    await apiGet('/registeredusers/logout')
    localStorage.removeItem('access-token')

    navigate('/login')
  }
  const toggleSubMenu = (key: string) => {
    setExpanded(expanded === key ? null : key)
  }

  const renderContent = () => {
    switch (selected) {
      case 'movie':
        return <ManageMovie />
      case 'casts':
        return <ManageCast />
      case 'genres':
        return <ManageGenre />
      case 'movie_comment_report':
        return <ManageMovieCommentReport />
      case 'blogs':
        return <ManageBlog />
      case 'blog_report':
        return <ManageBlogReport />
      case 'conmment_report':
        return <ManageBlogCommentReport />
      case 'tags':
        return <ManageTag />
      case 'user':
        return <div>📅User Dashboard</div>
      case 'settings':
        return <div>⚙️ Settings content</div>
      default:
        return <ManageMovie />
    }
  }

  return (
    <div className='w-full flex flex-row-reverse  justify-between '>
      {/* Header */}
      <div className='flex flex-col w-full h-screen overflow-hidden'>
        <header className='flex items-center justify-between px-4 py-1 h-fit border-b-1 bg-background w-full'>
          <div className='flex items-center gap-4'>
            <SidebarTrigger className='md:hidden text-2xl' style={{ transform: 'scale(1.5)' }} />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className='cursor-pointer'>
                <AvatarImage src='https://github.com/shadcn.png' alt='@user' />
                <AvatarFallback>US</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className='mr-2 h-4 w-4' />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className='mr-2 h-4 w-4' />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={handleLogout}>
                <LogOut className='mr-2 h-4 w-4' />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <section className='flex-1 px-2 overflow-x-auto'>{renderContent()}</section>
      </div>
      {/* Main Content */}
      <div>
        <Sidebar className='static border-r-2 '>
          <SidebarContent className='w-fit'>
            <SidebarGroup className='w-fit h-full flex-col flex gap-5 items-center justify-start'>
              <Link to='/'>
                <img src='/brand_logo.png' className='aspect-auto' alt='' />
              </Link>
              <SidebarGroupLabel className=''>
                <Title level={2} className='text-primary-dark'>
                  Admin Dashboard
                </Title>
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className='w-fit gap-5'>
                  {items.map((item) => (
                    <SidebarMenuItem key={item.key}>
                      <SidebarMenuButton
                        onClick={() => {
                          if (item.subItems) {
                            toggleSubMenu(item.key)
                          } else {
                            setSelected(item.key)
                          }
                        }}
                        className='flex justify-start'
                      >
                        <div className='flex items-center min-w-[150px] w-fit'>
                          <item.icon className='mr-2 text-2xl' />
                          <span className='w-fit'>{item.title}</span>
                        </div>
                        {item.subItems && (
                          <ChevronDown
                            className={`transition-transform ${expanded === item.key ? 'rotate-180' : ''}`}
                          />
                        )}
                      </SidebarMenuButton>
                      {item.subItems && expanded === item.key && (
                        <SidebarMenuSub>
                          {item.subItems.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.key}>
                              <SidebarMenuSubButton
                                onClick={() => setSelected(subItem.key)}
                                isActive={selected === subItem.key}
                              >
                                <span>{subItem.title}</span>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      )}
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      </div>
    </div>
  )
}
