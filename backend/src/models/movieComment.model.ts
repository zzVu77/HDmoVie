import { ChildEntity, ManyToOne } from 'typeorm'
import { Comment } from './comment.model'
import { Movie } from './movie.model'
import { RegisteredUser } from './registeredUser.model'

@ChildEntity('MOVIE')
export class MovieComment extends Comment {
  @ManyToOne(() => Movie, { nullable: true, onDelete: 'CASCADE' })
  public movie!: Movie

  // Constructor
  constructor(user: RegisteredUser, content: string, date: Date, movie: Movie, parentComment?: Comment) {
    super(user, content, date, parentComment) // call constructor of Comment
    this.movie = movie
  }

  getMovie(): Movie {
    return this.movie
  }
}
