import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
@Entity('casts') // Define the table name in the database
export class Cast {
  @PrimaryGeneratedColumn('uuid')
  private id!: string
  @Column({ type: 'varchar', length: 255 })
  private name!: string
  @Column({ type: 'text' })
  private profilePath!: string
}
