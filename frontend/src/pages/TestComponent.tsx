import SkeletonPostCard from '@/components/shared/SkeletonPostCard'

const TestComponent = () => {
  return (
    <div className='flex flex-row flex-wrap justify-center items-center gap-4 p-4'>
      <SkeletonPostCard></SkeletonPostCard>
      <SkeletonPostCard></SkeletonPostCard>
      <SkeletonPostCard></SkeletonPostCard>
      <SkeletonPostCard></SkeletonPostCard>
      <SkeletonPostCard></SkeletonPostCard>
      <SkeletonPostCard></SkeletonPostCard>
      <SkeletonPostCard></SkeletonPostCard>
      <SkeletonPostCard></SkeletonPostCard>
      <SkeletonPostCard></SkeletonPostCard>
    </div>
  )
}

export default TestComponent
