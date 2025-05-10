import { blogPosts, dummyWatchlists } from '@/pages/TestComponent'
import ListBlogs from './ListBlogs'
import ListWatchlist from './ListWatchlist'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'

const ProfileTabs = () => {
  return (
    <div>
      <Tabs defaultValue='blogs' className='w-full mx-auto'>
        <TabsList className=' w-full flex flex-row justify-between bg-transparent rounded-none gap-20 '>
          <TabsTrigger
            value='blogs'
            className='data-[state=active]:border-[1px] data-[state=active]:border-b-primary-yellow border-b-white data-[state=active]:bg-transparent border-[1px]  rounded-none data-[state=active]:text-white text-sm font-semibold text-white cursor-pointer '
          >
            Blogs
          </TabsTrigger>
          <TabsTrigger
            className=' data-[state=active]:border-[1px] data-[state=active]:border-b-primary-yellow border-b-white data-[state=active]:bg-transparent border-[1px] rounded-none data-[state=active]:text-white text-sm font-semibold text-white cursor-pointer '
            value='watchlist'
          >
            Watchlist
          </TabsTrigger>
        </TabsList>
        <TabsContent value='blogs'>
          <ListBlogs blogs={blogPosts}></ListBlogs>
        </TabsContent>
        <TabsContent value='watchlist'>
          <ListWatchlist data={dummyWatchlists}></ListWatchlist>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default ProfileTabs
