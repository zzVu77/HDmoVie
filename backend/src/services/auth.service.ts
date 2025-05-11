import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import { RegisteredUserRepository } from '~/repositories/registeredUser.repository'
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'access_secret'
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'refresh_secret'

export class AuthService {
  constructor(private registeredUserRepository: RegisteredUserRepository) {}
  async authenticate(email: string, password: string): Promise<{ accessToken: string; refreshToken: string }> {
    try {
      const user = await this.registeredUserRepository.findByEmail(email)
      if (!user) {
        throw new Error('Email is not valid')
      }

      if (!(await bcrypt.compare(password, user.getPassword()))) {
        throw new Error('Password is not valid')
      }

      const payload = {
        id: user.getId(),
        email: user.getEmail(),
        role: user.getRole(),
      }

      const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: '20m' })
      const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: '7d' })

      user.updateToken(refreshToken)
      if (!(await this.registeredUserRepository.update(user))) {
        throw new Error('Cannot update RefreshToken')
      }
      return { accessToken, refreshToken }
    } catch (error) {
      throw new Error(`Failed to get Token  : ${(error as Error).message}`)
    }
  }

  async refreshAccessToken(refreshToken: string): Promise<string> {
    try {
      const decoded = AuthService.verifyRefreshToken(refreshToken) as { id: string; email: string; role: string }

      const user = await this.registeredUserRepository.findByEmail(decoded.email)
      if (!user || user['refreshToken'] !== refreshToken || user.isTokenExpired()) {
        throw new Error('Invalid or expired refresh token')
      }

      const payload = {
        id: decoded.id,
        email: decoded.email,
        role: decoded.role,
      }

      const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: '20m' })

      return accessToken
    } catch (error) {
      throw new Error(`Token refresh failed: ${(error as Error).message}`)
    }
  }

  static verifyRefreshToken(token: string): any {
    try {
      return jwt.verify(token, REFRESH_TOKEN_SECRET)
    } catch {
      throw new Error('Invalid refresh token')
    }
  }

  // static generateAccessToken(payload: any): string {
  //   return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
  // }
}
