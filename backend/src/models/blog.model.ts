import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, OneToMany } from 'typeorm'
import { RegisteredUser } from './registeredUser.model'
import { Tag } from './tag.model'
import { BlogMedia } from './blogMedia.model'

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
    joinColumn: { name: 'blogId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'tagId', referencedColumnName: 'id' },
  })
  tags!: Tag[]

  @OneToMany(() => BlogMedia, (image) => image.blog, { cascade: true })
  images!: BlogMedia[]
  constructor(owner: RegisteredUser, content: string, tags: Tag[]) {
    this.owner = owner
    this.content = content
    this.tags = tags
  }
  getId(): string {
    return this.id
  }
}
