import { Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { RegisteredUser } from './registeredUser.model'

@Entity('follow_interactions')
export class FollowInteraction {
  @PrimaryGeneratedColumn('uuid')
  private id!: string

  @OneToOne(() => RegisteredUser, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  private user!: RegisteredUser

  @ManyToMany(() => RegisteredUser)
  @JoinTable({
    name: 'followers_interactions_users',
    joinColumn: { name: 'followInteractionId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'userId', referencedColumnName: 'id' },
  })
  private followers!: RegisteredUser[]
  @ManyToMany(() => RegisteredUser)
  @JoinTable({
    name: 'following_interactions_users',
    joinColumn: { name: 'followInteractionId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'userId', referencedColumnName: 'id' },
  })
  private following!: RegisteredUser[]
  //Methods

  public getFollowers(): RegisteredUser[] {
    return this.followers
  }

  public getFollowings(): RegisteredUser[] {
    return this.following
  }

  public getFollowerCount(): number {
    return this.followers.length
  }

  public getFollowingCount(): number {
    return this.following.length
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
