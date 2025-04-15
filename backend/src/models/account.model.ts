import { IsDate, IsEmail, IsNotEmpty, Length } from 'class-validator'
import { Entity, PrimaryGeneratedColumn, Column, TableInheritance } from 'typeorm'
@Entity('accounts')
@TableInheritance({ column: { type: 'varchar', name: 'type' } }) // Specify the inheritance strategy
export abstract class Account {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ type: 'varchar', length: 100 })
  username!: string

  @Column({ type: 'varchar', length: 255, unique: true })
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email is required' })
  email!: string

  @Column({ type: 'varchar', length: 255 })
  @IsNotEmpty({ message: 'Password is required' })
  @Length(8, 255, { message: 'Password must be at least 8 characters long' })
  password!: string

  @Column({ type: 'varchar', length: 100 })
  @IsNotEmpty({ message: 'Full name is required' })
  fullName!: string

  @Column({ type: 'date' })
  @IsDate({ message: 'Invalid date of birth' })
  @IsNotEmpty({ message: 'Date of birth is required' })
  dateOfBirth!: Date
}
