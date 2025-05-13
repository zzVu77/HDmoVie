import ListBlogs from '@/components/ListBlogs'
import Wrapper from '@/components/shared/Wrapper'

const Blogs = () => {
  return (
    <div>
      <Wrapper className='lg:px-[200px] px-5 pt-28'>
        <ListBlogs />
      </Wrapper>
    </div>
  )
}

export default Blogs
