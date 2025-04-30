import { RegisteredUser } from '~/models/registeredUser.model'
import { Watchlist } from '~/models/watchlist.model'
import { MovieRepository } from '~/repositories/movie.repository'
import { RegisteredUserRepository } from '~/repositories/registeredUser.repository'
import { WatchlistRepository } from '~/repositories/watchlist.repository'

export class WatchlistService {
  constructor(
    private watchlistRepository: WatchlistRepository,
    private registeredUserRepository: RegisteredUserRepository,
  ) {}

  async createWatchlist(title: string, description: string, isPublic: boolean, ownerId: string): Promise<Watchlist> {
    try {
      // Find owner object
      const owner = await this.registeredUserRepository.findById(ownerId)

      if (owner === null) {
        throw new Error("User doesn't exist")
      }
      const newWatchlistt = new Watchlist(title, description, isPublic, owner)
      return this.watchlistRepository.create(newWatchlistt)
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  async updateWatchlist(
    id: string,
    title: string,
    description: string,
    isPublic: boolean,
    senderId: string,
  ): Promise<Watchlist | null> {
    try {
      // Find watchlist
      const watchlist = await this.watchlistRepository.findById(id)

      // Check existance
      if (watchlist === null) {
        throw new Error('Watchlist does not exist')
      }

      // Check valid
      if (senderId !== watchlist.getOwner().getId()) {
        throw new Error('Invalid request')
      }

      watchlist.updateInformation(title, description, isPublic)
      return await this.watchlistRepository.update(watchlist)
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  async deleteWatchlist(id: string, senderId: string): Promise<boolean> {
    try {
      // Find watchlist
      const watchlist = await this.watchlistRepository.findById(id)

      // Check existance
      if (watchlist === null) {
        throw new Error('Watchlist does not exist')
      }

      // Check valid
      if (senderId !== watchlist.getOwner().getId()) {
        throw new Error('Unauthorized to perform action')
      }

      return await this.watchlistRepository.delete(id)
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  async deleteMovie(movieId: string, watchlistId: string, senderId: string): Promise<boolean> {
    try {
      // Find watchlist
      const watchlist = await this.watchlistRepository.findById(watchlistId)

      // Check existance
      if (watchlist === null) {
        throw new Error('Watchlist does not exist')
      }

      // Check authorization
      if (watchlist.getOwner().getId() !== senderId) {
        throw new Error('Unauthorized to perform action')
      }

      const isDeleted = watchlist.removeMovie(movieId)

      if (isDeleted) {
        await this.watchlistRepository.update(watchlist)
        return true
      }

      return false
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }
}
