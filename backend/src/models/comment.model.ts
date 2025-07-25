import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, TableInheritance } from 'typeorm'
import { RegisteredUser } from './registeredUser.model'

@Entity('comments')
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export abstract class Comment {
  @PrimaryGeneratedColumn('uuid')
  protected id!: string

  @ManyToOne(() => RegisteredUser, { nullable: false, onDelete: 'CASCADE' })
  protected user!: RegisteredUser

  @Column({ type: 'text' })
  protected content!: string

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  protected date!: Date

  @ManyToOne(() => Comment, { nullable: true, onDelete: 'CASCADE' })
  protected parentComment?: Comment

  // Constructor
  constructor(user: RegisteredUser, content: string, date: Date, parentComment?: Comment) {
    this.user = user
    this.content = content
    this.date = date
    this.parentComment = parentComment
  }

  // Setter cho parentComment
  setParentComment(parent: Comment): void {
    this.parentComment = parent
  }

  getId(): string {
    return this.id
  }

  getContent(): string {
    return this.content
  }

  getUser(): RegisteredUser {
    return this.user
  }

  getDate(): Date {
    return this.date
  }

  getParentComment(): Comment | undefined {
    return this.parentComment
  }
}
