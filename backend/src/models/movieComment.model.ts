import { ChildEntity, ManyToOne } from 'typeorm'
import { Comment } from './comment.model'
import { Movie } from './movie.model'

@ChildEntity('movie')
export class MovieComment extends Comment {
  @ManyToOne(() => Movie, { nullable: false })
  movie!: Movie

  constructor(data?: Partial<MovieComment>) {
    super(data)
    if (data) {
      Object.assign(this, data)
    }
  }
}
