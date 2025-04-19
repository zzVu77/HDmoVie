import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm'
import { RegisteredUser } from './registeredUser.model'
import { Tag } from './tag.model'

@Entity('blogs')
export class Blog {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ type: 'text' })
  content!: string

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  dateCreated!: Date

  @ManyToOne(() => RegisteredUser, { nullable: false })
  owner!: RegisteredUser

  @ManyToMany(() => Tag)
  @JoinTable({
    name: 'blogs_tags',
    joinColumn: { name: 'blog_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'tag_id', referencedColumnName: 'id' },
  })
  tags!: Tag[]

  constructor(data?: Partial<Blog>) {
    if (data) {
      Object.assign(this, data)
    }
  }
}
