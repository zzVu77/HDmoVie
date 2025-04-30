import { Request, Response } from 'express'
import { WatchlistService } from '~/services/watchlist.service'

export class WatchlistController {
  constructor(private watchlistService: WatchlistService) {}

  // POST: /watchlists/create
  async createWatchlist(req: Request, res: Response): Promise<void> {
    try {
      const { title, description, isPublic, ownerId } = req.body
      res.status(201).json(await this.watchlistService.createWatchlist(title, description, isPublic, ownerId))
    } catch (error) {
      console.error('Error creating watchlist: ', error)
      res.status(400).json({ message: (error as Error).message })
    }
  }
}
