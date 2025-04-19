import { ChildEntity, ManyToOne } from 'typeorm'
import { Comment } from './comment.model'
import { Blog } from './blog.model'

@ChildEntity('blog')
export class BlogComment extends Comment {
  @ManyToOne(() => Blog, { nullable: false })
  blog!: Blog

  constructor(data?: Partial<BlogComment>) {
    super(data)
    if (data) {
      Object.assign(this, data)
    }
  }
}
