import BlogList from '@/components/BlogList';
import { Title, Text } from '@/components/ui/typography';

const BlogPage = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="container mx-auto py-8 px-4">
        <header className="mb-8 text-center">
          <Title level={2} className="mb-2">Our Blog</Title>
          <Text className="text-muted-foreground max-w-md mx-auto">
            Discover the latest trends, recipes, and lifestyle tips from our community.
          </Text>
        </header>
        
        <div className="grid grid-cols-1 gap-6">
          <BlogList />
        </div>
      </div>
    </div>
  );
};

export default BlogPage;