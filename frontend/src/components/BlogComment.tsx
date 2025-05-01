// components/Comment.tsx
import { useState } from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Text } from './ui/typography';
import { Heart, Reply } from 'lucide-react';

export interface CommentProps {
  id: string;
  content: string;
  dateCreated: string;
  owner: {
    name: string;
    verified: boolean;
  };
  likes: number;
  replies?: CommentProps[];
}

const Comment = ({ comment, isReply = false }: { comment: CommentProps; isReply?: boolean }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(comment.likes);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyText, setReplyText] = useState('');

  const handleLike = () => {
    setLikeCount(prev => liked ? prev - 1 : prev + 1);
    setLiked(!liked);
  };

  const handleReply = () => {
    setShowReplyInput(!showReplyInput);
  };

  const submitReply = () => {
    console.log(`Replying to comment ${comment.id}: ${replyText}`);
    setReplyText('');
    setShowReplyInput(false);
  };

  return (
    <Card className={`bg-zinc-900 border border-zinc-800 mb-3 ${isReply ? 'ml-12' : ''}`}>
      <CardHeader className="px-4 py-3 flex flex-row items-start gap-3">
        <Avatar className="h-8 w-8">
          <AvatarImage src={`/api/placeholder/40/40`} />
          <AvatarFallback>{comment.owner.name.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center gap-1">
            <Text className="text-sm font-semibold">{comment.owner.name}</Text>
            {comment.owner.verified && (
              <Text className="text-white">
                <svg
                  width="12"
                  height="12"
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
          <Text className="text-xs text-muted-foreground">
            {new Date(comment.dateCreated).toLocaleString()}
          </Text>
        </div>
      </CardHeader>

      <CardContent className="px-4 py-2">
        <Text>{comment.content}</Text>
      </CardContent>

      <CardFooter className="px-4 py-2 flex justify-between border-t border-zinc-800">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            className={`p-0 h-auto flex items-center gap-1 hover:bg-zinc-700 transition-colors ${
              liked ? 'text-red-500 hover:text-red-400' : 'text-yellow-400 hover:text-yellow-300'
            }`}
            onClick={handleLike}
          >
            <Heart size={14} fill={liked ? 'currentColor' : 'none'} />
            <Text className="text-xs">{likeCount}</Text>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="p-0 h-auto flex items-center gap-1 text-yellow-400 hover:text-yellow-300 hover:bg-zinc-700 transition-colors"
            onClick={handleReply}
          >
            <Reply size={14} />
            <Text className="text-xs">Reply</Text>
          </Button>
        </div>
      </CardFooter>

      {showReplyInput && (
        <div className="px-4 pb-3">
          <div className="flex items-start gap-2 mt-2">
            <Avatar className="h-6 w-6 mt-1">
              <AvatarImage src={`/api/placeholder/30/30`} />
              <AvatarFallback>ME</AvatarFallback>
            </Avatar>
            <div className="flex-1 rounded-xl border border-zinc-700 bg-zinc-900 shadow-inner overflow-hidden">
              <textarea
                className="w-full bg-zinc-900 p-3 text-sm text-white placeholder-zinc-400 outline-none resize-none"
                rows={2}
                placeholder="Write a reply..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
              />
              <div className="flex justify-end px-3 py-2 border-t border-zinc-700 bg-zinc-900">
                <Button 
                  size="sm" 
                  className="text-sm font-medium text-white bg-zinc-800 hover:bg-zinc-700 rounded-md px-3 py-1.5 disabled:opacity-50"
                  disabled={!replyText.trim()}
                  onClick={submitReply}
                >
                  Reply
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      
    </Card>
  );
};

export default Comment;
