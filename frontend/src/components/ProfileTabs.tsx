import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { WatchlistProps } from '@/types'
import { useEffect, useState } from 'react'
import { getBlogs, getWatchlists } from '@/services/profileService'
import ListWatchlist from './ListWatchlist'
import { BlogPost } from '@/types'
import ListBlogs from './ListBlogs'
import WriteBlogTextEditor from './WriteBlogTextEditor'

const ProfileTabs = ({
  userId,
  userFullName,
  isOwner,
}: {
  userId?: string
  userFullName?: string
  isOwner?: boolean
}) => {
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

  const [blogs, setBlogs] = useState<BlogPost[]>([])
  const [isBlogsLoading, setIsBlogsLoading] = useState(true)
  const [blogsError, setBlogsError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await getBlogs(userId)
        setBlogs(data)
      } catch (error) {
        setBlogsError(error instanceof Error ? error.message : 'Error when fetching blogs')
      } finally {
        setIsBlogsLoading(false)
      }
    }
    fetchBlogs()
  }, [userId])

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

        <TabsContent value='blogs' className='mt-2'>
          {isBlogsLoading ? (
            <div className='text-center mt-[100px]'>
              <p>Loading blogs...</p>
            </div>
          ) : blogsError ? (
            <div className='text-center mt-[100px]'>
              <p className='text-red-500'>{blogsError}</p>
            </div>
          ) : (
            <div className='rounded-3xl overflow-hidden pb-4 bg-secondary-dark'>
              {isOwner && <WriteBlogTextEditor userFullName={userFullName} />}
              <ListBlogs blogs={blogs} userId={userId} />
            </div>
          )}
        </TabsContent>

        <TabsContent value='watchlist' className='mt-2'>
          {isWatchlistsLoading ? (
            <div className='text-center mt-[100px]'>
              <p>Loading watchlists...</p>
            </div>
          ) : watchlistsError ? (
            <div className='text-center mt-[100px]'>
              <p className='text-red-500'>{watchlistsError}</p>
            </div>
          ) : (
            <ListWatchlist data={watchlists} isOwner={isOwner} />
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default ProfileTabs
