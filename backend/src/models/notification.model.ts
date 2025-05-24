import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, TableInheritance, JoinColumn } from 'typeorm'
import { RegisteredUser } from './registeredUser.model'
import { IsNotEmpty, IsDate, IsIn } from 'class-validator'

@Entity('notifications')
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export abstract class Notification {
  @PrimaryGeneratedColumn('uuid')
  protected id!: string

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @IsDate({ message: 'Invalid timestamp' })
  @IsNotEmpty({ message: 'Timestamp is required' })
  protected time!: Date

  @Column({ type: 'varchar', default: 'UNREAD' })
  @IsIn(['UNREAD', 'READ'], { message: 'Status must be UNREAD or READ' })
  @IsNotEmpty({ message: 'Status is required' })
  protected status: 'UNREAD' | 'READ' = 'UNREAD'

  @ManyToOne(() => RegisteredUser, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'ownerId', referencedColumnName: 'id' })
  @IsNotEmpty({ message: 'Owner is required' })
  protected owner!: RegisteredUser
  //Methods
  // Getter and Setter
  public getId(): string {
    return this.id
  }

  public getTime(): Date {
    return this.time
  }

  public getStatus(): 'UNREAD' | 'READ' {
    return this.status
  }

  public getOwner(): RegisteredUser {
    return this.owner
  }

  public setStatus(status: 'UNREAD' | 'READ'): void {
    this.status = status
  }
}
