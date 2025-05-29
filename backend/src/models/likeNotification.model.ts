import { IsNotEmpty } from 'class-validator'
import { ChildEntity, JoinColumn, OneToOne } from 'typeorm'
import { Notification } from './notification.model'
import { LikeInteraction } from './likeInteraction.model'
import { RegisteredUser } from './registeredUser.model'

@ChildEntity('LIKE')
export class LikeNotification extends Notification {
  @OneToOne(() => LikeInteraction, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'likeInteractionId', referencedColumnName: 'id' })
  @IsNotEmpty({ message: 'Like interaction is required' })
  protected like!: LikeInteraction

  //Methods
  constructor(like?: LikeInteraction, owner?: RegisteredUser) {
    super()
    if (like) this.like = like
    if (owner) this.owner = owner
  }

  // Getter and Setter
  public getLike(): LikeInteraction {
    return this.like
  }
}
