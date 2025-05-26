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

  constructor(user: RegisteredUser) {
    this.user = user
  }

  public getFollowers(): RegisteredUser[] {
    if (!this.followers) {
      return []
    }
    return this.followers
  }

  public getFollowings(): RegisteredUser[] {
    if (!this.following) {
      return []
    }
    return this.following
  }

  public getFollowerCount(): number {
    return this.followers.length
  }

  public getFollowingCount(): number {
    return this.following.length
  }
  public getId(): string {
    return this.id
  }
}
