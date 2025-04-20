import { IsNotEmpty } from 'class-validator'
import { ChildEntity, JoinColumn, ManyToOne } from 'typeorm'
import { Notification } from './notification.model'
import { RegisteredUser } from './registeredUser.model'

@ChildEntity('LIKE_NOTI')
export class LikeNotification extends Notification {
  @ManyToOne(() => RegisteredUser, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  @IsNotEmpty({ message: 'User is required' })
  protected user!: RegisteredUser
  //Methods
  // Getter and Setter
  public getUser(): RegisteredUser {
    return this.user
  }
}
