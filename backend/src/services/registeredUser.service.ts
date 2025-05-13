import { RegisteredUserRepository } from '../repositories/registeredUser.repository'
import { redisClient } from '~/config/redis'
import otpGenerator from 'otp-generator'
import { sendOtpEmail } from './mail.service'
import bcrypt from 'bcryptjs'
import { RegisteredUser } from '../models/registeredUser.model'

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
      throw new Error(`${(error as Error).message}`)
    }
  }
  async forgotPassword(email: string) {
    const user = await this.registeredUserRepository.findOneByEmail(email)
    if (!user) {
      return { success: false, errorMessage: 'Email not found' }
    }

    const otpCode = otpGenerator.generate(6, {
      digits: true,
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    })

    const redisKey = `otp:${email}`
    const validTime = 10 // minutes
    await redisClient.set(redisKey, otpCode, { EX: validTime * 60 })

    // Gửi mail
    await sendOtpEmail(email, otpCode)

    return { success: true, message: 'OTP sent to email', validTime }
  }

  async resetPassword(email: string, otp: string, newPassword: string) {
    const savedOtp = await redisClient.get(`otp:${email}`)
    if (savedOtp !== otp) {
      return { success: false, errorMessage: 'Invalid OTP' }
    }

    const user = await this.registeredUserRepository.findOneByEmail(email)
    if (!user) {
      return { success: false, errorMessage: 'User not found' }
    }

    const hashed = await bcrypt.hash(newPassword, 8)
    user.setPassword(hashed)
    await this.registeredUserRepository.save(user)
    await redisClient.del(`otp:${email}`)

    return { success: true, message: 'Password reset successfully' }
  }

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
