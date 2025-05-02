import BlogPost, { BlogPostProps } from './BlogCard'

export interface BlogListProps {
  posts: BlogPostProps[]
}

const BlogList = ({ posts }: BlogListProps) => {
  return (
    <div className='w-full'>
      {posts.length === 0 ? (
        <p className='text-center text-muted-foreground'>No posts available.</p>
      ) : (
        posts.map((post, index) => (
          <BlogPost
            key={post.id}
            post={post}
            showFooterBorder={true}
            isFirst={index === 0}
            isLast={index === posts.length - 1}
          />
        ))
      )}
    </div>
  )
}

export default BlogList
