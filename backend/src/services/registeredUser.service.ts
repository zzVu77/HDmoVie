import { RegisteredUserRepository } from '../repositories/registeredUser.repository'
import bcrypt from 'bcrypt'
import { redisClient } from '~/config/redis'
import otpGenerator from 'otp-generator'
import { sendOtpEmail } from './mail.service'

export class RegisteredUserService {
  constructor(private registeredUserRepository: RegisteredUserRepository) {}

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
}
