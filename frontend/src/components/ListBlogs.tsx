import BlogService from '@/services/BlogService'
import { BlogPost, MovieType } from '@/types'
import { useEffect, useState } from 'react'
import BlogCard from './BlogCard'
import SearchBar from './shared/SearchBar'
import SkeletonPostCard from './shared/SkeletonPostCard'
import Wrapper from './shared/Wrapper'
import { Text } from './ui/typography'

interface ListBlogsProps {
  userId?: string
  blogs?: BlogPost[]
  showSearchBar?: boolean
}

const ListBlogs = ({ userId, blogs: propBlogs, showSearchBar = false }: ListBlogsProps) => {
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

  const handleSearch = (searchResults: string | MovieType[] | BlogPost[]) => {
    try {
      if (Array.isArray(searchResults) && searchResults.length > 0 && 'content' in searchResults[0]) {
        setBlogs(searchResults as BlogPost[])
        setError(null)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error searching blogs')
    }
  }

  if (loading) {
    return (
      <Wrapper>
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
      </Wrapper>
    )
  }

  if (error) {
    return (
      <div className='flex justify-center items-center py-12'>
        <Text className='text-red-400'>{error}</Text>
      </div>
    )
  }

  return (
    <div className='flex flex-col items-center justify-center w-full'>
      {showSearchBar && (
        <div className='w-full mb-6'>
          <SearchBar
            searchType='blogs'
            placeholder='Search blogs by content, author, or tags...'
            onSearch={handleSearch}
          />
        </div>
      )}

      {blogs.length === 0 ? (
        <div className='flex justify-center items-center py-10'>
          <Text className='text-muted-foreground'>No blogs found</Text>
        </div>
      ) : (
        blogs.map((blog, index) => (
          <BlogCard
            key={blog.id}
            blog={blog}
            isFirst={index === 0}
            isLast={index === blogs.length - 1}
            isShowCommentDivider={false}
            userId={userId}
          />
        ))
      )}
    </div>
  )
}

export default ListBlogs
