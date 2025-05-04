import { RegisteredUserType, TagType } from '@/types/index'
import { BlogPostComponentProps } from '@/components/BlogCard'
import BlogCard from '@/components/BlogCard'
import { Text } from '@/components/ui/typography'
import CommentSection from '@/components/CommentSection'

const sampleUsers: RegisteredUserType[] = [
  {
    id: 'user-1',
    name: 'helenscchin',
  },
  {
    id: 'user-2',
    name: 'crisula_barbata',
  },
  {
    id: 'user-3',
    name: 'perthudefood',
  },
  {
    id: 'user-4',
    name: 'foodie_lover',
  },
  {
    id: 'user-5',
    name: 'chef_marcus',
  },
  {
    id: 'current-user',
    name: 'current_user',
  },
]

const sampleTags: TagType[] = [
  { id: 'tag-1', name: 'Dish' },
  { id: 'tag-2', name: 'Lifestyle' },
  { id: 'tag-3', name: 'Famous Arabic Foods' },
  { id: 'tag-4', name: 'Travel' },
  { id: 'tag-5', name: 'Recipe' },
]

const sampleBlogs = [
  {
    id: 'blog-1',
    content:
      'Exploring the best dishes from around the world. From the spicy curries of India to the delicate sushi of Japan, this blog dives into the rich and diverse culinary traditions that make each culture unique. Join us as we embark on a flavorful journey to discover the stories behind these iconic dishes and the people who create them.',
    dateCreated: '2025-05-01',
    owner: sampleUsers[0],
    tags: [sampleTags[0], sampleTags[3]],
    images: [
      'https://fastly.picsum.photos/id/866/536/354.jpg?hmac=tGofDTV7tl2rprappPzKFiZ9vDh5MKj39oa2D--gqhA',
      'https://fastly.picsum.photos/id/866/536/354.jpg?hmac=tGofDTV7tl2rprappPzKFiZ9vDh5MKj39oa2D--gqhA',
    ],
  },
  {
    id: 'blog-2',
    content:
      'Lifestyle tips for a healthier and happier life. In this blog, we share practical advice on how to maintain a balanced lifestyle, including tips on nutrition, exercise, mindfulness, and self-care. Whether you are looking to improve your physical health or find inner peace, these tips are designed to help you live your best life.',
    dateCreated: '2025-04-28',
    owner: sampleUsers[1],
    tags: [sampleTags[1]],
    images: ['https://fastly.picsum.photos/id/866/536/354.jpg?hmac=tGofDTV7tl2rprappPzKFiZ9vDh5MKj39oa2D--gqhA'],
  },
  {
    id: 'blog-3',
    content:
      'Discovering famous Arabic foods and their recipes. Arabic cuisine is known for its rich flavors and aromatic spices. In this blog, we explore the history and cultural significance of dishes like hummus, falafel, and shawarma. Learn how to prepare these traditional recipes at home and bring the taste of the Middle East to your kitchen.',
    dateCreated: '2025-04-25',
    owner: sampleUsers[2],
    tags: [sampleTags[2], sampleTags[4]],
    images: [
      'https://fastly.picsum.photos/id/866/536/354.jpg?hmac=tGofDTV7tl2rprappPzKFiZ9vDh5MKj39oa2D--gqhA',
      'https://fastly.picsum.photos/id/866/536/354.jpg?hmac=tGofDTV7tl2rprappPzKFiZ9vDh5MKj39oa2D--gqhA',
    ],
  },
  {
    id: 'blog-4',
    content:
      'Top travel destinations for food lovers. If you are a foodie with a passion for travel, this blog is for you. Discover the best destinations around the world where you can indulge in local cuisines, visit bustling food markets, and experience culinary traditions firsthand. From Italy to Thailand, these destinations are a paradise for food enthusiasts.',
    dateCreated: '2025-04-20',
    owner: sampleUsers[3],
    tags: [sampleTags[3], sampleTags[0]],
    images: ['https://fastly.picsum.photos/id/866/536/354.jpg?hmac=tGofDTV7tl2rprappPzKFiZ9vDh5MKj39oa2D--gqhA'],
  },
  {
    id: 'blog-5',
    content:
      'Chef Marcus shares his secret recipes. Renowned chef Marcus invites you into his kitchen to reveal the secrets behind his most popular dishes. From gourmet appetizers to decadent desserts, these recipes are sure to impress your family and friends. Follow along as Chef Marcus provides step-by-step instructions and tips for perfecting each dish.',
    dateCreated: '2025-04-15',
    owner: sampleUsers[4],
    tags: [sampleTags[4]],
    images: [
      'https://fastly.picsum.photos/id/866/536/354.jpg?hmac=tGofDTV7tl2rprappPzKFiZ9vDh5MKj39oa2D--gqhA',
      'https://fastly.picsum.photos/id/866/536/354.jpg?hmac=tGofDTV7tl2rprappPzKFiZ9vDh5MKj39oa2D--gqhA',
    ],
  },
]

const blogPosts: BlogPostComponentProps[] = sampleBlogs.map((blog, index) => ({
  id: blog.id,
  content: blog.content,
  dateCreated: new Date(blog.dateCreated),
  owner: blog.owner,
  tags: blog.tags,
  likes: Math.floor(Math.random() * 100),
  comments: Math.floor(Math.random() * 50),
  images: blog.images,
  showFooterBorder: true,
  isFirst: index === 0,
  isLast: index === sampleBlogs.length - 1,
}))

const TestComponent = () => {
  return (
    <>
      <div>
        {blogPosts.map((post, index) => (
          <BlogCard
            key={post.id}
            id={post.id}
            content={post.content}
            dateCreated={post.dateCreated}
            owner={post.owner}
            tags={post.tags}
            likes={post.likes}
            comments={post.comments}
            images={post.images}
            isFirst={index === 0}
            isLast={index === blogPosts.length - 1}
            isShowCommentDivider={false}
          />
        ))}
      </div>

      <h1 className='text-white w-full text-center'>BLOG DETAIL</h1>
      {/*BLOG DETAIL SECTION*/}
      <div className='flex flex-col p-0 bg-secondary-dark rounded-3xl overflow-hidden'>
        <BlogCard
          id='blog-1'
          content='Exploring the best dishes from around the world. From the spicy curries of India to the delicate sushi of Japan, this blog dives into the rich and diverse culinary traditions that make each culture unique. Join us as we embark on a flavorful journey to discover the stories behind these iconic dishes and the people who create them.'
          dateCreated={new Date('2025-05-01')}
          owner={sampleUsers[0]}
          tags={[sampleTags[0], sampleTags[3]]}
          likes={Math.floor(Math.random() * 100)}
          comments={Math.floor(Math.random() * 50)}
          images={[
            'https://fastly.picsum.photos.photos/id/866/536/354.jpg?hmac=tGofDTV7tl2rprappPzKFiZ9vDh5MKj39oa2D--gqhA',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3bKXtNBpnM9jpz9tsxgjmmItf4NmP7DC-vQ&s',
          ]}
          isFirst={true}
          isLast={false}
          isShowCommentDivider={true}
        />
        <Text body={4} className='text-bolded text-white pt-3 pb-1 px-6'>
          Replies
        </Text>
        <CommentSection />
      </div>
    </>
  )
}

export default TestComponent
