import { IsNotEmpty } from 'class-validator'
import { ChildEntity, JoinColumn, ManyToOne } from 'typeorm'
import { Notification } from './notification.model'
import { RegisteredUser } from './registeredUser.model'

@ChildEntity('LIKE')
export class LikeNotification extends Notification {
  @ManyToOne(() => RegisteredUser, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  @IsNotEmpty({ message: 'User is required' })
  protected user!: RegisteredUser
  //Methods
  constructor(user?: RegisteredUser, owner?: RegisteredUser) {
    super()
    if (user) this.user = user
    if (owner) this.owner = owner
  }
  // Getter and Setter
  public getUser(): RegisteredUser {
    return this.user
  }
}
