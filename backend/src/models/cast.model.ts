import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'
@Entity('casts') // Define the table name in the database
export class Cast {
  @PrimaryGeneratedColumn('uuid')
  private id!: string
  @Column({ type: 'varchar', length: 255 })
  private name!: string
  @Column({ type: 'text', nullable: true })
  private profilePath!: string

  constructor(id: string, name: string, profilePath: string) {
    this.id = id ? id : uuidv4()
    this.name = name
    this.profilePath = profilePath
  }
  // Getter methods
  getId(): string {
    return this.id
  }

  getName(): string {
    return this.name
  }

  getProfilePath(): string | undefined {
    return this.profilePath
  }

  // Setter methods
  setId(id: string): void {
    this.id = id
  }

  setName(name: string): void {
    this.name = name
  }

  setProfilePath(profilePath: string): void {
    this.profilePath = profilePath
  }
}
