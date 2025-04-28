import { DataSource, FindOptionsWhere, Repository } from 'typeorm'
import { Watchlist } from '~/models/watchlist.model'

export class WatchlistRepository {
  private repository: Repository<Watchlist>

  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(Watchlist)
  }

  async find(watchlistId: string): Promise<Watchlist | null> {
    return this.repository.findOne({
      where: { id: watchlistId } as FindOptionsWhere<Watchlist>,
      relations: ['movies'],
    })
  }

  async findByUserId(userId: string, offset: number, amount: number): Promise<Watchlist[]> {
    return this.repository.find({
      where: { owner: { id: userId } } as FindOptionsWhere<Watchlist>,
      skip: offset,
      take: amount,
      select: ['id', 'title', 'description', 'isPublic'],
      relations: ['movies'],
    })
  }
}
