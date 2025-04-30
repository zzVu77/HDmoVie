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
  //Methods
  public getLikers(): RegisteredUser[] {
    return this.likers
  }
  public addLiker(user: RegisteredUser): void {
    if (!this.likers.some((u) => u.getId() === user.getId())) {
      this.likers.push(user)
    }
  }
  public removeLiker(userId: string): void {
    this.likers = this.likers.filter((u) => u.getId() !== userId)
  }
}
