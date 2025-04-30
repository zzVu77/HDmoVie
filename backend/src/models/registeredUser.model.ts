import { Column, Entity, PrimaryGeneratedColumn, TableInheritance } from 'typeorm'
import { Movie } from './movie.model'
import { Blog } from './blog.model'
import { MovieComment } from './movieComment.model'
import { BlogComment } from './blogComment.model'

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
  commentOnMovieDetail(movie: Movie, content: string): MovieComment {
    const comment = new MovieComment(
      this, // user 
      content, // content
      new Date(), // date
      movie, // movie
      undefined, // parentComment 
    )
    return comment
  }
  commentOnBlog(blog: Blog, content: string, parentComment?: BlogComment): BlogComment {
    return new BlogComment(
      this,            // the user (RegisteredUser)
      content,         // the comment content
      new Date(),      // timestamp
      blog,            // the blog post
      parentComment    // optional parent comment
    )
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

  // Create instance
  // static createNewUser(email: string, password: string, fullName: string, dateOfBirth: string): RegisteredUser {
  //   const user = new RegisteredUser(email, password, fullName, dateOfBirth)

  //   //Check user is older than 16 years old
  //   if (!user.isValidDOB()) {
  //     throw new Error('User must be at least 16 years old')
  //   }

  //   return user
  // }
}
