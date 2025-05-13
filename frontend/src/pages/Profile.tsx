import ProfileInfo from '@/components/ProfileInfo'
import ProfileTabs from '@/components/ProfileTabs'
import Wrapper from '@/components/shared/Wrapper'
import { Button } from '@/components/ui/button'
import { getProfile, ProfileResponse } from '@/services/profileService'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'

const Profile = () => {
  const { id } = useParams<{ id: string }>()
  const [profile, setProfile] = useState<ProfileResponse>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Function to fetch data
    const fetchProfile = async () => {
      try {
        const data = await getProfile(id)
        // Parse date of birth
        if (data.user.dateOfBirth) {
          data.user.dateOfBirth = new Date(data.user.dateOfBirth)
        } else {
          data.user.dateOfBirth = new Date('1995-05-20') // fallback
        }
        setProfile(data)
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Error when fetching profile')
      } finally {
        setIsLoading(false)
      }
    }
    fetchProfile()
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
  if (!profile) {
    return (
      <Wrapper className='mt-[100px]'>
        <p className='text-center'>User not found</p>
      </Wrapper>
    )
  }

  // Profile page
  return (
    <div className='lg:px-[200px] pt-20 flex flex-col items-center justify-center '>
      <Wrapper className=' py-5 px-2 '>
        <ProfileInfo
          dateOfBirth={profile.user.dateOfBirth}
          email={profile.user.email}
          fullName={profile.user.fullName}
          id={profile.user.id}
          followersCount={profile.followersCount}
          isOwner={profile.isOwner}
        ></ProfileInfo>
        <ProfileTabs
          userId={profile.user.id}
          userFullName={profile.user.fullName}
          isOwner={profile.isOwner}
        ></ProfileTabs>
      </Wrapper>
    </div>
  )
}

export default Profile
