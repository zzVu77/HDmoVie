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

  @ManyToOne(() => Comment, { nullable: true })
  protected parentComment?: Comment

  // Constructor nhận tham số từng thuộc tính cụ thể
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
    return this.id;
  }
  getParentComment(): Comment | undefined {
    return this.parentComment;
  }
}
