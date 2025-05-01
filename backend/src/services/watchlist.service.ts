import { RegisteredUser } from '~/models/registeredUser.model'
import { Watchlist } from '~/models/watchlist.model'
import { MovieRepository } from '~/repositories/movie.repository'
import { RegisteredUserRepository } from '~/repositories/registeredUser.repository'
import { WatchlistRepository } from '~/repositories/watchlist.repository'
import { FullWatchlistCreator } from '~/patterns/factory_methods/fullwatchlist.creator'
import { SimpleWatchlistCreator } from '~/patterns/factory_methods/simplewatchlist.creator'

export class WatchlistService {
  constructor(
    private watchlistRepository: WatchlistRepository,
    private registeredUserRepository: RegisteredUserRepository,
    private movieRepository: MovieRepository,
  ) {}

  public async getUserWatchlists(userId: string, page: number): Promise<Watchlist[]> {
    try {
      const pageSize = 10
      const offset = page * pageSize
      return await this.watchlistRepository.findByUserId(userId, offset, pageSize)
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  public async getWatchlistDetail(watchlistId: string, senderId: string): Promise<Watchlist | null> {
    try {
      const watchlist = await this.watchlistRepository.findById(watchlistId)

      if (!watchlist) {
        return null
      }

      const isOwner = watchlist.getOwner().getId() === senderId
      if (watchlist.isPrivate() && !isOwner) {
        throw new Error('Unauthorized access to private watchlist')
      }

      return watchlist
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  async createWatchlist(title: string, description: string, isPublic: boolean, ownerId: string): Promise<Watchlist> {
    try {
      // Find owner object
      const owner = await this.registeredUserRepository.findById(ownerId)

      if (owner === null) {
        throw new Error("User doesn't exist")
      }

      const fullWatchlistCreator = new FullWatchlistCreator(owner, title, description, isPublic)
      const newWatchlistt = fullWatchlistCreator.createWatchlist()
      return await this.watchlistRepository.create(newWatchlistt)
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  async createWatchlistFast(title: string, ownerId: string): Promise<Watchlist> {
    try {
      // Find owner object
      const owner = await this.registeredUserRepository.findById(ownerId)

      if (owner === null) {
        throw new Error("User doesn't exist")
      }

      const simpleWatchlistCreator = new SimpleWatchlistCreator(owner, title)
      const newWatchlistt = simpleWatchlistCreator.createWatchlist()
      return await this.watchlistRepository.create(newWatchlistt)
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

  async deleteMovie(movieId: string, watchlistId: string, senderId: string): Promise<Watchlist | null> {
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
        return await this.watchlistRepository.update(watchlist)
      }

      return null
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  async addMovie(movieId: string, watchlistId: string, senderId: string): Promise<Watchlist | null> {
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

      // Find movie
      const newMovie = await this.movieRepository.findById(movieId)

      // Check movie existance
      if (!newMovie) {
        throw new Error('Movie does not exist')
      }

      // Add movie
      const isAdded = watchlist.addMovie(newMovie)

      if (isAdded) {
        return await this.watchlistRepository.update(watchlist)
      }

      return null
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }
}
