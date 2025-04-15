import { ChildEntity } from 'typeorm'
import { Account } from './account.model'
@ChildEntity('REGSITERED_USER')
export class RegisteredUser extends Account {
  // Additional properties specific to RegisteredUser can be added here
}
