import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Title } from '@/components/ui/typography'
import { FollowPeopleProps } from '@/types'
import { ScrollArea } from '@/components/ui/scroll-area'

interface FollowInteractionModalProps {
  followers: FollowPeopleProps[]
  followings: FollowPeopleProps[]
}

// In order to get random background-text --> adjust color later
function getColorFromString(str: string) {
  const colors = [
    { bg: 'bg-red-500', text: 'text-white' },
    { bg: 'bg-blue-500', text: 'text-white' },
    { bg: 'bg-green-500', text: 'text-white' },
    { bg: 'bg-yellow-400', text: 'text-black' },
    { bg: 'bg-purple-500', text: 'text-white' },
    { bg: 'bg-pink-400', text: 'text-white' },
    { bg: 'bg-orange-500', text: 'text-white' },
    { bg: 'bg-emerald-500', text: 'text-white' },
    { bg: 'bg-cyan-500', text: 'text-white' },
    { bg: 'bg-indigo-500', text: 'text-white' },
    { bg: 'bg-teal-500', text: 'text-white' },
    { bg: 'bg-amber-500', text: 'text-black' },
    { bg: 'bg-lime-500', text: 'text-black' },
    { bg: 'bg-rose-500', text: 'text-white' },
    { bg: 'bg-fuchsia-500', text: 'text-white' },
    { bg: 'bg-sky-500', text: 'text-white' },
  ]
  const index = [...str].reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length
  return colors[index]
}

export default function FollowInteractionModal({ followers, followings }: FollowInteractionModalProps) {
  // Render list of followers/followings into multiple cards
  const renderPeopleList = (people: FollowPeopleProps[]) => {
    if (people.length === 0) {
      return <div className='text-tertiary-dark text-center py-4'>No users found.</div>
    }

    // Loop through list
    return people.map((person, index) => {
      // Get color based on first char
      const color = getColorFromString(person.fullName ?? 'U')

      // For each person --> Return a card
      return (
        <div key={person.id}>
          <Card className='flex flex-row items-center gap-4 px-2 pt-1 pb-0 bg-transparent border-none shadow-none'>
            <CardHeader className='pl-2'>
              <Avatar
                className='w-[35px] h-[35px] lg:w-[40px] lg:h-[40px] cursor-pointer hover:[box-shadow:0_0_5px_#fff] hover:[text-shadow:0_0_6px_#fff] 
                transition duration-200'
              >
                <AvatarFallback className={`${color.bg} ${color.text}`}>
                  {person.fullName?.charAt(0) ?? 'U'}
                </AvatarFallback>
              </Avatar>
            </CardHeader>
            <CardContent className='space-y-1 pl-4'>
              <Title
                level={6}
                className='mt-[-3px] cursor-pointer hover:underline 
             transition duration-200'
              >
                {person.fullName ?? 'Unknown User'}
              </Title>
            </CardContent>
          </Card>
          {index < people.length - 1 && <div className='border-t border-tertiary-dark ml-[70px] my-2' />}
        </div>
      )
    })
  }

  // Main component
  return (
    <Tabs defaultValue='followers' className='w-full bg-secondary-dark border border-tertiary-dark rounded-lg'>
      <TabsList className='grid w-full grid-cols-2 bg-transparent mb-0 pt-2'>
        <TabsTrigger
          value='followers'
          className='border text-gray data-[state=active]:text-white data-[state=active]:bg-transparent focus:outline-none cursor-pointer hover:text-tertiary-dark'
        >
          Followers
        </TabsTrigger>
        <TabsTrigger
          value='followings'
          className='border text-gray data-[state=active]:text-white data-[state=active]:bg-transparent focus:outline-none cursor-pointer hover:text-tertiary-dark'
        >
          Followings
        </TabsTrigger>
      </TabsList>

      <div className='border-t border-tertiary-dark' />

      <TabsContent value='followers' className='pt-0 pb-2 bg-secondary-dark rounded-lg'>
        <ScrollArea className='flex max-h-70 flex-col'> {renderPeopleList(followers)} </ScrollArea>
      </TabsContent>
      <TabsContent value='followings' className='pt-0 pb-2 bg-secondary-dark rounded-lg'>
        <ScrollArea className='flex max-h-70 flex-col gap-5'> {renderPeopleList(followings)} </ScrollArea>
      </TabsContent>
    </Tabs>
  )
}
