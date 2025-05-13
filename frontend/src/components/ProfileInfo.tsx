import { UserPlus } from 'lucide-react'
import { EditProfileModal } from './EditProfileModal'
import FollowInteractionModal from './FollowInteractionModal'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { Text, Title } from './ui/typography'
import Wrapper from './shared/Wrapper'
import { getFollowInteraction, FollowInteractionResponse } from '@/services/profileService'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

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

  // Initial UI, loading content from BE
  if (isLoading) {
    return (
      <Wrapper className='mt-[100px]'>
        <p className='text-center'>Loading...</p>
      </Wrapper>
    )
  }

  // In case error => this scene UI
  if (error) {
    return (
      <Wrapper className='mt-[100px] flex flex-col items-center justify-center'>
        <p className='text-red-500 text-center'>{error}</p>
        <Link to={`/`}>
          <Button
            type='button'
            className={
              'bg-primary-yellow text-tertiary-dark font-semibold shadow-white-glow-down  gap-2 lg:text-lg p-3 flex'
            }
          >
            Back to Home
          </Button>
        </Link>
      </Wrapper>
    )
  }

  // In case profile not found
  if (!followInteraction) {
    return (
      <Wrapper className='mt-[100px]'>
        <p className='text-center'>User not found</p>
      </Wrapper>
    )
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
          <DialogTrigger asChild>
            <Text className='cursor-pointer text-center'>{followersCount || 'NaN'} Followers</Text>
          </DialogTrigger>
          <DialogContent className='px-0 py-0 border-none w-fit min-w-lg'>
            <FollowInteractionModal
              followers={followInteraction.followers ?? []}
              followings={followInteraction.following ?? []}
            />
          </DialogContent>
        </Dialog>

        {/* Edit profile */}
        {isOwner && (
          <EditProfileModal
            id={id || '1'}
            fullName={fullName || 'Unknow'}
            email={email || 'unknown@user.com'}
            dateOfBirth={dateOfBirth instanceof Date ? dateOfBirth : new Date('1995-05-20')}
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
