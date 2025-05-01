// import { Comment } from '@/types';
// import { getRelativeTime } from '@/utils/date';
import { Button } from '@/components/ui/button';


export interface User {
id: string;
username: string;
avatar?: string;
}

export interface Comment {
id: string;
content: string;
dateCreated: Date;
owner: User;
}
// utils/date.ts
export const formatDate = (date: Date) =>
    new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  
export const getRelativeTime = (date: Date) => {
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
    if (diff < 60) return `${diff} seconds ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    if (diff < 604800) return `${Math.floor(diff / 86400)} days ago`;
    return formatDate(date);
};
  
const CommentItem = ({ comment }: { comment: Comment }) => (
  <div className="border-b border-gray-200 dark:border-gray-700 py-4 last:border-0">
    <div className="flex items-start">
      <img
        src={comment.owner.avatar || '/api/placeholder/40/40'}
        alt={comment.owner.username}
        className="w-8 h-8 rounded-full mr-3"
      />
      <div className="flex-1">
        <div className="flex justify-between">
          <p className="font-semibold">{comment.owner.username}</p>
          <span className="text-xs text-gray-500">{getRelativeTime(comment.dateCreated)}</span>
        </div>
        <p className="mt-1">{comment.content}</p>
        <div className="mt-2 flex gap-4">
          <Button variant="ghost" size="sm" className="text-xs">Like</Button>
          <Button variant="ghost" size="sm" className="text-xs">Reply</Button>
        </div>
      </div>
    </div>
  </div>
);

export default CommentItem;
