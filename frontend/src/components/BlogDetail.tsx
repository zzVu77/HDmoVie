import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Text } from './ui/typography';
import CommentSection from './BlogCommentList';
import BlogPost from './BlogCard';
import { BlogPostProps } from './BlogCard';

// Sample blog data - in a real app this would come from an API
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

const BlogDetail = () => {
  const { blogId } = useParams<{ blogId: string }>();
  const [post, setPost] = useState<BlogPostProps | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch blog details
    setIsLoading(true);
    setTimeout(() => {
      const foundPost = blogPosts.find(post => post.id === blogId);
      if (foundPost) {
        setPost(foundPost);
      }
      setIsLoading(false);
    }, 500);
  }, [blogId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white">
        <div className="container mx-auto py-8 px-4">
          <div className="max-w-md mx-auto">
            <Text className="text-center">Loading blog details...</Text>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white">
        <div className="container mx-auto py-8 px-4">
          <div className="max-w-md mx-auto">
            <Text className="text-center">Blog post not found</Text>
            <div className="mt-4 text-center">
              <Link to="/blog">
                <Button variant="outline" className="flex items-center gap-2">
                  <ArrowLeft size={16} />
                  <Text>Back to blogs</Text>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-md mx-auto">
          <div className="mb-6">
            <Link to="/blog">
              <Button variant="ghost" className="flex items-center gap-2 mb-4 text-yellow-400 hover:text-yellow-300 hover:bg-zinc-700">
                <ArrowLeft size={16} />
                <Text>Back to blogs</Text>
              </Button>
            </Link>
          </div>

          {/* Blog Post using the same component as in the list */}
          <BlogPost 
            post={post} 
            className=""
            showFooterBorder={true}
            isFirst={true}
            isLast={false}
          />

          {/* Comments Section */}
          <Card className="bg-zinc-900 border border-zinc-700 rounded-t-none rounded-b-md">
            <div className="p-4">
              <CommentSection blogId={post.id} />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;