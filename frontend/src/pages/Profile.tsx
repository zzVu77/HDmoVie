import ProfileInfo from '@/components/ProfileInfo'
import ProfileTabs from '@/components/ProfileTabs'
import Wrapper from '@/components/shared/Wrapper'
const dummyProfileData = {
  id: '1',
  fullName: 'Nguyễn Văn Vũ',
  email: 'nguyenvanvu@example.com',
  dateOfBirth: new Date('1998-05-20'),
  countNum: '1000',
}

const Profile = () => {
  return (
    <div className='lg:px-[200px] pt-20 flex flex-col items-center justify-center '>
      <Wrapper className=' py-5 px-2 '>
        <ProfileInfo
          dateOfBirth={dummyProfileData.dateOfBirth}
          email={dummyProfileData.email}
          fullName={dummyProfileData.fullName}
          id={dummyProfileData.id}
        ></ProfileInfo>
        <ProfileTabs></ProfileTabs>
      </Wrapper>
    </div>
  )
}

export default Profile
