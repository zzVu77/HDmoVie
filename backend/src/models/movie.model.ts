import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm'
import { Genre } from './genre.model'
import { Cast } from './cast.model' // Import Cast entity

@Entity('movies')
export class Movie {
  @PrimaryGeneratedColumn('uuid')
  private id!: string

  @Column({ type: 'varchar', length: 255 })
  private title!: string

  @Column({ type: 'text' })
  private description!: string

  @Column({ type: 'datetime' })
  private releaseYear!: string

  @Column({ type: 'text' })
  private trailerSource!: string

  @Column({ type: 'text' })
  private posterSource!: string

  @Column({ type: 'text' })
  private backdropSource!: string

  @Column({ type: 'float' })
  private voteAvg!: number

  @Column({ type: 'int' })
  private voteCount!: number

  @ManyToMany(() => Genre, { cascade: true })
  @JoinTable({
    name: 'movies_genres',
    joinColumn: { name: 'movie_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'genre_id', referencedColumnName: 'id' },
  })
  private genres!: Genre[]

  @ManyToMany(() => Cast, { cascade: true })
  @JoinTable({
    name: 'movies_casts',
    joinColumn: { name: 'movie_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'cast_id', referencedColumnName: 'id' },
  })
  private casts!: Cast[]

  constructor(data?: Partial<Movie>) {
    if (data) {
      Object.assign(this, data)
    }
  }
}
