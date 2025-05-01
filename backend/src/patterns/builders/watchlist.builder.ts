import { Watchlist } from '~/models/watchlist.model'

export interface WatchlistBuilder {
  buildTitle(): void
  buildDescription(): void
  buildPrivacy(): void
  getResult(): Watchlist
}
