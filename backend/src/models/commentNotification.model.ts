import { IsNotEmpty } from 'class-validator'
import { ChildEntity, JoinColumn, ManyToOne } from 'typeorm'
import { BlogComment } from './blogComment.model'
import { Notification } from './notification.model'
import { RegisteredUser } from './registeredUser.model'
@ChildEntity('COMMENT_NOTI')
export class CommentNotification extends Notification {
  @ManyToOne(() => BlogComment, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'commentId', referencedColumnName: 'id' })
  @IsNotEmpty({ message: 'Comment is required' })
  protected comment!: BlogComment
  //Methods
  // Getter and Setter
  constructor(comment?: BlogComment, owner?: RegisteredUser) {
    super()
    if (comment) this.comment = comment
    if (owner) this.owner = owner
  }
  public getComment(): BlogComment {
    return this.comment
  }
}
