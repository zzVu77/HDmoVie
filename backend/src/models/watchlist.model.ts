import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm'
import { RegisteredUser } from './registeredUser.model'
import { Movie } from './movie.model'

@Entity('watchlists')
export class Watchlist {
  @PrimaryGeneratedColumn('uuid')
  private id!: string

  @Column({ type: 'varchar', length: 255 })
  private title!: string

  @Column({ type: 'text', nullable: true })
  private description!: string

  @Column({ type: 'boolean', default: false })
  private isPublic!: boolean

  @ManyToOne(() => RegisteredUser, { nullable: false, onDelete: 'CASCADE' })
  private owner!: RegisteredUser

  @ManyToMany(() => Movie, { cascade: true })
  @JoinTable({
    name: 'watchlists_movies',
    joinColumn: { name: 'watchlistId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'movieId', referencedColumnName: 'id' },
  })
  private movies!: Movie[]

  constructor(title: string, description: string, isPublic: boolean, owner: RegisteredUser) {
    this.title = title
    this.description = description
    this.isPublic = isPublic
    this.owner = owner
  }
}
