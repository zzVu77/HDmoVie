import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('genres')
export class Genre {
  @PrimaryGeneratedColumn('uuid')
  private id!: string

  @Column({ type: 'varchar', length: 100 })
  private name!: string

  constructor(name: string) {
    this.name = name
  }
  public getName(): string {
    return this.name
  }
  static createNewGenre(name: string): Genre {
    return new Genre(name)
  }
}
