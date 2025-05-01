// import { User } from '../entities/User';
// import { UserRepository } from '../repositories/UserRepository';

// export class UserService {
//   constructor(private userRepository: UserRepository) {}

//   async getAllUsers(): Promise<User[]> {
//     return this.userRepository.findAll();
//   }

//   async getUserById(id: number): Promise<User | null> {
//     return this.userRepository.findById(id);
//   }

//   async createUser(userData: Partial<User>): Promise<User> {
//     // Thêm logic validate hoặc xử lý business logic nếu cần
//     if (!userData.email || !userData.name || !userData.password) {
//       throw new Error('Missing required fields');
//     }
//     return this.userRepository.create(userData);
//   }

//   async updateUser(id: number, userData: Partial<User>): Promise<User | null> {
//     return this.userRepository.update(id, userData);
//   }

//   async deleteUser(id: number): Promise<void> {
//     return this.userRepository.delete(id);
//   }
// }

import bcrypt from 'bcryptjs'
import { RegisteredUser } from '../models/registeredUser.model'
import { RegisteredUserRepository } from '../repositories/registeredUser.repository'

export class RegisteredUserService {
  constructor(private registeredUserRepository: RegisteredUserRepository) {}

  async updateInfor(id: string, fullName: string, dob: Date, senderId: string): Promise<RegisteredUser> {
    if (id !== senderId) {
      throw new Error('Unauthorized: You can only update your own profile.')
    }

    const user = await this.registeredUserRepository.findById(id)
    if (!user) {
      throw new Error('User not found.')
    }

    user.setFullName(fullName).setDob(dob)

    return await this.registeredUserRepository.update(user)
  }

  async changePassword(id: string, oldPassword: string, newPassword: string, senderId: string): Promise<void> {
    if (id !== senderId) throw new Error('Unauthorized')

    const user = await this.registeredUserRepository.findByIdWithPassword(id)
    if (!user) throw new Error('User not found')

    const isMatch = await bcrypt.compare(oldPassword, user.getPassword())
    if (!isMatch) throw new Error('Old password is incorrect')

    const hashedPassword = await bcrypt.hash(newPassword, 8)
    user.setPassword(hashedPassword)

    await this.registeredUserRepository.update(user)
  }
}
