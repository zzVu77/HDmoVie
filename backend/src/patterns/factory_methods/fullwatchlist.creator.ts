import { WatchlistCreator } from './watchlist.creator'
import { FullWatchlistBuilder } from '../builders/fullwatchlist.builder'
import { Watchlist } from '~/models/watchlist.model'
import { RegisteredUser } from '~/models/registeredUser.model'

export class FullWatchlistCreator implements WatchlistCreator {
  constructor(
    private owner: RegisteredUser,
    private title: string,
    private description: string,
    private isPrivate: boolean,
  ) {}

  createWatchlist(): Watchlist {
    const builder = new FullWatchlistBuilder(this.owner, this.title, this.description, this.isPrivate)
    builder.buildTitle()
    builder.buildDescription()
    builder.buildPrivacy()
    return builder.getResult()
  }
}
