import { WatchlistCreator } from './watchlist.creator'
import { SimpleWatchlistBuilder } from '../builders/simplewatchlist.builder'
import { Watchlist } from '~/models/watchlist.model'
import { RegisteredUser } from '~/models/registeredUser.model'
import { WatchlistBuilder } from '../builders/watchlist.builder'

export class SimpleWatchlistCreator implements WatchlistCreator {
  constructor(
    private owner: RegisteredUser,
    private title: string,
  ) {}

  createWatchlist(): Watchlist {
    const builder = new SimpleWatchlistBuilder(this.owner, this.title)
    builder.buildTitle()
    builder.buildDescription()
    builder.buildPrivacy()
    return builder.getResult()
  }
}
