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
        where: { id: watchlistId } as FindOptionsWhere<Watchlist>,
        relations: ['movies', 'owner'],
      })
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  async findByUserId(userId: string, offset: number, amount: number): Promise<Watchlist[]> {
    try {
      return this.repository.find({
        where: { owner: { id: userId } } as FindOptionsWhere<Watchlist>,
        skip: offset,
        take: amount,
        relations: ['movies'],
      })
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  async delete(watchlistId: string): Promise<void> {
    try {
      await this.repository.delete(watchlistId)
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
