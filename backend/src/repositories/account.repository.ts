// import { Repository, getRepository } from 'typeorm'

// import { validate } from 'class-validator'
// import { Admin } from '~/models/admin.model'
// import { Account } from '~/models/account.model'
// import { RegisteredUser } from '~/models/registeredUser.model'

// /**
//  * Repository for handling Account-related operations.
//  */
// export class AccountRepository {
//   private repository: Repository<Account>

//   constructor() {
//     this.repository = getRepository(Account)
//   }

//   /**
//    * Create a new RegisteredUser.
//    */
//   async createRegisteredUser(userData: Partial<RegisteredUser>): Promise<RegisteredUser> {
//     const user = new RegisteredUser(userData)
//     const errors = await validate(user)
//     if (errors.length > 0) {
//       throw new Error(`Validation failed: ${JSON.stringify(errors)}`)
//     }
//     return this.repository.save(user) as Promise<RegisteredUser>
//   }

//   /**
//    * Create a new Admin.
//    */
//   async createAdmin(adminData: Partial<Admin>): Promise<Admin> {
//     const admin = new Admin(adminData)
//     const errors = await validate(admin)
//     if (errors.length > 0) {
//       throw new Error(`Validation failed: ${JSON.stringify(errors)}`)
//     }
//     return this.repository.save(admin) as Promise<Admin>
//   }

//   /**
//    * Find an account by ID.
//    */
//   async findById(id: string): Promise<Account | undefined> {
//     return this.repository.findOne({ where: { id } })
//   }

//   /**
//    * Update an account's information.
//    */
//   async updateAccount(id: string, updateData: Partial<Account>): Promise<Account> {
//     const account = await this.findById(id)
//     if (!account) {
//       throw new Error('Account not found')
//     }
//     Object.assign(account, updateData)
//     const errors = await validate(account)
//     if (errors.length > 0) {
//       throw new Error(`Validation failed: ${JSON.stringify(errors)}`)
//     }
//     return this.repository.save(account)
//   }

//   /**
//    * Check if an account is an Admin.
//    */
//   async isAdmin(id: string): Promise<boolean> {
//     const account = await this.findById(id)
//     return account instanceof Admin
//   }
// }
