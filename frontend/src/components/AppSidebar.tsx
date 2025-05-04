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
import ManageTag from './tag-admin/ManageTag'

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

  const toggleSubMenu = (key: string) => {
    setExpanded(expanded === key ? null : key)
  }

  const renderContent = () => {
    switch (selected) {
      case 'movie':
        return <ManageMovie />
      case 'casts':
        return <div>Casts Dashboard</div>
      case 'genres':
        return <div>🎭 Genres content</div>
      case 'movie_comment_report':
        return <div>💬 Movie Comments Report</div>
      case 'blogs':
        return <ManageBlog />
      case 'blog_report':
        return <div>📥 Blogs Report Dashboard</div>
      case 'conmment_report':
        return <div>💬 Comments Report</div>
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
              <DropdownMenuItem>
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
              <img src='/brand_logo.png' className='aspect-auto' alt='' />
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
