import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { Text } from '../components/ui/typography'
import CommentSection from '../components/BlogCommentList'
import BlogPost from '../components/BlogCard'
import { BlogPostProps, RegisteredUser, Tag, Blog } from '../components/BlogCard'

// Sample users data (matching Blog.tsx)
const sampleUsers: RegisteredUser[] = [
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

// Sample tags data (matching Blog.tsx)
const sampleTags: Tag[] = [
  { id: 'tag-1', name: 'Dish' },
  { id: 'tag-2', name: 'Lifestyle' },
  { id: 'tag-3', name: 'Famous Arabic Foods' },
  { id: 'tag-4', name: 'Travel' },
  { id: 'tag-5', name: 'Recipe' },
]

const sampleBlogs: Blog[] = [
  {
    id: '1',
    content:
      'A perfect Sunday dinner with roasted lamb and seasonal vegetables. The secret is marinating the lamb overnight with fresh herbs and garlic. A perfect Sunday dinner with roasted lamb and seasonal vegetables. The secret is marinating the lamb overnight with fresh herbs and garlic. A perfect Sunday dinner with roasted lamb and seasonal vegetables. The secret is marinating the lamb overnight with fresh herbs and garlic. A perfect Sunday dinner with roasted lamb and seasonal vegetables. The secret is marinating the lamb overnight with fresh herbs and garlic. A perfect Sunday dinner with roasted lamb and seasonal vegetables. The secret is marinating the lamb overnight with fresh herbs and garlic. A perfect Sunday dinner with roasted lamb and seasonal vegetables. The secret is marinating the lamb overnight with fresh herbs and garlic. A perfect Sunday dinner with roasted lamb and seasonal vegetables. The secret is marinating the lamb overnight with fresh herbs and garlic',
    dateCreated: new Date('2025-05-01T10:00:00Z'),
    owner: sampleUsers[0], // helenscchin
    tags: [sampleTags[0], sampleTags[4]], // Dish, Recipe
    images: [
      'https://images.unsplash.com/photo-1588767768106-1b20e51d9d68',
      'https://images.unsplash.com/photo-1588767768106-1b20e51d9d68',
    ],
  },
  {
    id: '2',
    content:
      "Everything you need for a perfect day at the beach this summer. Don't forget sunscreen, a good book, and plenty of water!",
    dateCreated: new Date('2025-05-01T12:00:00Z'),
    owner: sampleUsers[1],
    tags: [sampleTags[1], sampleTags[3]],
    images: [],
  },
  {
    id: '3',
    content:
      "Exploring the best pies in town! I visited five different bakeries and here are my honest reviews. The apple pie at Baker's Corner was absolutely divine!",
    dateCreated: new Date('2025-05-01T14:00:00Z'),
    owner: sampleUsers[2],
    tags: [sampleTags[0], sampleTags[2]],
    images: [
      'https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81',
      'https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81',
    ],
  },
]

const blogPosts: BlogPostProps[] = sampleBlogs.map((blog) => ({
  id: blog.id,
  content: blog.content,
  dateCreated: blog.dateCreated.toISOString(),
  owner: {
    name: blog.owner.name,
  },
  tags: blog.tags.map((tag) => ({
    id: tag.id,
    name: tag.name,
  })),
  likes: Math.floor(Math.random() * 100),
  comments: Math.floor(Math.random() * 50),
  images: blog.images,
}))

const BlogDetail = () => {
  const { blogId } = useParams<{ blogId: string }>()
  const [post, setPost] = useState<BlogPostProps | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    setTimeout(() => {
      const foundPost = blogPosts.find((post) => post.id === blogId)
      if (foundPost) {
        setPost(foundPost)
      }
      setIsLoading(false)
    }, 500)
  }, [blogId])

  if (isLoading) {
    return (
      <div className='min-h-screen bg-zinc-950 text-white'>
        <div className='container mx-auto py-8 px-4'>
          <div className='w-full'>
            <Text className='text-center'>Loading blog details...</Text>
          </div>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className='min-h-screen bg-zinc-950 text-white'>
        <div className='container mx-auto py-8 px-4'>
          <div className='w-full'>
            <Text className='text-center'>Blog post not found</Text>
            <div className='mt-4 text-center'>
              <Link to='/blog'>
                <Button variant='outline' className='flex items-center gap-2'>
                  <ArrowLeft size={16} />
                  <Text>Back to blogs</Text>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-zinc-950 text-white'>
      <div className='container mx-auto py-8 px-4'>
        <div className='w-full'>
          <div className='mb-6'>
            <Link to='/blog'>
              <Button
                variant='ghost'
                className='flex items-center gap-2 mb-4 text-primary-yellow hover:text-yellow-300 hover:bg-zinc-700'
              >
                <ArrowLeft size={16} />
                <Text>Back to blogs</Text>
              </Button>
            </Link>
          </div>
          <BlogPost post={post} className='bg-tertiary-dark' showFooterBorder={true} isFirst={true} isLast={false} />
          {/* Comments Section */}
          <Card className='bg-tertiary-dark border border-zinc-700 rounded-t-none rounded-b-md'>
            <div className='p-4'>
              {/* <CommentSection blogId={post.id} /> */}
              <CommentSection />
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default BlogDetail
