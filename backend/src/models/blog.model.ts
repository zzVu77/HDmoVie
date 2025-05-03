import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, OneToMany } from 'typeorm'
import { IsNotEmpty } from 'class-validator'
import { RegisteredUser } from './registeredUser.model'
import { Tag } from './tag.model'
import { BlogMedia } from './blogMedia.model'

@Entity('blogs')
export class Blog {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ type: 'text' })
  @IsNotEmpty()
  content!: string

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  dateCreated!: Date

  @ManyToOne(() => RegisteredUser, { nullable: false })
  owner!: RegisteredUser

  @ManyToMany(() => Tag, { eager: true })
  @JoinTable({
    name: 'blogs_tags',
    joinColumn: { name: 'blogId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'tagId', referencedColumnName: 'id' },
  })
  tags!: Tag[]

  @OneToMany(() => BlogMedia, (blogMedia) => blogMedia.blog, { cascade: true, eager: true })
  imageUrls!: BlogMedia[]

  constructor(owner?: RegisteredUser, content?: string, tags?: Tag[], imageUrls?: BlogMedia[]) {
    this.owner = owner ?? this.owner
    this.content = content ?? this.content
    this.tags = tags ?? this.tags
    this.imageUrls = imageUrls ?? this.imageUrls
  }

  getId(): string {
    return this.id
  }
}
