import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'

@Entity('genres')
export class Genre {
  @PrimaryGeneratedColumn('uuid')
  private id!: string

  @Column({ type: 'varchar', length: 100 })
  private name!: string
  constructor(name: string, id: string) {
    this.id = id ? id : uuidv4()
    this.name = name
  }
}
