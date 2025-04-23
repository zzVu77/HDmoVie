import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, TableInheritance } from 'typeorm'
import { RegisteredUser } from './registeredUser.model'

export enum ReportReason {
  SPAM = 'Spam or scams',
  DISCRIMINATION = 'Hate speech or discrimination',
  FALSE_INFORMATION = 'Misinformation or false information',
  HARASSMENT = 'Harassment or bullying',
  VIOLENCE = 'Violence or threats of violence',
  ILLEGAL_CONTENT = 'Illegal content or activity',
  SEXUAL_CONTENT = 'Sexual content or nudity',
}

@Entity('reports')
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export abstract class Report {
  @PrimaryGeneratedColumn('uuid')
  protected id!: string

  @Column({ type: 'enum', enum: ReportReason })
  protected reason!: ReportReason

  @ManyToOne(() => RegisteredUser, { nullable: false, onDelete: 'CASCADE' })
  protected reporter!: RegisteredUser

  constructor(data?: Partial<Report>) {
    if (data) {
      Object.assign(this, data)
    }
  }
}
