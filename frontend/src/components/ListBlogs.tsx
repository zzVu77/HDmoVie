import { useState, useEffect } from 'react'
import BlogCard from './BlogCard'
import BlogService from '@/services/blogService'
import { Text } from './ui/typography'
import { Loader2 } from 'lucide-react'

const ListBlogs = () => {
  const [blogIds, setBlogIds] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await BlogService.getAllBlogs()
        if (response.data?.data) {
          setBlogIds(response.data.data.map((blog) => blog.id))
        } else {
          setError('Invalid response format from server')
          setBlogIds([])
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Error fetching blogs:', err)
        setError('Failed to load blogs. Please try again later.')
        setBlogIds([])
      } finally {
        setLoading(false)
      }
    }

    fetchBlogs()
  }, [])

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

  if (blogIds.length === 0) {
    return (
      <div className='flex justify-center items-center py-12'>
        <Text className='text-muted-foreground'>No blogs found</Text>
      </div>
    )
  }

  return (
    <div className='flex flex-col items-center justify-center w-full'>
      {blogIds.map((id, index) => (
        <BlogCard
          key={id}
          id={id}
          isFirst={index === 0}
          isLast={index === blogIds.length - 1}
          isShowCommentDivider={false}
        />
      ))}
    </div>
  )
}

export default ListBlogs
