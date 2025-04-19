import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm'
import { Movie } from './movie.model' // Import Movie entity

@Entity('genres')
export class Genre {
  @PrimaryGeneratedColumn('uuid')
  private id!: string

  @Column({ type: 'varchar', length: 100 })
  private name!: string
}
