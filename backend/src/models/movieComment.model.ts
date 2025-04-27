import { ChildEntity, ManyToOne } from 'typeorm'
import { Comment } from './comment.model'
import { Movie } from './movie.model'
import { RegisteredUser } from '~/models/registeredUser.model'

@ChildEntity('MOVIE')
export class MovieComment extends Comment {
  @ManyToOne(() => Movie, { nullable: true, onDelete: 'CASCADE' })
  public movie!: Movie

  // Constructor gọn hơn, trực tiếp nhận từng tham số
  constructor(user: RegisteredUser, content: string, date: Date, movie: Movie, parentComment?: Comment) {
    super(user, content, date, parentComment) // Gọi constructor của Comment
    this.movie = movie // Gán movie cho thuộc tính movie
  }
}
