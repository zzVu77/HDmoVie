import { Request, Response } from 'express'
import { RegisteredUserService } from '~/services/registeredUser.service'
import { AuthService } from '~/services/auth.service'

import { RegisteredUser } from '~/models/registeredUser.model'
export class RegisteredUserController {
  constructor(
    private registeredUserService: RegisteredUserService,
    private authService: AuthService,
  ) {}

  async register(req: Request, res: Response): Promise<void> {
    try {
      const data = req.body
      // Create instance RegisterUser
      // move to service
      const newUser = await this.registeredUserService.createUser(
        data.email,
        data.password,
        data.fullName,
        data.dateOfBirth,
      )
      res.status(201).json(newUser)
    } catch (error) {
      console.error('Error creating user:', error)
      res.status(400).json({ message: (error as Error).message })
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const data = req.body
      const { accessToken, refreshToken } = await this.authService.authenticate(data.email, data.password)

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Chỉ dùng secure trong production
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 ngày
      })
      console.log('Login Succeess')
      res.status(200).json({ accessToken })
    } catch (error) {
      console.error('Error login user:', error)
      res.status(400).json({ message: (error as Error).message })
    }
  }
  async getProfile(req: Request, res: Response): Promise<void> {
    try {
      console.log(res.locals.user)
      res.status(200).json({ message: 'success' })
    } catch (error) {
      console.error('Error login user:', error)
      res.status(400).json({ message: (error as Error).message })
    }
  }
  async logout(req: Request, res: Response): Promise<void> {
    try {
      // Clear refresh token cookie
      res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      })

      res.status(200).json({ status: 'success', message: 'Logged out successfully' })
    } catch (error) {
      console.error('Error during logout:', error)
      res.status(500).json({ status: 'failed', message: 'Internal server error' })
    }
  }
  async forgotPassword(req: Request, res: Response) {
    const { email } = req.body
    const result = await this.registeredUserService.forgotPassword(email)
    res.status(result.success ? 200 : 400).json(result)
  }

  async resetPassword(req: Request, res: Response) {
    const { email, otp, password } = req.body
    const result = await this.registeredUserService.resetPassword(email, otp, password)
    res.status(result.success ? 200 : 400).json(result)
  }

  async verifyOtp(req: Request, res: Response) {
    const { email, otp } = req.body
    const result = await this.registeredUserService.verifyOtpForReset(email, otp)
    res.status(result.success ? 200 : 400).json(result)
  }
}
