import { Skeleton } from '@/components/ui/skeleton'

export default function SkeletonPostCard() {
  return (
    <div className='bg-[#121212] rounded-lg p-4 w-full max-w-2xl space-y-3 border border-[#222]'>
      {/* Header: Avatar + Name + Date */}
      <div className='flex items-center gap-3'>
        <Skeleton className='h-10 w-10 rounded-full' />
        <div className='flex flex-col space-y-1'>
          <Skeleton className='h-4 w-24' />
          <Skeleton className='h-3 w-40' />
        </div>
      </div>

      {/* Post Content */}
      <Skeleton className='h-4 w-3/4' />

      {/* Tag */}
      <Skeleton className='h-6 w-20 rounded-full' />

      {/* Footer: Icons */}
      <div className='flex gap-6 pt-2'>
        <Skeleton className='h-4 w-5' />
        <Skeleton className='h-4 w-5' />
        <Skeleton className='h-4 w-5' />
      </div>
    </div>
  )
}
