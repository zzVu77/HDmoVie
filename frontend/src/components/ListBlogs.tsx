import { useState, useEffect } from 'react'
import BlogCard from './BlogCard'
import BlogService, { BlogPost } from '@/services/blogService'
import { Text } from './ui/typography'
import { Loader2 } from 'lucide-react'

interface ListBlogsProps {
  blogs?: BlogPost[]
}

const ListBlogs = ({ blogs: propBlogs }: ListBlogsProps) => {
  const [blogs, setBlogs] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // If blogs are provided as props, use them directly
    if (propBlogs) {
      setBlogs(propBlogs)
      setLoading(false)
      return
    }

    // Otherwise fetch blogs from API
    const fetchBlogs = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await BlogService.getAllBlogs()
        if (response.data?.data) {
          setBlogs(response.data.data)
        } else {
          setError('Invalid response format from server')
          setBlogs([])
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Error fetching blogs:', err)
        setError('Failed to load blogs. Please try again later.')
        setBlogs([])
      } finally {
        setLoading(false)
      }
    }

    fetchBlogs()
  }, [propBlogs])

  if (loading) {
    return (
      <div className='flex justify-center items-center py-12'>
        <Loader2 className='h-8 w-8 text-primary-yellow animate-spin' />
      </div>
    )
  }

  if (error) {
    return (
      <div className='flex justify-center items-center py-12'>
        <Text className='text-red-400'>{error}</Text>
      </div>
    )
  }

  if (blogs.length === 0) {
    return (
      <div className='flex justify-center items-center py-12'>
        <Text className='text-muted-foreground'>No blogs found</Text>
      </div>
    )
  }

  return (
    <div className='flex flex-col items-center justify-center w-full'>
      {blogs.map((blog, index) => (
        <BlogCard
          key={blog.id}
          blog={blog}
          isFirst={index === 0}
          isLast={index === blogs.length - 1}
          isShowCommentDivider={false}
        />
      ))}
    </div>
  )
}

export default ListBlogs
