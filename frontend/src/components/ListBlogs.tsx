import BlogCard, { BlogPostComponentProps } from './BlogCard'

type Props = {
  blogs: BlogPostComponentProps[]
}
const ListBlogs = ({ blogs }: Props) => {
  return (
    <div className='flex flex-col items-center justify-center '>
      {blogs.map((post, index) => (
        <BlogCard
          key={post.id}
          id={post.id}
          content={post.content}
          dateCreated={post.dateCreated}
          owner={post.owner}
          tags={post.tags}
          likes={post.likes}
          comments={post.comments}
          images={post.images}
          isFirst={index === 0}
          isLast={index === blogs.length - 1}
          isShowCommentDivider={false}
        ></BlogCard>
      ))}
    </div>
  )
}

export default ListBlogs
