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
  public getName(): string {
    return this.name
  }
  static createNewGenre(name: string): Genre {
    return new Genre(name, '')
  }
}
