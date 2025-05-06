import { RegisteredUser } from '~/models/registeredUser.model'
import { WatchlistBuilder } from './watchlist.builder'
import { Watchlist } from '~/models/watchlist.model'

export class FullWatchlistBuilder implements WatchlistBuilder {
  private watchlist: Watchlist

  constructor(
    owner: RegisteredUser,
    private title: string,
    private description: string,
    private isPublic: boolean,
  ) {
    this.watchlist = new Watchlist(owner)
  }

  buildTitle(): void {
    this.watchlist.setTitle(this.title)
  }

  buildDescription(): void {
    this.watchlist.setDescription(this.description)
  }

  buildPrivacy(): void {
    this.watchlist.setIsPublic(this.isPublic)
  }

  getResult(): Watchlist {
    return this.watchlist
  }
}
