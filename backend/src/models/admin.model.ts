import { ChildEntity } from 'typeorm'
import { RegisteredUser } from './registeredUser.model'
@ChildEntity('ADMIN')
export class Admin extends RegisteredUser {
  // Additional properties specific to Admin can be added here
}
