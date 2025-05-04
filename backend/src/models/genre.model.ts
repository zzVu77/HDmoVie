import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'

@Entity('genres')
export class Genre {
  @PrimaryGeneratedColumn('uuid')
  public id!: string

  @Column({ type: 'varchar', length: 100 })
  private name!: string

  constructor(name: string, id?: string) {
    this.id = id ? id : uuidv4()
    this.name = name
  }
  public getName(): string {
    return this.name
  }

  public setName(name: string): void {
    this.name = name
  }
  public getId(): string {
    return this.id
  }
  updateGenre(updateName?: string): void {
    this.setName(updateName ?? this.name)
  }
}
