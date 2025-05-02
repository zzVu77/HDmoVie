import FollowInteractionModal from '@/components/FollowInteractionModal'
import { FollowPeopleProps } from '@/types'

const dummyFollowers: FollowPeopleProps[] = []

const dummyFollowings = [
  { id: '4', fullName: 'Diana Prince' },
  { id: '5', fullName: 'Ethan Hunt' },
  { id: '6', fullName: 'Fiona Gallagher' },
  { id: '4', fullName: 'Diana Prince' },
  { id: '5', fullName: 'Ethan Hunt' },
  { id: '6', fullName: 'Fiona Gallagher' },
  { id: '4', fullName: 'Diana Prince' },
  { id: '5', fullName: 'Ethan Hunt' },
  { id: '6', fullName: 'Fiona Gallagher' },
  { id: '4', fullName: 'Diana Prince' },
  { id: '5', fullName: 'Ethan Hunt' },
  { id: '6', fullName: 'Fiona Gallagher' },
  { id: '4', fullName: 'Diana Prince' },
  { id: '5', fullName: 'Ethan Hunt' },
  { id: '6', fullName: 'Fiona Gallagher' },
  { id: '4', fullName: 'Diana Prince' },
  { id: '5', fullName: 'Ethan Hunt' },
  { id: '6', fullName: 'Fiona Gallagher' },
  { id: '4', fullName: 'Diana Prince' },
  { id: '5', fullName: 'Ethan Hunt' },
  { id: '6', fullName: 'Fiona Gallagher' },
  { id: '4', fullName: 'Diana Prince' },
  { id: '5', fullName: 'Ethan Hunt' },
  { id: '6', fullName: 'Fiona Gallagher' },
  { id: '4', fullName: 'Diana Prince' },
  { id: '5', fullName: 'Ethan Hunt' },
  { id: '6', fullName: 'Fiona Gallagher' },
  { id: '4', fullName: 'Diana Prince' },
  { id: '5', fullName: 'Ethan Hunt' },
  { id: '6', fullName: 'Fiona Gallagher' },
]

const TestComponent = () => {
  return (
    <>
      <div>
        <h1>TEST</h1>
      </div>
      <div className='flex items-center justify-center'>
        <FollowInteractionModal followers={dummyFollowers} followings={dummyFollowings} />
      </div>
    </>
  )
}

export default TestComponent
