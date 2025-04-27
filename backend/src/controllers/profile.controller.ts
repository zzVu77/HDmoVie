import { Request, Response } from 'express'
import { ProfileService } from '~/services/profile.service'

export class ProfileController {
  constructor(private profileService: ProfileService) {}

  // Return the entire profile include: user information, blogs, watchlists, follow counts
  // get/:id
  async get(req: Request, res: Response): Promise<void> {
    try {
      const profile = await this.profileService.getProfile(req.params.id)

      // In case profile is null
      if (!profile) {
        res.status(404).json({ message: 'Profile not found' })
        return
      }

      res.json(profile)
    } catch (error) {
      console.error('Error fetching profile:', error)
      res.status(500).json({ message: 'Internal server error' })
    }
  }
}
