import { FollowPeopleProps } from '@/types'
import { UserPlus } from 'lucide-react'
import { EditProfileModal } from './EditProfileModal'
import FollowInteractionModal from './FollowInteractionModal'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { Text, Title } from './ui/typography'

type Props = {
  id: string
  fullName: string
  email: string
  dateOfBirth: Date
  countNum?: string
}
const dummyFollowPeopleData: FollowPeopleProps[] = [
  { id: '1', fullName: 'John Doe' },
  { id: '2', fullName: 'Jane Smith' },
  { id: '3', fullName: 'Alice Johnson' },
  { id: '4', fullName: 'Bob Brown' },
  { id: '5', fullName: 'Charlie Davis' },
  { id: '6', fullName: 'Diana Evans' },
  { id: '7', fullName: 'Ethan Harris' },
  { id: '8', fullName: 'Fiona Clark' },
  { id: '9', fullName: 'George Lewis' },
  { id: '10', fullName: 'Hannah Walker' },
]
const dummyFollowings: FollowPeopleProps[] = [
  { id: '1', fullName: 'Alice Johnson' },
  { id: '2', fullName: 'Benjamin Lee' },
  { id: '3', fullName: 'Carla Mendes' },
  { id: '4', fullName: 'David Kim' },
  { id: '5', fullName: 'Ella Thompson' },
  { id: '6', fullName: 'Frank Zhang' },
  { id: '7', fullName: 'Grace Patel' },
  { id: '8', fullName: 'Hector Alvarez' },
  { id: '9', fullName: 'Isla Morgan' },
  { id: '10', fullName: 'Jack O’Brien' },
  { id: '11', fullName: 'Kara Nguyen' },
  { id: '12', fullName: 'Liam Garcia' },
  { id: '13', fullName: 'Maya Wilson' },
  { id: '14', fullName: 'Noah Schroeder' },
  { id: '15', fullName: 'Olivia Rossi' },
  { id: '16', fullName: 'Peter Blake' },
  { id: '17', fullName: 'Quinn Harper' },
  { id: '18', fullName: 'Ruby Adams' },
  { id: '19', fullName: 'Samuel Cohen' },
  { id: '20', fullName: 'Tara Singh' },
  { id: '21', fullName: 'Umar Richards' },
  { id: '22', fullName: 'Violet Brooks' },
  { id: '23', fullName: 'William Knight' },
  { id: '24', fullName: 'Ximena Lopez' },
  { id: '25', fullName: 'Yara Hussein' },
  { id: '26', fullName: 'Zane Whitman' },
  { id: '27', fullName: 'Amira Becker' },
  { id: '28', fullName: 'Brian Castillo' },
  { id: '29', fullName: 'Cecilia Grant' },
  { id: '30', fullName: 'Diego Navarro' },
]

const ProfileInfo = ({ dateOfBirth, email, fullName, id, countNum }: Props) => {
  return (
    <div className='flex w-full flex-col items-center justify-center gap-2 lg:gap-4'>
      <div className='flex flex-col items-center justify-center gap-2 '>
        <Avatar className='cursor-pointer mx-auto lg:w-[150px] lg:h-[150px] w-[100px] h-[100px]'>
          <AvatarImage src='https://github.com/shadcn.png' alt='@user' />
          <AvatarFallback>US</AvatarFallback>
        </Avatar>
        <Title level={5} className='lg:text-xl'>
          {fullName || 'Nguyễn Văn Vũ'}
        </Title>
      </div>

      <div className='w-fit flex flex-col lg:flex-row items-center justify-between gap-2'>
        {/* Number of followers */}
        <Dialog>
          <DialogTrigger asChild>
            <Text className='cursor-pointer text-center'>{countNum || 100} Followers</Text>
          </DialogTrigger>
          <DialogContent className='px-0 py-0 border-none'>
            <FollowInteractionModal followers={dummyFollowPeopleData} followings={dummyFollowings} />
          </DialogContent>
        </Dialog>
        {/* Edit profile */}
        <EditProfileModal
          id={id || '1'}
          fullName={fullName || 'Nguyễn Văn Vũ'}
          email={email || 'nguyenvanvu@example.com'}
          dateOfBirth={dateOfBirth || new Date('1995-05-20')}
        />
        {/* Follow */}
        <Button
          className='bg-secondary-dark text-white cursor-pointer border border-tertiary-dark 
             hover:[box-shadow:0_0_8px_#ffa000] hover:[text-shadow:0_0_6px_#fff] 
             transition duration-200'
        >
          Follow
          <UserPlus />
        </Button>
      </div>
    </div>
  )
}

export default ProfileInfo
