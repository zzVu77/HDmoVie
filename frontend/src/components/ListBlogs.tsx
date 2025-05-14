import { useState, useEffect } from 'react'
import BlogCard from './BlogCard'
import { Text } from './ui/typography'
import { Loader2 } from 'lucide-react'
import { BlogPost } from '@/types'
import BlogService from '@/services/BlogService'

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
        if (!Array.isArray(response.data)) {
          throw new Error('Invalid response format from server')
        }
        setBlogs(response.data)
      } catch (err: unknown) {
        setError((err as Error).message)
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
      <div className='flex justify-center items-center py-10'>
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
