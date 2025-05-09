import ProfileInfo from '@/components/ProfileInfo'
const dummyProfileData = {
  id: '1',
  fullName: 'Nguyễn Văn Vũ',
  email: 'nguyenvanvu@example.com',
  dateOfBirth: new Date('1998-05-20'),
  countNum: '1000',
}
const Profile = () => {
  return (
    <div className='lg:px-[200px] px-5 pt-28 flex flex-col items-center justify-center'>
      <ProfileInfo
        dateOfBirth={dummyProfileData.dateOfBirth}
        email={dummyProfileData.email}
        fullName={dummyProfileData.fullName}
        id={dummyProfileData.id}
      ></ProfileInfo>
    </div>
  )
}

export default Profile
