import { ChildEntity, ManyToOne } from 'typeorm'
import { Report } from './report.model'
import { Blog } from './blog.model'

@ChildEntity('blog')
export class BlogReport extends Report {
  @ManyToOne(() => Blog, { nullable: false })
  blog!: Blog

  constructor(data?: Partial<BlogReport>) {
    super(data)
    if (data) {
      Object.assign(this, data)
    }
  }
}
