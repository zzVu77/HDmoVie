import { ChildEntity, ManyToOne } from 'typeorm'
import { Report, ReportReason } from './report.model'
import { Blog } from './blog.model'
import { RegisteredUser } from './registeredUser.model'

@ChildEntity('BLOG_REPORT')
export class BlogReport extends Report {
  @ManyToOne(() => Blog, { nullable: true, onDelete: 'CASCADE' })
  blog!: Blog

  // Updated constructor with direct parameters
  constructor(reporter: RegisteredUser, reason: ReportReason, blog: Blog) {
    super(reporter, reason)
    this.blog = blog
  }
}
