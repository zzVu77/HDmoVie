import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MessageCircle, Share2, MoreHorizontal, Heart } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Text } from './ui/typography';
import { cn } from '@/lib/utils';

export interface BlogPostProps {
  id: string;
  content: string;
  dateCreated: string;
  owner: {
    name: string;
    verified: boolean;
  };
  tags: {
    id: string;
    name: string;
  }[];
  imageUrl: string;
  likes: number;
  comments: number;
  shares: number;
}

interface BlogPostComponentProps {
  post: BlogPostProps;
  className?: string;
  showFooterBorder?: boolean;
  isFirst?: boolean;
  isLast?: boolean;
}

const BlogPost = ({
  post,
  className,
  showFooterBorder = true,
  isFirst = false,
  isLast = false,
}: BlogPostComponentProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  return (
    <Link to={`/blog/${post.id}`}>
      
      <Card
        className={cn(
          'overflow-hidden bg-zinc-900 border border-zinc-700 hover:shadow-md transition-shadow duration-300 m-0', 
          isFirst && 'rounded-t-md rounded-b-none',
          isLast && 'rounded-b-md rounded-t-none',
          !isFirst && !isLast && 'rounded-none',
          className
        )}
      >
        <CardHeader className="px-4 pt-4 pb-2 space-y-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={`/api/placeholder/50/50`} />
                <AvatarFallback>{post.owner.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <Text className="text-sm text-white">{post.owner.name}</Text>
                  {post.owner.verified && (
                    <Text className="text-white">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z" />
                        <path d="M9 12l2 2 4-4" />
                      </svg>
                    </Text>
                  )}
                </div>
                <Text className="text-muted-foreground text-xs">
                  {new Date(post.dateCreated).toLocaleString()}
                </Text>
              </div>
            </div>
            <div className="flex items-center gap-2 text-white">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 hover:bg-zinc-700 hover:text-white"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
              >
                <MoreHorizontal size={16} />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="">
          <Text className="text-base mb-4">{post.content}</Text>
          <AspectRatio ratio={4 / 3}>
            <img src={post.imageUrl} alt="Post image" className="object-cover w-full h-full" />
          </AspectRatio>
          <div className="flex items-center gap-2 mt-4 flex-wrap">
            {post.tags.map(tag => (
              <Badge 
                key={tag.id} 
                variant="outline" 
                className="text-white"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
              >
                {tag.name}
              </Badge>
            ))}
          </div>
        </CardContent>

        <CardFooter
          className={cn(
            'flex justify-between px-4 py-2',
            showFooterBorder ? 'border-t border-zinc-700' : 'border-none'
          )}
        >
          <div className="flex items-center gap-6">
            <Button
              variant="ghost"
              size="sm"
              className={`p-0 h-auto flex items-center gap-1 hover:bg-zinc-700 transition-colors ${
                isLiked
                  ? 'text-red-500 hover:text-red-400'
                  : 'text-yellow-400 hover:text-yellow-300'
              }`}
              onClick={handleLike}
            >
              <Heart size={18} fill={isLiked ? 'currentColor' : 'none'} />
              <Text>{likeCount}</Text>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="p-0 h-auto flex items-center gap-1 text-yellow-400 hover:text-yellow-300 hover:bg-zinc-700 transition-colors"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <MessageCircle size={18} />
              <Text>{post.comments}</Text>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="p-0 h-auto flex items-center gap-1 text-yellow-400 hover:text-yellow-300 hover:bg-zinc-700 transition-colors"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <Share2 size={18} />
              <Text>{post.shares}</Text>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default BlogPost;