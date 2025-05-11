import { useState, useEffect } from 'react'
import BlogCard from '@/components/BlogCard'
import CommentSection from '@/components/CommentSection'
import Wrapper from '@/components/shared/Wrapper'
import { Text } from '@/components/ui/typography'
import { useParams } from 'react-router-dom'
import BlogService, { BlogPost } from '@/services/blogService'
import { Loader2 } from 'lucide-react'

const BlogDetail = () => {
  const { id } = useParams<{ id: string }>()
  const [blog, setBlog] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBlog = async () => {
      if (!id) return

      setLoading(true)
      setError(null)

      try {
        const response = await BlogService.getBlogById(id)
        if (response.data?.data) {
          setBlog(response.data.data)
        } else {
          setError('Invalid response format from server')
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Error fetching blog:', err instanceof Error ? err.message : 'Unknown error')
        setError('Failed to load blog')
      } finally {
        setLoading(false)
      }
    }

    fetchBlog()
  }, [id])

  if (loading) {
    return (
      <Wrapper className='lg:px-[200px] px-5 pt-28 flex flex-col items-center justify-center'>
        <Loader2 className='h-8 w-8 text-primary-yellow animate-spin' />
      </Wrapper>
    )
  }

  if (error || !blog) {
    return (
      <Wrapper className='lg:px-[200px] px-5 pt-28 flex flex-col items-center justify-center'>
        <Text className='text-red-400'>{error || 'Blog not found'}</Text>
      </Wrapper>
    )
  }

  return (
    <Wrapper className='lg:px-[200px] px-5 pt-28 flex flex-col bg-secondary-dark rounded-3xl overflow-hidden'>
      <BlogCard blog={blog} isFirst={true} isShowCommentDivider={true} isDetailView={true} />
      <Text body={4} className='text-bolded text-white pt-3 pb-1 px-6'>
        Replies
      </Text>
      <CommentSection blogId={blog.id} />
    </Wrapper>
  )
}

export default BlogDetail
