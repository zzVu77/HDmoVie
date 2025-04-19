import { IsDate, IsEmail, IsNotEmpty, Length } from 'class-validator'
import { Entity, PrimaryGeneratedColumn, Column, TableInheritance } from 'typeorm'

@Entity('registeredUsers')
@TableInheritance({ column: { type: 'varchar', name: 'role' } })
export class RegisteredUser {
  @PrimaryGeneratedColumn('uuid')
  protected id!: string

  @Column({ type: 'varchar', length: 100 })
  protected username!: string

  @Column({ type: 'varchar', length: 255, unique: true })
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email is required' })
  protected email!: string

  @Column({ type: 'varchar', length: 255 })
  @IsNotEmpty({ message: 'Password is required' })
  @Length(8, 255, { message: 'Password must be at least 8 characters long' })
  protected password!: string

  @Column({ type: 'varchar', length: 100 })
  @IsNotEmpty({ message: 'Full name is required' })
  protected fullName!: string

  @Column({ type: 'date' })
  @IsDate({ message: 'Invalid date of birth' })
  @IsNotEmpty({ message: 'Date of birth is required' })
  protected dateOfBirth!: Date

  @Column({ type: 'varchar', default: 'REGISTERED_USER' })
  protected role: string = 'REGISTERED_USER' // Giá trị mặc định là REGISTERED_USER

  // Phương thức cho RegisteredUser
  public getUserInfo(): string {
    return `User: ${this.fullName} (${this.email})`
  }
}
