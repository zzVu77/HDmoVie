import FollowInteractionModal from '@/components/FollowInteractionModal'
import { FollowPeopleProps } from '@/types'

const dummyFollowers: FollowPeopleProps[] = []

const dummyFollowings = [
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
