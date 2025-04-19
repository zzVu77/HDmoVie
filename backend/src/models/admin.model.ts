import { ChildEntity } from 'typeorm'
import { RegisteredUser } from './registeredUser.model'
@ChildEntity('ADMIN')
export class Admin extends RegisteredUser {
  constructor(username: string, email: string, password: string, fullName: string, dateOfBirth: Date) {
    super(username, email, password, fullName, dateOfBirth)
    this.role = 'ADMIN'
  }

  public manageUsers(): string {
    return `Admin ${this.fullName} is managing users.`
  }

  public getUserInfo(): string {
    return `Admin: ${this.fullName} (${this.email})`
  }
}
