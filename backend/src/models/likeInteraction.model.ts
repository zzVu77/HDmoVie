import { Entity, PrimaryGeneratedColumn, OneToOne, ManyToMany, JoinTable, JoinColumn } from 'typeorm'
import { Blog } from './blog.model'
import { RegisteredUser } from './registeredUser.model'

@Entity('like_interactions')
export class LikeInteraction {
  @PrimaryGeneratedColumn('uuid')
  private id!: string

  @OneToOne(() => Blog, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'blogId', referencedColumnName: 'id' })
  private blog!: Blog

  @ManyToMany(() => RegisteredUser)
  @JoinTable({
    name: 'like_interactions_users',
    joinColumn: { name: 'likeInteractionId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'userId', referencedColumnName: 'id' },
  })
  private likers!: RegisteredUser[]

  constructor(blog: Blog) {
    this.blog = blog
  }

  public getId(): string {
    return this.id
  }

  public getBlog(): Blog {
    return this.blog
  }

  public getLikers(): RegisteredUser[] {
    return this.likers
  }

  public addLiker(user: RegisteredUser): void {
    // Kiểm tra nếu likers là mảng trước khi thao tác
    if (Array.isArray(this.likers)) {
      this.likers.push(user)
    } else {
      this.likers = [user] // Nếu likers không phải mảng, khởi tạo mảng mới với user
    }
  }

  public removeLiker(userId: string): void {
    // Loại bỏ user khỏi danh sách likers
    this.likers = this.likers.filter((u) => u.getId() !== userId)
  }
}
