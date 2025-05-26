import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('tags')
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ type: 'varchar', length: 100, unique: true })
  name!: string
}
