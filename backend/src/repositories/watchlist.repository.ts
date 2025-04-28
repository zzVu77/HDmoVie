import { DataSource, FindOptionsWhere, Repository } from 'typeorm'
import { Watchlist } from '~/models/watchlist.model'

export class WatchlistRepository {
  private repository: Repository<Watchlist>

  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(Watchlist)
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
