import { Column, Entity, PrimaryGeneratedColumn, TableInheritance } from 'typeorm'
import { Movie } from './movie.model'
import { Blog } from './blog.model'
import { MovieComment } from './movieComment.model'
import { BlogComment } from './blogComment.model'
import { LikeInteraction } from './likeInteraction.model'

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

  @Column({ type: 'varchar', length: 512, nullable: true })
  protected refreshToken?: string

  @Column({ type: 'timestamp', nullable: true })
  protected refreshTokenExpiresAt?: Date

  @Column({ type: 'varchar', default: 'REGISTERED_USER' })
  protected role: string = 'REGISTERED_USER' //default value is REGISTERED_USER

  constructor(email: string, password: string, fullName: string, dateOfBirth: string) {
    this.email = email
    this.password = password
    this.fullName = fullName
    this.dateOfBirth = dateOfBirth
  }

  updateToken(refreshToken: string, expiresInDays: number = 7): void {
    this.refreshToken = refreshToken
    this.refreshTokenExpiresAt = new Date(Date.now() + expiresInDays * 24 * 60 * 60 * 1000)
  }

  clearToken(): void {
    this.refreshToken = undefined
    this.refreshTokenExpiresAt = undefined
  }

  isTokenExpired(): boolean {
    if (!this.refreshToken || !this.refreshTokenExpiresAt) {
      return true
    }
    return new Date() > this.refreshTokenExpiresAt
  }
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
  static isValidDOB(userData: RegisteredUser): boolean {
    const today = new Date()
    const birthDate = new Date(userData.getDateOfBirth())
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }

    return age >= 10 && age <= 100
  }
  public likeBlog(likeInteraction: LikeInteraction): void {
    likeInteraction.addLiker(this)
  }

  public unlikeBlog(likeInteraction: LikeInteraction): void {
    likeInteraction.removeLiker(this.getId())
  }
}
