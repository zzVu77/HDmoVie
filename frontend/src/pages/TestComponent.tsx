import { EditProfileModal } from '@/components/EditProfileModal'
import FollowInteractionModal from '@/components/FollowInteractionModal'
import WatchlistCard from '@/components/WatchlistCard'
import WatchlistInformationFormModal from '@/components/WatchlistInformationFormModal'
import WatchlistItem from '@/components/WatchlistItem'
import { FollowPeopleProps, RegisteredUserProps, WatchlistMovieProps } from '@/types'
import { WatchlistProps } from '@/types'

const dummyFollowers: FollowPeopleProps[] = []

const dummyFollowings = [
  { id: '1', fullName: 'Alice Johnson' },
  { id: '2', fullName: 'Benjamin Lee' },
  { id: '3', fullName: 'Carla Mendes' },
  { id: '4', fullName: 'David Kim' },
  { id: '5', fullName: 'Ella Thompson' },
  { id: '6', fullName: 'Frank Zhang' },
  { id: '7', fullName: 'Grace Patel' },
  { id: '8', fullName: 'Hector Alvarez' },
  { id: '9', fullName: 'Isla Morgan' },
  { id: '10', fullName: 'Jack O’Brien' },
  { id: '11', fullName: 'Kara Nguyen' },
  { id: '12', fullName: 'Liam Garcia' },
  { id: '13', fullName: 'Maya Wilson' },
  { id: '14', fullName: 'Noah Schroeder' },
  { id: '15', fullName: 'Olivia Rossi' },
  { id: '16', fullName: 'Peter Blake' },
  { id: '17', fullName: 'Quinn Harper' },
  { id: '18', fullName: 'Ruby Adams' },
  { id: '19', fullName: 'Samuel Cohen' },
  { id: '20', fullName: 'Tara Singh' },
  { id: '21', fullName: 'Umar Richards' },
  { id: '22', fullName: 'Violet Brooks' },
  { id: '23', fullName: 'William Knight' },
  { id: '24', fullName: 'Ximena Lopez' },
  { id: '25', fullName: 'Yara Hussein' },
  { id: '26', fullName: 'Zane Whitman' },
  { id: '27', fullName: 'Amira Becker' },
  { id: '28', fullName: 'Brian Castillo' },
  { id: '29', fullName: 'Cecilia Grant' },
  { id: '30', fullName: 'Diego Navarro' },
]

const dummyUser: RegisteredUserProps = {
  id: '12345',
  fullName: 'Delux',
  email: 'd3lxux@example.com',
  dateOfBirth: new Date('1990-01-01'),
}

const dummyWatchlist1: WatchlistProps = {
  title: 'Sci-Fi Favorites',
  description: 'A collection of the best science fiction movies.',
  isPublic: true,
  movies: [
    {
      id: '1',
      title: 'Inception',
      description: 'A mind-bending thriller about dreams within dreams.',
      posterSource: 'https://cdn.myanimelist.net/images/anime/1712/148299.jpg',
      backdropSource: 'https://image.tmdb.org/t/p/original/fTrQsdMS2MUw00RnzH0r3JWHhts.jpg',
      releaseYear: '2010',
      voteAvg: 8.8,
      voteCount: 2000000,
      genres: [
        { id: '1', name: 'Sci-Fi' },
        { id: '2', name: 'Thriller' },
      ],
    },
    {
      id: '2',
      title: 'Interstellar',
      description: 'A journey through space and time to save humanity.',
      posterSource: 'https://cdn.myanimelist.net/images/anime/1712/148299.jpg',
      backdropSource: 'https://image.tmdb.org/t/p/original/fTrQsdMS2MUw00RnzH0r3JWHhts.jpg',
      releaseYear: '2014',
      voteAvg: 8.6,
      voteCount: 1500000,
      genres: [
        { id: '1', name: 'Sci-Fi' },
        { id: '3', name: 'Adventure' },
      ],
    },
    {
      id: '3',
      title: 'The Matrix',
      description: 'A hacker discovers the truth about his reality.',
      posterSource: 'https://cdn.myanimelist.net/images/anime/1712/148299.jpg',
      backdropSource: 'https://image.tmdb.org/t/p/original/fTrQsdMS2MUw00RnzH0r3JWHhts.jpg',
      releaseYear: '1999',
      voteAvg: 8.7,
      voteCount: 1700000,
      genres: [
        { id: '1', name: 'Sci-Fi' },
        { id: '4', name: 'Action' },
      ],
    },
    {
      id: '4',
      title: 'Blade Runner 2049',
      description: 'A sequel to the classic Blade Runner, exploring AI and humanity.',
      posterSource: 'https://cdn.myanimelist.net/images/anime/1712/148299.jpg',
      backdropSource: 'https://image.tmdb.org/t/p/original/fTrQsdMS2MUw00RnzH0r3JWHhts.jpg',
      releaseYear: '2017',
      voteAvg: 8.0,
      voteCount: 1200000,
      genres: [
        { id: '1', name: 'Sci-Fi' },
        { id: '5', name: 'Drama' },
      ],
    },
  ],
}

const dummyWatchlist2: WatchlistProps = {
  title: 'Action Blockbusters',
  description:
    'An adrenaline-pumping collection of high-octane action movies that will keep you on the edge of your seat. From superhero epics to post-apocalyptic thrillers, this watchlist features some of the most iconic and explosive films in the genre, showcasing unforgettable characters, intense battles, and breathtaking stunts.',
  isPublic: false,
  movies: [
    {
      id: '5',
      title: 'The Dark Knight',
      description: 'A gritty superhero movie featuring Batman.',
      posterSource: '',
      backdropSource: '',
      releaseYear: '2008',
      voteAvg: 9.0,
      voteCount: 2500000,
      genres: [
        { id: '4', name: 'Action' },
        { id: '5', name: 'Drama' },
      ],
    },
    {
      id: '6',
      title: 'Mad Max: Fury Road',
      description: 'A post-apocalyptic action-packed thrill ride.',
      posterSource: 'https://cdn.myanimelist.net/images/anime/1712/148299.jpg',
      backdropSource: 'https://image.tmdb.org/t/p/original/fTrQsdMS2MUw00RnzH0r3JWHhts.jpg',
      releaseYear: '2015',
      voteAvg: 8.1,
      voteCount: 1300000,
      genres: [
        { id: '4', name: 'Action' },
        { id: '3', name: 'Adventure' },
      ],
    },
    {
      id: '7',
      title: 'John Wick',
      description: 'A retired hitman seeks vengeance for his dog.',
      posterSource: 'https://cdn.myanimelist.net/images/anime/1712/148299.jpg',
      backdropSource: 'https://image.tmdb.org/t/p/original/fTrQsdMS2MUw00RnzH0r3JWHhts.jpg',
      releaseYear: '2014',
      voteAvg: 7.4,
      voteCount: 1000000,
      genres: [
        { id: '4', name: 'Action' },
        { id: '6', name: 'Crime' },
      ],
    },
    {
      id: '8',
      title: 'Avengers: Endgame',
      description: 'The epic conclusion to the Avengers saga.',
      posterSource: 'https://cdn.myanimelist.net/images/anime/1712/148299.jpg',
      backdropSource: 'https://image.tmdb.org/t/p/original/fTrQsdMS2MUw00RnzH0r3JWHhts.jpg',
      releaseYear: '2019',
      voteAvg: 8.4,
      voteCount: 2200000,
      genres: [
        { id: '4', name: 'Action' },
        { id: '7', name: 'Superhero' },
      ],
    },
  ],
}

const dummyWatchlists = [dummyWatchlist1, dummyWatchlist2]

const dummyWatchlistMovies: WatchlistMovieProps[] = [
  {
    id: '1',
    title: 'Inception',
    description:
      'A mind-bending thriller about dreams within dreams, where a skilled thief is given a chance at redemption if he can successfully perform an almost impossible task: planting an idea into someone’s subconscious. The movie explores the boundaries of reality and imagination, with stunning visuals and a gripping narrative.',
    posterSource: 'https://cdn.myanimelist.net/images/anime/1712/148299.jpg',
    backdropSource: 'https://image.tmdb.org/t/p/original/fTrQsdMS2MUw00RnzH0r3JWHhts.jpg',
    releaseYear: '2010',
    voteAvg: 8.8,
    voteCount: 2000000,
    genres: [
      { id: '1', name: 'Sci-Fi' },
      { id: '2', name: 'Thriller' },
    ],
    casts: [
      { id: '1', name: 'Leonardo DiCaprio', profilePath: 'https://www.imdb.com/name/nm0000138/' },
      { id: '2', name: 'Joseph Gordon-Levitt', profilePath: 'https://www.imdb.com/name/nm0330687/' },
      { id: '3', name: 'Elliot Page', profilePath: 'https://www.imdb.com/name/nm0680983/' },
      { id: '4', name: 'Tom Hardy', profilePath: 'https://www.imdb.com/name/nm0362766/' },
    ],
  },
  {
    id: '2',
    title: 'Interstellar',
    description:
      'A journey through space and time to save humanity, where a group of explorers ventures through a wormhole in search of a new home for mankind. The movie delves into themes of love, sacrifice, and the unyielding human spirit, with breathtaking visuals and a powerful emotional core.',
    posterSource: 'https://cdn.myanimelist.net/images/anime/1712/148299.jpg',
    backdropSource: 'https://image.tmdb.org/t/p/original/fTrQsdMS2MUw00RnzH0r3JWHhts.jpg',
    releaseYear: '2014',
    voteAvg: 8.6,
    voteCount: 1500000,
    genres: [
      { id: '1', name: 'Sci-Fi' },
      { id: '3', name: 'Adventure' },
    ],
    casts: [
      { id: '1', name: 'Matthew McConaughey', profilePath: 'https://www.imdb.com/name/nm0000190/' },
      { id: '2', name: 'Anne Hathaway', profilePath: 'https://www.imdb.com/name/nm0004266/' },
      { id: '3', name: 'Jessica Chastain', profilePath: 'https://www.imdb.com/name/nm1567113/' },
      { id: '4', name: 'Michael Caine', profilePath: 'https://www.imdb.com/name/nm0000323/' },
    ],
  },
]

const dummyWatchlistEdit: WatchlistProps = {
  id: '1',
  title: 'My Favorite Movies',
  description: 'A collection of my all-time favorite movies.',
  isPublic: true,
}

const TestComponent = () => {
  return (
    <>
      <div>
        <h1>TEST</h1>
      </div>
      <div className='flex items-center justify-center'>
        <FollowInteractionModal followers={dummyFollowers} followings={dummyFollowings} />
      </div>
      <div>
        <h1>TEST</h1>
      </div>
      <div className='flex items-center justify-center'>
        <EditProfileModal
          id={dummyUser.id}
          fullName={dummyUser.fullName}
          email={dummyUser.email}
          dateOfBirth={dummyUser.dateOfBirth}
        />
      </div>
      <div>
        <h1>TEST</h1>
      </div>
      <div className='flex flex-col items-center justify-center gap-y-5'>
        {dummyWatchlists.map((watchlist) => (
          <WatchlistCard
            title={watchlist.title}
            description={watchlist.description}
            isPublic={watchlist.isPublic}
            movies={watchlist.movies}
          />
        ))}
      </div>
      <div>
        <h1>TEST</h1>
      </div>
      <div className='flex flex-col items-center justify-center gap-y-5'>
        {dummyWatchlistMovies.map((movie, index) => (
          <WatchlistItem
            index={index + 1}
            title={movie.title}
            description={movie.description}
            posterSource={movie.posterSource}
            backdropSource={movie.backdropSource}
            releaseYear={movie.releaseYear}
            voteAvg={movie.voteAvg}
            voteCount={movie.voteCount}
            genres={movie.genres}
            casts={movie.casts}
          />
        ))}
      </div>
      <div>
        <h1>TEST</h1>
      </div>
      <div className='flex flex-col items-center justify-center gap-y-5'>
        <WatchlistInformationFormModal watchlist={dummyWatchlistEdit} isAdd={false} />
        <WatchlistInformationFormModal
          isAdd={true}
          watchlist={{ title: '', description: '', isPublic: false, movies: [] }}
        />
      </div>
    </>
  )
}

export default TestComponent
