import bcrypt from 'bcryptjs'
import { RegisteredUser } from '~/models/registeredUser.model'
import { RegisteredUserRepository } from '~/repositories/registeredUser.repository'

export class RegisteredUserService {
  constructor(private registeredUserRepository: RegisteredUserRepository) {}
  async createUser(userData: RegisteredUser): Promise<RegisteredUser> {
    try {
      // Create user instance using createNewUser
      const userInstance = userData
      const existingUser = await this.registeredUserRepository.findByEmail(userInstance.getEmail())
      if (existingUser) {
        throw new Error('Email is existence')
      }
      // hash password
      userInstance.setPassword(await bcrypt.hash(userInstance.getPassword(), 8))
      // Save user
      return await this.registeredUserRepository.create(userInstance)
    } catch (error) {
      throw new Error(`Failed to create user  : ${(error as Error).message}`)
    }
  }
}
