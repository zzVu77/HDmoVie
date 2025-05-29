import { IsNotEmpty } from 'class-validator'
import { ChildEntity, JoinColumn, ManyToOne } from 'typeorm'
import { Notification } from './notification.model'
import { RegisteredUser } from './registeredUser.model'

@ChildEntity('FOLLOW')
export class FollowNotification extends Notification {
  @ManyToOne(() => RegisteredUser, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'followerId', referencedColumnName: 'id' })
  @IsNotEmpty({ message: 'Follower is required' })
  protected follower!: RegisteredUser
  //Methods
  constructor(follower?: RegisteredUser, owner?: RegisteredUser) {
    super()
    if (follower) this.follower = follower
    if (owner) this.owner = owner
  }
  // Getter and Setter
  public getFollower(): RegisteredUser {
    return this.follower
  }
}
