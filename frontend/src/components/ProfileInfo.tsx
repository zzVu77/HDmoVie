import { UserPlus } from 'lucide-react'
import { EditProfileModal } from './EditProfileModal'
import FollowInteractionModal from './FollowInteractionModal'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { Text, Title } from './ui/typography'
import { getFollowInteraction, FollowInteractionResponse } from '@/services/profileService'
import { useEffect, useState } from 'react'
import { followUser, unFollowUser } from '@/services/followInteractionService'
import { toast } from 'sonner'

type Props = {
  id?: string
  fullName?: string
  email?: string
  dateOfBirth?: Date
  isOwner?: boolean
  isFollowingProp?: boolean
  followersCount?: number
}

const ProfileInfo = ({ dateOfBirth, email, fullName, id, isOwner, isFollowingProp, followersCount }: Props) => {
  // HANDLE FOLLOW INTERACTION OPEN
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  // =================================
  //          Fetching data
  // =================================
  const [followInteraction, setFollowInteraction] = useState<FollowInteractionResponse>()
  const [isProfileLoading, setIsProfileLoading] = useState<boolean>(true)
  const [errorProfile, setErrorProfile] = useState<string | null>(null)
  const [isFollowing, setIsFollowing] = useState<boolean>(isFollowingProp || false)

  useEffect(() => {
    // Function to fetch data
    const fetchFollowInteraction = async () => {
      try {
        const data = await getFollowInteraction(id)
        await setFollowInteraction(data)
      } catch (error) {
        setErrorProfile(error instanceof Error ? error.message : 'Error when fetching follow interaction')
      } finally {
        setIsProfileLoading(false)
      }
    }
    fetchFollowInteraction()
  }, [id, isOwner])

  const handleFollowClick = async () => {
    try {
      setIsFollowing(!isFollowing)

      if (isFollowing) {
        await unFollowUser(id)
        toast.success('Unfollowed')
      } else {
        await followUser(id)
        toast.success('Followed')
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'System error')
      await new Promise((res) => setTimeout(res, 1500))
      reload()
    }
  }

  const reload = () => {
    window.location.reload()
  }

  return (
    <div className='flex w-full flex-col items-center justify-center gap-2 lg:gap-4'>
      <div className='flex flex-col items-center justify-center gap-2 '>
        <Avatar className='cursor-pointer mx-auto lg:w-[150px] lg:h-[150px] w-[100px] h-[100px]'>
          <AvatarImage src='https://github.com/shadcn.png' alt='@user' />
          <AvatarFallback>{fullName?.[0] || 'U'}</AvatarFallback>
        </Avatar>
        <Title level={5} className='lg:text-xl'>
          {fullName || 'Unknown'}
        </Title>
      </div>

      <div className='w-fit flex flex-col lg:flex-row items-center justify-between gap-2'>
        {/* Number of followers */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild disabled={isProfileLoading || !!errorProfile || !followInteraction}>
            <Text className='cursor-pointer text-center'>
              {isProfileLoading ? 'Loading...' : errorProfile ? 'Error' : (followersCount ?? 'NaN')} Followers
            </Text>
          </DialogTrigger>

          <DialogContent className='px-0 py-0 border-none w-full min-w-[300px] max-w-lg'>
            {isProfileLoading ? (
              <div className='p-6 text-center text-white bg-secondary-dark rounded-lg'>Loading followers...</div>
            ) : errorProfile ? (
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
            updateProfileCallBack={reload}
          />
        )}

        {/* Follow */}
        {!isOwner && (
          <Button
            className={`${isFollowing ? 'bg-secondary-dark text-white' : 'bg-white text-primary-dark '} cursor-pointer border border-tertiary-dark hover:[box-shadow:0_0_4px_#ffffff] hover:[text-shadow:0_0_6px_#fff] transition duration-200`}
            onClick={handleFollowClick}
          >
            {isFollowing ? 'Unfollow' : 'Follow'}
            <UserPlus />
          </Button>
        )}
      </div>
    </div>
  )
}

export default ProfileInfo
