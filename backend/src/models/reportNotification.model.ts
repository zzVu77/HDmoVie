import { IsNotEmpty } from 'class-validator'
import { ChildEntity, JoinColumn, ManyToOne } from 'typeorm'
import { Notification } from './notification.model'
import { Report } from './report.model'

@ChildEntity('REPORT')
export class ReportNotification extends Notification {
  @ManyToOne(() => Report, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'reportId', referencedColumnName: 'id' })
  @IsNotEmpty({ message: 'Report is required' })
  protected report!: Report
  //Methods
  // Getter and Setter
  public getReport(): Report {
    return this.report
  }
}
