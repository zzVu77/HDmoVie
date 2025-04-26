import { Column, Entity, PrimaryGeneratedColumn, TableInheritance } from 'typeorm'

@Entity('registeredUsers')
@TableInheritance({ column: { type: 'varchar', name: 'role' } })
export class RegisteredUser {
  @PrimaryGeneratedColumn('uuid')
  protected id!: string

  @Column({ type: 'varchar', length: 255, unique: true })
  protected email!: string

  @Column({ type: 'varchar', length: 255 })
  protected password!: string

  @Column({ type: 'varchar', length: 100 })
  protected fullName!: string

  @Column({ type: 'date' })
  protected dateOfBirth!: string

  @Column({ type: 'varchar', default: 'REGISTERED_USER' })
  protected role: string = 'REGISTERED_USER' //default value is REGISTERED_USER

  constructor(email: string, password: string, fullName: string, dateOfBirth: string) {
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

  public getEmail(): string {
    return this.email
  }
  public getPassword(): string {
    return this.password
  }
  public getFullName(): string {
    return this.fullName
  }

  public getDateOfBirth(): string {
    return this.dateOfBirth
  }

  public getRole(): string {
    return this.role
  }
  public setPassword(password: string): void {
    this.password = password
  }

  // Check Date of birth is valid
  private isValidDOB(): boolean {
    const today = new Date()
    const birthDate = new Date(this.dateOfBirth)
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }

    return age >= 16
  }

  // Create instance
  static createNewUser(data: {
    email: string
    password: string
    fullName: string
    dateOfBirth: string
  }): RegisteredUser {
    const user = new RegisteredUser(data.email, data.password, data.fullName, data.dateOfBirth)
    if (!user.isValidDOB()) {
      throw new Error('User must be at least 16 years old')
    }

    return user
  }
}
