import { Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { RegisteredUser } from './registeredUser.model'

@Entity('follow_interactions')
export class FollowInteraction {
  @PrimaryGeneratedColumn('uuid')
  private id!: string

  @OneToOne(() => RegisteredUser, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  private userId!: RegisteredUser

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
}
