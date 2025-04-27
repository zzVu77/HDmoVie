import { ChildEntity, ManyToOne } from 'typeorm'
import { Comment } from './comment.model'
import { Blog } from './blog.model'
import { RegisteredUser } from '~/models/registeredUser.model'

@ChildEntity('BLOG')
export class BlogComment extends Comment {
  @ManyToOne(() => Blog, { nullable: true })
  blog!: Blog

  // Constructor gọn hơn, trực tiếp nhận từng tham số
  constructor(user: RegisteredUser, content: string, date: Date, blog: Blog, parentComment?: Comment) {
    super(user, content, date, parentComment) // Gọi constructor của Comment
    this.blog = blog // Gán movie cho thuộc tính movie
  }
}
