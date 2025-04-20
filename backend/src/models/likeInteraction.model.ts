import { Entity, PrimaryGeneratedColumn, OneToOne, ManyToMany, JoinTable, JoinColumn } from 'typeorm'
import { Blog } from './blog.model'
import { RegisteredUser } from './registeredUser.model'

@Entity('like_interactions')
export class LikeInteraction {
  @PrimaryGeneratedColumn('uuid')
  private id!: string

  @OneToOne(() => Blog, { nullable: false })
  @JoinColumn({ name: 'blogId', referencedColumnName: 'id' })
  private blog!: Blog

  @ManyToMany(() => RegisteredUser)
  @JoinTable({
    name: 'like_interactions_users',
    joinColumn: { name: 'like_interaction_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'user_id', referencedColumnName: 'id' },
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
//Usage example
// async function addUserToLikeInteraction(blogId: string, user: RegisteredUser) {
//   const likeInteractionRepo = getRepository(LikeInteraction);
//   const likeInteraction = await likeInteractionRepo.findOne({
//     where: { blog: { id: blogId } },
//     relations: ['likers'],
//   });
//   if (likeInteraction) {
//     likeInteraction.addLiker(user); // this.likers.push(user) bên trong
//     await likeInteractionRepo.save(likeInteraction); // Lưu vào cơ sở dữ liệu
//   }
// }
