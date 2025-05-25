import { RegisteredUserRepository } from '../repositories/registeredUser.repository'
import { redisClient } from '~/config/redis'
import otpGenerator from 'otp-generator'
import { sendOtpEmail } from './mail.service'
import bcrypt from 'bcryptjs'
import { RegisteredUser } from '../models/registeredUser.model'

export class RegisteredUserService {
  constructor(private registeredUserRepository: RegisteredUserRepository) {}

  async createUser(email: string, password: string, fullName: string, dateOfBirth: Date): Promise<RegisteredUser> {
    try {
      const userData = new RegisteredUser(email, password, fullName, dateOfBirth)
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
  private async verifyOtp(email: string, otp: string) {
    const savedOtp = await redisClient.get(`otp:${email}`)
    if (!savedOtp) {
      return { success: false, errorMessage: 'OTP expired' }
    }
    if (savedOtp !== otp) {
      return { success: false, errorMessage: 'Invalid OTP' }
    }
    return { success: true }
  }
  async verifyOtpForReset(email: string, otp: string) {
    const verifyResult = await this.verifyOtp(email, otp)
    if (!verifyResult.success) {
      return verifyResult
    }

    // Nếu verify thành công, chúng ta có thể thêm một flag trong Redis
    // để đánh dấu rằng OTP đã được verify và có thể dùng để reset password
    const resetKey = `reset:${email}`
    await redisClient.set(resetKey, 'verified', { EX: 5 * 60 }) // 5 phút để reset password

    return { success: true, message: 'OTP verified successfully' }
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
    const verifyResult = await this.verifyOtp(email, otp)
    if (!verifyResult.success) {
      return verifyResult
    }

    // Check xem có flag reset không
    const resetKey = `reset:${email}`
    const canReset = await redisClient.get(resetKey)
    if (!canReset) {
      return { success: false, errorMessage: 'Please verify OTP first' }
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

    if (!RegisteredUser.isValidDOB(user)) {
      throw new Error('User must be at least 16 years old')
    }

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
