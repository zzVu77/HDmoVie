import { ChildEntity, ManyToOne } from 'typeorm'
import { Report } from './report.model'
import { Comment } from './comment.model'

@ChildEntity('COMMENT_REPORT')
export class CommentReport extends Report {
  @ManyToOne(() => Comment, { nullable: false, onDelete: 'CASCADE' })
  comment!: Comment

  constructor(data?: Partial<CommentReport>) {
    super(data)
    if (data) {
      Object.assign(this, data)
    }
  }
}
