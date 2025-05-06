import { CastType } from '@/types'
import CastCard from './CastCard'
import { dummyDataCast } from '@/data/dummyData'

type ListCastCardProps = {
  casts?: CastType[]
}

const ListCastCard = ({ casts = dummyDataCast }: ListCastCardProps) => {
  return (
    <div className='flex flex-row flex-wrap items-center justify-center gap-20'>
      {casts.map((cast, index) => (
        <CastCard name={cast.name} profilePath={cast.profilePath} key={index}></CastCard>
      ))}
    </div>
  )
}

export default ListCastCard
