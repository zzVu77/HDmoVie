import { Request, Response } from 'express'
import { WatchlistService } from '~/services/watchlist.service'

export class WatchlistController {
  constructor(private watchlistService: WatchlistService) {}

  // POST: /watchlists/create
  async createWatchlist(req: Request, res: Response): Promise<void> {
    try {
      const { title, description, isPublic, ownerId } = req.body
      const createdMovie = await this.watchlistService.createWatchlist(title, description, isPublic, ownerId)
      res.status(200).json(createdMovie)
    } catch (error) {
      console.error('Error creating watchlist: ', error)
      res.status(400).json({ message: (error as Error).message })
    }
  }

  // PUT: /watchlists/update/:wid
  async updateWatchlist(req: Request, res: Response): Promise<void> {
    try {
      const watchlistId = req.params.wid
      const { title, description, isPublic, senderId } = req.body
      const updatedWatchlist = await this.watchlistService.updateWatchlist(
        watchlistId,
        title,
        description,
        isPublic,
        senderId,
      )

      if (!updatedWatchlist) {
        res.status(404).json({ message: 'Watchlist not found' })
        return
      }

      res.status(200).json(updatedWatchlist)
    } catch (error) {
      console.error('Error updating watchlist: ', error)
      res.status(400).json({ message: (error as Error).message })
    }
  }
}
