import BlogCard, { BlogPostComponentProps } from '@/components/BlogCard'
import CommentSection from '@/components/CommentSection'
import Wrapper from '@/components/shared/Wrapper'
import { Text } from '@/components/ui/typography'
const dummyTags = [
  { id: '1', name: 'Movie Review' },
  { id: '2', name: 'Action' },
  { id: '3', name: 'Drama' },
  { id: '4', name: 'Comedy' },
] as const

// Sample users
const dummyUsers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
  },
] as const

// Sample blog posts
export const dummyBlogPosts: BlogPostComponentProps = {
  id: '1',
  content:
    'Just watched the new Avengers movie! The special effects were amazing and the story kept me on the edge of my seat the whole time. Definitely recommend watching it in IMAX if you can!',
  dateCreated: new Date('2024-05-07T10:30:00'),
  owner: dummyUsers[0],
  tags: [dummyTags[0], dummyTags[1]],
  likes: 42,
  comments: 12,
  images: ['https://example.com/movie-poster1.jpg', 'https://example.com/movie-scene1.jpg'],
  isFirst: true,
  isShowCommentDivider: true,
}

const BlogDetail = () => {
  return (
    <Wrapper className='lg:px-[200px] px-5 pt-28 flex flex-col bg-secondary-dark rounded-3xl overflow-hidden'>
      <BlogCard
        id={dummyBlogPosts.id}
        content={dummyBlogPosts.content}
        dateCreated={dummyBlogPosts.dateCreated}
        owner={dummyBlogPosts.owner}
        tags={dummyBlogPosts.tags}
        likes={dummyBlogPosts.likes}
        comments={dummyBlogPosts.comments}
        images={dummyBlogPosts.images}
        isFirst={dummyBlogPosts.isFirst}
        isShowCommentDivider={dummyBlogPosts.isShowCommentDivider}
      />
      <Text body={4} className='text-bolded text-white pt-3 pb-1 px-6'>
        Replies
      </Text>
      <CommentSection />
    </Wrapper>
  )
}

export default BlogDetail
