import { Cast } from '@/types'
import CastCard from './CastCard'

type ListCastCardProps = {
  casts?: Cast[]
}
const dummyData: Cast[] = [
  {
    id: '1',
    name: 'John Doe',
    profilePath: 'https://image.tmdb.org/t/p/original/a4dRvxh2csK8pnMVz5Xrh8MrE8X.jpg',
  },
  {
    id: '2',
    name: 'Jane Smith',
    profilePath: 'https://image.tmdb.org/t/p/original/a4dRvxh2csK8pnMVz5Xrh8MrE8X.jpg',
  },
  {
    id: '3',
    name: 'Alice Johnson',
    profilePath: 'https://image.tmdb.org/t/p/original/a4dRvxh2csK8pnMVz5Xrh8MrE8X.jpg',
  },
]
const ListCastCard = ({ casts = dummyData }: ListCastCardProps) => {
  return (
    <div className='flex  flex-row flex-wrap items-center justify-around gap-10'>
      {casts.map((cast, index) => (
        <CastCard name={cast.name} profilePath={cast.profilePath} key={index}></CastCard>
      ))}
    </div>
  )
}

export default ListCastCard
