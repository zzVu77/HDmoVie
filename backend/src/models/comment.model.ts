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

  constructor(data?: Partial<Comment>) {
    if (data) {
      Object.assign(this, data)
    }
  }
}
