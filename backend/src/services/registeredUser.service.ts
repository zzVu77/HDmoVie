import bcrypt from 'bcryptjs'
import { RegisteredUser } from '~/models/registeredUser.model'
import { RegisteredUserRepository } from '~/repositories/registeredUser.repository'

export class RegisteredUserService {
  constructor(private registeredUserRepository: RegisteredUserRepository) {}
  async createUser(userData: RegisteredUser): Promise<RegisteredUser> {
    try {
      if (!RegisteredUser.isValidDOB(userData)) {
        throw new Error('User must be at least 16 years old')
      }
      const existingUser = await this.registeredUserRepository.findByEmail(userData.getEmail())
      if (existingUser) {
        throw new Error('Email is existence')
      }
      // hash password
      userData.setPassword(await bcrypt.hash(userData.getPassword(), 8))
      // Save user
      return await this.registeredUserRepository.create(userData)
    } catch (error) {
      throw new Error(`Failed to create user  : ${(error as Error).message}`)
    }
  }
}
