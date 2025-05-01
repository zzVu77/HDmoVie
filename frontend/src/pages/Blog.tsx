import BlogList from '@/components/BlogList';
import { Button } from '@/components/ui/button';


const BlogPage = () => {
  return (
    <div className="container w-100 color mx-auto py-8 px-4">
      <div className="grid grid-cols-1 gap-6">
        <BlogList />
      </div>
      
      <div className="mt-8 flex justify-center">
        <Button variant="outline">Load More</Button>
      </div>
    </div>
  );
};

export default BlogPage;