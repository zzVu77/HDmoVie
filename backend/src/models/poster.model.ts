import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm'
import { Movie } from './movie.model'
export class Poster {
  @PrimaryGeneratedColumn('uuid')
  id!: string
  @Column({ type: 'text' })
  source!: string
  @OneToOne(() => Poster, (poster) => poster.id, { cascade: true })
  @JoinColumn({ name: 'movie_id' }) // Determine the foreign key column name
  movie!: Movie
  constructor(data?: Partial<Poster>) {
    if (data) {
      Object.assign(this, data)
    }
  }
}
