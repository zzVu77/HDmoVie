import BlogCard from '@/components/BlogCard'
import CommentSection from '@/components/CommentSection'
import Wrapper from '@/components/shared/Wrapper'
import { Text } from '@/components/ui/typography'
import { useParams } from 'react-router-dom'

const BlogDetail = () => {
  const { id } = useParams<{ id: string }>()

  return (
    <Wrapper className='lg:px-[200px] px-5 pt-28 flex flex-col bg-secondary-dark rounded-3xl overflow-hidden'>
      <BlogCard id={id || '1'} isFirst={true} isShowCommentDivider={true} isDetailView={true} />
      <Text body={4} className='text-bolded text-white pt-3 pb-1 px-6'>
        Replies
      </Text>
      <CommentSection blogId={id || '1'} />
    </Wrapper>
  )
}

export default BlogDetail
