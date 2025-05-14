import { UserPlus } from 'lucide-react'
import { EditProfileModal } from './EditProfileModal'
import FollowInteractionModal from './FollowInteractionModal'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { Text, Title } from './ui/typography'
import { getFollowInteraction, FollowInteractionResponse } from '@/services/profileService'
import { useEffect, useState } from 'react'

type Props = {
  id?: string
  fullName?: string
  email?: string
  dateOfBirth?: Date
  isOwner?: boolean
  followersCount?: number
}

const ProfileInfo = ({ dateOfBirth, email, fullName, id, isOwner, followersCount }: Props) => {
  const [followInteraction, setFollowInteraction] = useState<FollowInteractionResponse>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Function to fetch data
    const fetchFollowInteraction = async () => {
      try {
        const data = await getFollowInteraction(id)
        await setFollowInteraction(data)
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Error when fetching follow interaction')
      } finally {
        setIsLoading(false)
      }
    }
    fetchFollowInteraction()
  }, [id])

  const handleCallBack = () => {
    window.location.reload()
  }

  return (
    <div className='flex w-full flex-col items-center justify-center gap-2 lg:gap-4'>
      <div className='flex flex-col items-center justify-center gap-2 '>
        <Avatar className='cursor-pointer mx-auto lg:w-[150px] lg:h-[150px] w-[100px] h-[100px]'>
          <AvatarImage src='https://github.com/shadcn.png' alt='@user' />
          <AvatarFallback>US</AvatarFallback>
        </Avatar>
        <Title level={5} className='lg:text-xl'>
          {fullName || 'Unknown'}
        </Title>
      </div>

      <div className='w-fit flex flex-col lg:flex-row items-center justify-between gap-2'>
        {/* Number of followers */}
        <Dialog>
          <DialogTrigger asChild disabled={isLoading || !!error || !followInteraction}>
            <Text className='cursor-pointer text-center'>
              {isLoading ? 'Loading...' : error ? 'Error' : (followersCount ?? 'NaN')} Followers
            </Text>
          </DialogTrigger>

          <DialogContent className='px-0 py-0 border-none w-full min-w-[300px] max-w-lg'>
            {isLoading ? (
              <div className='p-6 text-center text-white bg-secondary-dark rounded-lg'>Loading followers...</div>
            ) : error ? (
              <div className='p-6 text-center text-white bg-secondary-dark rounded-lg'>Failed to load data</div>
            ) : !followInteraction ? (
              <div className='p-6 text-center text-white bg-secondary-dark rounded-lg'>No data available</div>
            ) : (
              <FollowInteractionModal
                followers={followInteraction.followers}
                followings={followInteraction.following}
              />
            )}
          </DialogContent>
        </Dialog>

        {/* Edit profile */}
        {isOwner && (
          <EditProfileModal
            id={id || '1'}
            fullName={fullName || 'Unknow'}
            email={email || 'unknown@user.com'}
            dateOfBirth={dateOfBirth instanceof Date ? dateOfBirth : new Date('1995-05-20')}
            updateProfileCallBack={handleCallBack}
          />
        )}

        {/* Follow */}
        {!isOwner && (
          <Button
            className='bg-secondary-dark text-white cursor-pointer border border-tertiary-dark 
             hover:[box-shadow:0_0_8px_#ffa000] hover:[text-shadow:0_0_6px_#fff] 
             transition duration-200'
          >
            Follow
            <UserPlus />
          </Button>
        )}
      </div>
    </div>
  )
}

export default ProfileInfo
