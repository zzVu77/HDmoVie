import { RegisteredUser } from '~/models/registeredUser.model'
import { Watchlist } from '~/models/watchlist.model'
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

      if (owner == null) {
        throw new Error("User doesn't exist")
      }
      const newWatchlistt = new Watchlist(title, description, isPublic, owner)
      return this.watchlistRepository.create(newWatchlistt)
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }
}
