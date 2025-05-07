import ListBlogs from '@/components/ListBlogs'
import Wrapper from '@/components/shared/Wrapper'
import { blogPosts } from './TestComponent'

const Blogs = () => {
  return (
    <div>
      <Wrapper className='lg:px-[200px] px-5 pt-28'>
        <ListBlogs blogs={blogPosts}></ListBlogs>
      </Wrapper>
    </div>
  )
}

export default Blogs
