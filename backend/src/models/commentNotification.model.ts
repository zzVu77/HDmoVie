import { IsNotEmpty } from 'class-validator'
import { ChildEntity, JoinColumn, ManyToOne } from 'typeorm'
import { BlogComment } from './blogComment.model'
import { Notification } from './notification.model'

@ChildEntity('COMMENT_NOTI')
export class CommentNotification extends Notification {
  @ManyToOne(() => BlogComment, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'commentId', referencedColumnName: 'id' })
  @IsNotEmpty({ message: 'Comment is required' })
  protected comment!: BlogComment
  //Methods
  // Getter and Setter
  public getComment(): BlogComment {
    return this.comment
  }
}
