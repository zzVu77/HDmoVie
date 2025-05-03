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
  media!: BlogMedia[]

  constructor(owner?: RegisteredUser, content?: string, tags?: Tag[], media?: BlogMedia[]) {
    this.owner = owner ?? this.owner
    this.content = content ?? this.content
    this.tags = tags ?? this.tags
    this.media = media ?? this.media
  }

  getId(): string {
    return this.id
  }
}
