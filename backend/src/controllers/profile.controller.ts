import { Request, Response } from 'express'
import { BlogService } from '~/services/blog.service'
import { FollowInteractionService } from '~/services/followInteraction.service'
import { ProfileService } from '~/services/profile.service'
import { RegisteredUserService } from '~/services/registeredUser.service'
import { WatchlistService } from '~/services/watchlist.service'

export class ProfileController {
  constructor(
    private profileService: ProfileService,
    private registeredUserService: RegisteredUserService,
    private followInteractionService: FollowInteractionService,
    private blogService: BlogService,
    private watchlistService: WatchlistService,
  ) {}

  // Return self profile include: user information, follow counts
  // get/
  async getSelf(req: Request, res: Response): Promise<void> {
    try {
      const userId = res.locals.user?.id
      const senderId = userId
      const profile = await this.profileService.getProfile(userId, senderId)

      // In case profile is null
      if (!profile) {
        res.status(404).json({ message: 'Profile not found' })
        return
      }

      res.json(profile)
    } catch (error) {
      console.log('Error self fetching profile:, ', error)
      res.status(500).json({ message: 'Internal server error' })
    }
  }

  // Return the entire profile include: user information, follow counts
  // get/:id
  async get(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.id
      const senderId = res.locals.user?.id
      const profile = await this.profileService.getProfile(userId, senderId)

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

      const blogs = await this.blogService.getUserBlogs(userId, page)

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
      const followers = await this.followInteractionService.getUserFollowers(userId)

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
      const followings = await this.followInteractionService.getUserFollowings(userId)

      res.json(followings)
    } catch (error) {
      console.error('Error fetching followings:', error)
      res.status(500).json({ message: 'Internal server error' })
    }
  }

  // Return the watchlists of user
  // get/:id/watchlists?page=0
  async getWatchlists(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.id
      const senderId = res.locals.user?.id
      const page = parseInt(req.query.page as string) || 0 // Default page = 0

      const watchlists = await this.watchlistService.getUserWatchlists(userId, senderId, page)

      res.json(watchlists)
    } catch (error) {
      console.error('Error fetching followings:', error)
      res.status(500).json({ message: 'Internal server error' })
    }
  }

  // Return the watchlist detail
  // get/:id/watchlists/:wid
  async getWatchlistDetail(req: Request, res: Response): Promise<void> {
    try {
      const watchlistId = req.params.wid
      const senderId = res.locals.user?.id

      const watchlist = await this.watchlistService.getWatchlistDetail(watchlistId, senderId)

      if (!watchlist) {
        res.status(404).json({ message: 'Watchlist not found' })
        return
      }

      res.json(watchlist)
    } catch (error) {
      console.error('Error fetching followings:', error)
      res.status(500).json({ message: 'Internal server error' })
    }
  }

  // POST: /profile/:id/update
  // Update personal iformation: fname & dob
  async updateInfor(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.id
      const { fullName, dateOfBirth } = req.body
      const senderId = res.locals.user?.id
      const updatedUser = await this.registeredUserService.updateInfor(
        userId,
        fullName,
        new Date(dateOfBirth),
        senderId,
      )
      res.status(200).json(updatedUser)
    } catch (error) {
      res.status(400).json({ message: (error as Error).message })
    }
  }

  // POST: /profile/:id/change-password
  async changePassword(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.id
      const { oldPassword, newPassword } = req.body
      const senderId = res.locals.user?.id
      await this.registeredUserService.changePassword(userId, oldPassword, newPassword, senderId)
      res.status(200).json({ message: 'Password changed successfully' })
    } catch (error) {
      res.status(400).json({ message: (error as Error).message })
    }
  }
}
