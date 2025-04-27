import { Request, Response } from 'express'
import { RegisteredUserService } from '~/services/registeredUser.service'
import { RegisteredUser } from '~/models/registeredUser.model'
export class RegisteredUserController {
  constructor(private registeredUserService: RegisteredUserService) {}

  async register(req: Request, res: Response): Promise<void> {
    try {
      const { email, password, fullName, dateOfBirth } = req.body
      // move to service
      const newUser = await this.registeredUserService.createUser(email, password, fullName, dateOfBirth)
      res.status(201).json(newUser)
    } catch (error) {
      console.error('Error creating user:', error)
      res.status(400).json({ message: (error as Error).message })
    }
  }
}
