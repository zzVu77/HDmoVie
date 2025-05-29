import { Skeleton } from '@/components/ui/skeleton'

export default function MovieSkeleton() {
  return (
    <div className='flex flex-col items-center justify-center bg-black rounded-xl p-4 w-[250px] space-y-4'>
      {/* Poster */}
      <Skeleton className='h-[370px] w-full rounded-xl' />

      {/* Title */}
      <Skeleton className='h-6 w-3/4 mx-auto' />

      {/* Release Date & Rating */}
      <div className='flex justify-between gap-2 items-center px-2'>
        <Skeleton className='h-4 w-20' />
        <Skeleton className='h-4 w-10' />
      </div>

      {/* Tags */}
      <div className='flex gap-2 justify-between'>
        <Skeleton className='h-6 w-14 rounded-full' />
        <Skeleton className='h-6 w-14 rounded-full' />
        <Skeleton className='h-6 w-14 rounded-full' />
      </div>

      {/* Button */}
      <Skeleton className='h-10 w-full rounded-full' />
    </div>
  )
}
