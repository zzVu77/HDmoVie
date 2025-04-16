import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm'
import { Genre } from './genre.model'

@Entity('movies')
export class Movie {
  @PrimaryGeneratedColumn('uuid')
  id!: string
  @Column({ type: 'varchar', length: 255 })
  title!: string
  @Column({ type: 'text' })
  description!: string
  @Column({ type: 'int' })
  releaseYear!: number
  @Column({ type: 'varchar', length: 100 })
  director!: string[]
  @Column({ type: 'text' })
  trailerSource!: string[]

  @ManyToMany(() => Genre, { cascade: true })
  // Define intermediate table for many-to-many relationship
  @JoinTable({
    name: 'movies_genres',
    joinColumn: { name: 'movie_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'genre_id', referencedColumnName: 'id' },
  })
  genres!: Genre[]

  constructor(data?: Partial<Movie>) {
    if (data) {
      Object.assign(this, data)
    }
  }
}
