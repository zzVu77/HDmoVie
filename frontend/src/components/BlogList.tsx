import BlogPost, { BlogPostProps } from './BlogPost';

// Sample blog data
const blogPosts: BlogPostProps[] = [
  {
    id: '1',
    content: 'A perfect Sunday dinner with roasted lamb and seasonal vegetables.',
    dateCreated: new Date('2025-05-01T10:00:00Z').toISOString(),
    owner: {
      name: 'helenscchin',
      verified: false,
    },
    tags: [{ id: '1', name: 'Dish' }],
    imageUrl:
      'https://i1-vnexpress.vnecdn.net/2025/05/01/39408e22-c2b5-4ba3-8e5f-d0ce16-4721-9346-1746084631.jpg?w=680&h=0&q=100&dpr=2&fit=crop&s=3ZBnNItPHd7Hzqsp8jnC9g',
    likes: 15,
    comments: 3,
    shares: 2,
  },
  {
    id: '2',
    content: 'Everything you need for a perfect day at the beach this summer.',
    dateCreated: new Date('2025-05-01T12:00:00Z').toISOString(),
    owner: {
      name: 'crisula_barbata',
      verified: true,
    },
    tags: [{ id: '2', name: 'Lifestyle' }],
    imageUrl:
      'https://i1-vnexpress.vnecdn.net/2025/05/01/39408e22-c2b5-4ba3-8e5f-d0ce16-4721-9346-1746084631.jpg?w=680&h=0&q=100&dpr=2&fit=crop&s=3ZBnNItPHd7Hzqsp8jnC9g',
    likes: 25,
    comments: 5,
    shares: 4,
  },
  {
    id: '3',
    content: 'Exploring the best pies in town!',
    dateCreated: new Date('2025-05-01T14:00:00Z').toISOString(),
    owner: {
      name: 'perthudefood',
      verified: false,
    },
    tags: [
      { id: '3', name: 'Famous Arabic Foods' },
      { id: '4', name: 'Dish' },
    ],
    imageUrl:
      'https://i1-vnexpress.vnecdn.net/2025/05/01/39408e22-c2b5-4ba3-8e5f-d0ce16-4721-9346-1746084631.jpg?w=680&h=0&q=100&dpr=2&fit=crop&s=3ZBnNItPHd7Hzqsp8jnC9g',
    likes: 22,
    comments: 0,
    shares: 0,
  },
];

export interface BlogListProps {
  posts?: BlogPostProps[];
}

const BlogList = ({ posts = blogPosts }: BlogListProps) => {
  return (
    <div className="max-w-md w-full mx-auto">
      {posts.length === 0 ? (
        <p className="text-center text-muted-foreground">No posts available.</p>
      ) : (
        posts.map((post, index) => (
          <BlogPost
            key={post.id}
            post={post}
            className="" 
            showFooterBorder={true} 
            isFirst={index === 0} 
            isLast={index === posts.length - 1} 
          />
        ))
      )}
    </div>
  );
};

export default BlogList;