import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { Blog } from './blog.model'

@Entity('blog_media')
export class BlogMedia {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ type: 'text' })
  url!: string

  @ManyToOne(() => Blog, (blog) => blog.images, { onDelete: 'CASCADE' })
  blog!: Blog

  constructor(url: string, blog: Blog) {
    this.url = url
    this.blog = blog
  }
}
