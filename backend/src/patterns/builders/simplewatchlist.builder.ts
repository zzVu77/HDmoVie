import { RegisteredUser } from '~/models/registeredUser.model'
import { WatchlistBuilder } from './watchlist.builder'
import { Watchlist } from '~/models/watchlist.model'

export class SimpleWatchlistBuilder implements WatchlistBuilder {
  private watchlist: Watchlist

  constructor(
    owner: RegisteredUser,
    private title: string,
  ) {
    this.watchlist = new Watchlist(owner)
  }

  buildTitle(): void {
    this.watchlist.setTitle(this.title)
  }

  buildDescription(): void {
    this.watchlist.setDescription('')
  }

  buildPrivacy(): void {
    this.watchlist.setIsPublic(true)
  }

  getResult(): Watchlist {
    return this.watchlist
  }
}
