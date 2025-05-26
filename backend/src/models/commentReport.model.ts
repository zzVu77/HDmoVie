import { ChildEntity, ManyToOne } from 'typeorm'
import { Report, ReportReason } from './report.model'
import { Comment } from './comment.model'
import { RegisteredUser } from './registeredUser.model'

@ChildEntity('COMMENT_REPORT')
export class CommentReport extends Report {
  @ManyToOne(() => Comment, { nullable: true, onDelete: 'CASCADE' })
  comment!: Comment

  // Updated constructor with direct parameters
  constructor(reporter: RegisteredUser, reason: ReportReason, comment: Comment) {
    super(reporter, reason)
    this.comment = comment
  }
}
