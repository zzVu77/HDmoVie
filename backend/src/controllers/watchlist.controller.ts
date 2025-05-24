import { Request, Response } from 'express'
import { WatchlistService } from '~/services/watchlist.service'

export class WatchlistController {
  constructor(private watchlistService: WatchlistService) {}

  // POST: /watchlists/create
  async createWatchlist(req: Request, res: Response): Promise<void> {
    try {
      const { title, description, isPublic } = req.body

      // Use user ID from auth middleware
      const ownerId = res.locals.user.id

      const createdMovie = await this.watchlistService.createWatchlist(title, description, isPublic, ownerId)
      res.status(201).json(createdMovie)
    } catch (error) {
      console.error('Error creating watchlist: ', error)
      res.status(400).json({ status: 'failed', message: (error as Error).message })
    }
  }

  // POST: /watchlists/create-fast
  async createWatchlistFast(req: Request, res: Response): Promise<void> {
    try {
      const { title } = req.body

      // Use user ID from auth middleware
      const ownerId = res.locals.user.id

      const createdMovie = await this.watchlistService.createWatchlistFast(title, ownerId)
      res.status(201).json(createdMovie)
    } catch (error) {
      console.error('Error creating watchlist: ', error)
      res.status(400).json({ message: (error as Error).message })
    }
  }

  // PUT: /watchlists/:wid/update
  async updateWatchlist(req: Request, res: Response): Promise<void> {
    try {
      const watchlistId = req.params.wid
      const { title, description, isPublic } = req.body

      // Use user ID from auth middleware
      const senderId = res.locals.user.id

      const updatedWatchlist = await this.watchlistService.updateWatchlist(
        watchlistId,
        title,
        description,
        isPublic,
        senderId,
      )

      if (!updatedWatchlist) {
        res.status(404).json({ status: 'failed', message: 'Watchlist not found' })
        return
      }

      res.status(200).json(updatedWatchlist)
    } catch (error) {
      console.error('Error updating watchlist: ', error)
      res.status(400).json({ status: 'failed', message: (error as Error).message })
    }
  }

  // DELETE: /watchlists/:wid/delete
  async deleteWatchlist(req: Request, res: Response): Promise<void> {
    try {
      const wid = req.params.wid

      // Use user ID from auth middleware
      const senderId = res.locals.user.id

      const isDeleted = await this.watchlistService.deleteWatchlist(wid, senderId)
      if (!isDeleted) {
        res
          .status(404)
          .json({ status: 'failed', message: 'Watchlist not found or you do not have permission to delete it' })
      } else {
        res.status(200).json({ status: 'success', message: 'Watchlist has been deleted successfully' })
      }
    } catch (error) {
      console.error('Error deleting watchlist: ', error)
      res.status(400).json({ status: 'failed', message: (error as Error).message })
    }
  }

  // DELETE: /watchlists/:wid/:mid/delete
  async deleteMovie(req: Request, res: Response): Promise<void> {
    try {
      const watchlistId = req.params.wid
      const movieId = req.params.mid

      // Use user ID from auth middleware
      const senderId = res.locals.user.id

      const updatedWatchlist = await this.watchlistService.deleteMovie(movieId, watchlistId, senderId)

      if (updatedWatchlist) {
        res.status(200).json({
          message: 'Movie has been removed from the watchlist',
          watchlist: updatedWatchlist,
        })
      } else {
        res
          .status(404)
          .json({ message: 'Movie not found in watchlist or you do not have permission to modify this watchlist' })
      }
    } catch (error) {
      console.error('Error removing movie from watchlist: ', error)
      res.status(400).json({ message: (error as Error).message })
    }
  }

  // PUT: /watchlists/:wid/add/:mid
  async addMovie(req: Request, res: Response): Promise<void> {
    try {
      const watchlistId = req.params.wid
      const movieId = req.params.mid

      // Use user ID from auth middleware
      const senderId = res.locals.user.id

      const updatedWatchlist = await this.watchlistService.addMovie(movieId, watchlistId, senderId)

      if (updatedWatchlist) {
        res.status(200).json({
          message: 'Movie has been added to the watchlist',
          watchlist: updatedWatchlist,
        })
      } else {
        res.status(400).json({
          message: 'Movie already exists in the watchlist or you do not have permission to modify this watchlist',
        })
      }
    } catch (error) {
      console.error('Error adding movie to watchlist:', error)
      res.status(400).json({ message: (error as Error).message })
    }
  }
}
