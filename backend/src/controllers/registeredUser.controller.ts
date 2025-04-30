import { Request, Response } from 'express'
import { RegisteredUserService } from '~/services/registeredUser.service'
import { RegisteredUser } from '~/models/registeredUser.model'
export class RegisteredUserController {
  constructor(private registeredUserService: RegisteredUserService) {}

  async register(req: Request, res: Response): Promise<void> {
    try {
      const data = req.body
      // Create instance RegisterUser
      const userData = new RegisteredUser(data.email, data.password, data.fullName, data.dateOfBirth)
      // move to service
      const newUser = await this.registeredUserService.createUser(userData)
      res.status(201).json(newUser)
    } catch (error) {
      console.error('Error creating user:', error)
      res.status(400).json({ message: (error as Error).message })
    }
  }
}
