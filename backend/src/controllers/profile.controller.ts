import { Request, Response } from 'express'
import { string } from 'joi'
import { ProfileService } from '~/services/profile.service'

export class ProfileController {
  constructor(private profileService: ProfileService) {}

  // Return the entire profile include: user information, follow counts
  // get/:id
  async get(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.id
      const profile = await this.profileService.getProfile(userId)

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

  // Return the blog lists of user
  // get/:id/blogs?page=0
  async getBlogs(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.id
      const page = parseInt(req.query.page as string) || 0 // Default page = 0
      const pageSize = 5 // Maximum blogs on a page

      const blogs = await this.profileService.getUserBlogs(userId, page, pageSize)

      res.json(blogs)
    } catch (error) {
      console.error('Error fetching blogs:', error)
      res.status(500).json({ message: 'Internal server error' })
    }
  }

  // Return the follower lists of user
  // get/:id/followers
  async getFollowers(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.id
      const followers = await this.profileService.getUserFollowers(userId)

      res.json(followers)
    } catch (error) {
      console.error('Error fetching followers:', error)
      res.status(500).json({ message: 'Internal server error' })
    }
  }

  // Return the following lists of user
  // get/:id/followings
  async getFollowings(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.id
      const followings = await this.profileService.getUserFollowings(userId)

      res.json(followings)
    } catch (error) {
      console.error('Error fetching followings:', error)
      res.status(500).json({ message: 'Internal server error' })
    }
  }
}
