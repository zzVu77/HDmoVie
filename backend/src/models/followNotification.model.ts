import { IsNotEmpty } from 'class-validator'
import { ChildEntity, JoinColumn, ManyToOne } from 'typeorm'
import { Notification } from './notification.model'
import { RegisteredUser } from './registeredUser.model'

@ChildEntity('FOLLOW_NOTI')
export class FollowNotification extends Notification {
  @ManyToOne(() => RegisteredUser, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'followerId', referencedColumnName: 'id' })
  @IsNotEmpty({ message: 'Follower is required' })
  protected follower!: RegisteredUser
  //Methods
  // Getter and Setter
  public getFollower(): RegisteredUser {
    return this.follower
  }
}
