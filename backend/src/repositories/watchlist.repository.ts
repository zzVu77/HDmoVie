import { DataSource, FindOptionsWhere, Repository } from 'typeorm'
import { Watchlist } from '~/models/watchlist.model'

export class WatchlistRepository {
  private repository: Repository<Watchlist>

  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(Watchlist)
  }

  async findById(watchlistId: string): Promise<Watchlist | null> {
    try {
      return await this.repository.findOne({
        select: {
          id: true,
          title: true,
          description: true,
          isPublic: true,
          owner: { id: true, email: true, fullName: true, dateOfBirth: true, role: false },
          movies: true,
        } as FindOptionsWhere<Watchlist>,
        where: { id: watchlistId } as FindOptionsWhere<Watchlist>,
        relations: ['movies', 'movies.genres', 'owner'],
      })
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  async findByUserId(userId: string, offset: number, amount: number): Promise<Watchlist[]> {
    try {
      return this.repository.find({
        select: {
          id: true,
          title: true,
          description: true,
          isPublic: true,
          owner: { id: true, email: true, fullName: true, dateOfBirth: true, role: false },
          movies: true,
        } as FindOptionsWhere<Watchlist>,
        where: { owner: { id: userId } } as FindOptionsWhere<Watchlist>,
        skip: offset,
        take: amount,
        relations: ['movies', 'movies.genres', 'owner'],
      })
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      const result = await this.repository.delete(id)
      return result.affected !== 0
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  async create(watchlist: Watchlist): Promise<Watchlist> {
    try {
      return await this.repository.save(watchlist)
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  async update(watchlist: Watchlist): Promise<Watchlist> {
    try {
      return await this.repository.save(watchlist)
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }
}
