import { IsDate, IsEmail, IsNotEmpty, Length } from 'class-validator'
import { Column, Entity, PrimaryGeneratedColumn, TableInheritance } from 'typeorm'

@Entity('registeredUsers')
@TableInheritance({ column: { type: 'varchar', name: 'role' } })
export class RegisteredUser {
  @PrimaryGeneratedColumn('uuid')
  protected id!: string

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
  protected role: string = 'REGISTERED_USER' //default value is REGISTERED_USER

  constructor(email: string, password: string, fullName: string, dateOfBirth: Date) {
    this.email = email
    this.password = password
    this.fullName = fullName
    this.dateOfBirth = dateOfBirth
  }
  //Methods
  //Getters and Setters
  public getId(): string {
    return this.id
  }

  public getPassword(): string {
    return this.password
  }

  public getFullName(): string {
    return this.fullName
  }

  public getDateOfBirth(): Date {
    return this.dateOfBirth
  }

  public getRole(): string {
    return this.role
  }

  public setPassword(password: string): void {
    this.password = password
  }

  public setFullName(fullname: string): this {
    this.fullName = fullname
    return this
  }

  public setDob(dob: Date): this {
    this.dateOfBirth = dob
    return this
  }
}
