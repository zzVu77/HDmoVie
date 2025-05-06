import { Watchlist } from '~/models/watchlist.model'

export interface WatchlistCreator {
  createWatchlist(): Watchlist
}
