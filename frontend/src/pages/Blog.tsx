import BlogList from '@/components/BlogList'
import { Title, Text } from '@/components/ui/typography'
import { BlogPostProps, RegisteredUser, Tag, Blog } from '@/components/BlogCard'
import { useState, useEffect } from 'react'

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
  images: blog.images, // Add images to the blog post props
}))

const BlogPage = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [posts, setPosts] = useState<BlogPostProps[]>([])

  useEffect(() => {
    setIsLoading(true)

    setTimeout(() => {
      setPosts(blogPosts)
      setIsLoading(false)
    }, 500)

    // fetch('/api/blogs')
    //   .then(response => response.json())
    //   .then(data => {
    //     setPosts(data)
    //     setIsLoading(false)
    //   })
    //   .catch(error => {
    //     console.error('Error fetching posts:', error)
    //     setIsLoading(false)
    //   })
  }, [])

  return (
    <div className='min-h-screen bg-zinc-950 text-white'>
      <div className='container mx-auto py-8 px-4'>
        <header className='mb-8 text-center'>
          <Title level={2} className='mb-2'>
            Our Blog
          </Title>
          <Text className='text-muted-foreground max-w-md mx-auto'>
            Discover the latest trends, recipes, and lifestyle tips from our community.
          </Text>
        </header>
        <div className='grid grid-cols-1 gap-6'>
          {isLoading ? (
            <div className='text-center py-8'>
              <Text className='text-muted-foreground'>Loading posts...</Text>
            </div>
          ) : posts.length > 0 ? (
            <BlogList posts={posts} />
          ) : (
            <div className='text-center py-8'>
              <Text className='text-muted-foreground'>No posts available.</Text>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default BlogPage
