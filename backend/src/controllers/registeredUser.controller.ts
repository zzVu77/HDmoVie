import { Request, Response } from 'express'
import { RegisteredUserService } from '../services/registeredUser.service'

export class RegisteredUserController {
  constructor(private registeredUserService: RegisteredUserService) {}

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
}
