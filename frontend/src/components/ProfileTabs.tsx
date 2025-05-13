import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { WatchlistProps } from '@/types'
import { useEffect, useState } from 'react'
import { getWatchlists } from '@/services/profileService'
import ListWatchlist from './ListWatchlist'
// import { BlogPostComponentProps } from './BlogCard'

const ProfileTabs = ({ userId }: { userId?: string }) => {
  // ==============================
  //      FETCHING WATCHLISTS
  // ==============================

  const [watchlists, setWatchlists] = useState<WatchlistProps[]>([])
  const [isWatchlistsLoading, setIsWatchlistsLoading] = useState(true)
  const [watchlistsError, setWatchlistsError] = useState<string | null>(null)

  useEffect(() => {
    const fetchWatchlists = async () => {
      try {
        const data = await getWatchlists(userId)
        setWatchlists(data)
      } catch (error) {
        setWatchlistsError(error instanceof Error ? error.message : 'Error when fetching watchlists')
      } finally {
        setIsWatchlistsLoading(false)
      }
    }
    fetchWatchlists()
  }, [userId])

  // ==============================
  //        FETCHING BLOGS
  // ==============================

  // const [blogs, setBlogs] = useState<BlogPostComponentProps[]>([])
  // const [isBlogsLoading, setIsBlogsLoading] = useState(true)
  // const [blogsError, setBlogsError] = useState<string | null>(null)

  // useEffect(() => {
  //   const fetchBlogs = async () => {
  //     try {
  //       const data = await getBlogs(id)
  //       setBlogs(data)
  //     } catch (error) {
  //       setBlogsError(error instanceof Error ? error.message : 'Error when fetching blogs')
  //     } finally {
  //       setIsBlogsLoading(false)
  //     }
  //   }
  //   fetchBlogs()
  // }, [id])

  return (
    <div>
      <Tabs defaultValue='blogs' className='w-full mx-auto'>
        <TabsList className=' w-full flex flex-row justify-between bg-transparent rounded-none gap-20 '>
          <TabsTrigger
            value='blogs'
            className='data-[state=active]:border-[1px] data-[state=active]:border-b-primary-yellow data-[state=active]:text-primary-yellow border-b-white data-[state=active]:bg-transparent border-[1px] rounded-none text-sm font-semibold text-white cursor-pointer '
          >
            Blogs
          </TabsTrigger>
          <TabsTrigger
            className='data-[state=active]:border-[1px] data-[state=active]:border-b-primary-yellow data-[state=active]:text-primary-yellow border-b-white data-[state=active]:bg-transparent border-[1px] rounded-none text-sm font-semibold text-white cursor-pointer '
            value='watchlist'
          >
            Watchlist
          </TabsTrigger>
        </TabsList>
        <TabsContent value='blogs' className='mt-1'>
          Blogs
          {/* <ListBlogs blogs={blogPosts}></ListBlogs> */}
        </TabsContent>
        <TabsContent value='watchlist'>
          {isWatchlistsLoading ? (
            <div className='text-center mt-[100px]'>
              <p>Loading watchlists...</p>
            </div>
          ) : watchlistsError ? (
            <div className='text-center mt-[100px]'>
              <p className='text-red-500'>{watchlistsError}</p>
            </div>
          ) : (
            <ListWatchlist data={watchlists} />
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default ProfileTabs
