import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
@Entity('genres')
export class Genre {
  @PrimaryGeneratedColumn('uuid')
  id!: string
  @Column({ type: 'varchar', length: 100 })
  name!: string
}
