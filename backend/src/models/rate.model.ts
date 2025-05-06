import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique } from 'typeorm'
import { IsNotEmpty, IsNumber, Min, Max } from 'class-validator'
import { RegisteredUser } from './registeredUser.model'
import { Movie } from './movie.model'

@Entity('rates')
@Unique(['user', 'movie']) // Ensure a user can only rate a movie once
export class Rate {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ type: 'float' })
  @IsNotEmpty({ message: 'Rate score is required' })
  @IsNumber({}, { message: 'Rate score must be a number' })
  @Min(0, { message: 'Rate score must be at least 0' })
  @Max(10, { message: 'Rate score must not exceed 10' })
  rateScore!: number

  @ManyToOne(() => RegisteredUser, { nullable: false, onDelete: 'CASCADE' })
  @IsNotEmpty({ message: 'User is required' })
  user!: RegisteredUser

  @ManyToOne(() => Movie, { nullable: false, onDelete: 'CASCADE' })
  @IsNotEmpty({ message: 'Movie is required' })
  movie!: Movie

  constructor(data?: Partial<Rate>) {
    if (data) {
      Object.assign(this, data)
    }
  }
  public getId(): string {
    return this.id
  }
}
