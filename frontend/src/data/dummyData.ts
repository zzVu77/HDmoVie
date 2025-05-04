import { CastType, MovieType } from '@/types'

export const dummyDataCast: CastType[] = [
  {
    id: '1',
    name: 'John Doe',
    profilePath: 'https://image.tmdb.org/t/p/original/a4dRvxh2csK8pnMVz5Xrh8MrE8X.jpg',
  },
  {
    id: '2',
    name: 'Jane Smith',
    profilePath: 'https://image.tmdb.org/t/p/original/a4dRvxh2csK8pnMVz5Xrh8MrE8X.jpg',
  },
  {
    id: '3',
    name: 'Alice Johnson',
    profilePath: 'https://image.tmdb.org/t/p/original/a4dRvxh2csK8pnMVz5Xrh8MrE8X.jpg',
  },
]
export const dummyMovies: MovieType[] = [
  {
    id: '1',
    posterSource: 'https://image.tmdb.org/t/p/original/O7REXWPANWXvX2jhQydHjAq2DV.jpg',
    backdropSource: 'https://image.tmdb.org/t/p/original/yMoEGh8kDEwqsoJumnQLwFJ9V6h.jpg',
    release: '2023',
    title: 'The Hidden Treasure',
    voteAvg: 8.1,
    description: 'A thrilling adventure to uncover a long-lost treasure hidden in the depths of the jungle.',
    genres: [
      { id: '1', name: 'Action' },
      { id: '8', name: 'Adventure' },
    ],
  },
  {
    id: '2',
    posterSource: 'https://image.tmdb.org/t/p/original/janjdSMrTRGtPrI1p9uOX66jv7x.jpg',
    backdropSource: 'https://image.tmdb.org/t/p/original/hNA73rnG4PjSwgojaC2gbO1f8Rt.jpg',
    release: '2022',
    title: 'Love in the Air',
    voteAvg: 7.3,
    description: 'A heartwarming romance that blossoms amidst unexpected challenges.',
    genres: [
      { id: '3', name: 'Romance' },
      { id: '4', name: 'Drama' },
    ],
  },
  {
    id: '3',
    posterSource: 'https://image.tmdb.org/t/p/original/O7REXWPANWXvX2jhQydHjAq2DV.jpg',
    backdropSource: 'https://image.tmdb.org/t/p/original/fzv87rT0jlAkh5Uf9PpIlUj6Nj8.jpg',
    release: '2021',
    title: 'Galactic Wars',
    voteAvg: 9.2,
    description: 'An epic battle for survival in a galaxy torn apart by war.',
    genres: [
      { id: '5', name: 'Sci-Fi' },
      { id: '6', name: 'Thriller' },
    ],
  },
  {
    id: '4',
    posterSource: 'https://image.tmdb.org/t/p/original/janjdSMrTRGtPrI1p9uOX66jv7x.jpg',
    backdropSource: 'https://image.tmdb.org/t/p/original/o5vasl0xbZWWKQnAlaBTSgntHH2.jpg',
    release: '2020',
    title: 'The Enigma',
    voteAvg: 8.0,
    description: 'A mysterious tale of secrets and puzzles that will keep you guessing until the end.',
    genres: [
      { id: '7', name: 'Mystery' },
      { id: '8', name: 'Adventure' },
    ],
  },
  {
    id: '5',
    posterSource: 'https://image.tmdb.org/t/p/original/O7REXWPANWXvX2jhQydHjAq2DV.jpg',
    backdropSource: 'https://image.tmdb.org/t/p/original/yMoEGh8kDEwqsoJumnQLwFJ9V6h.jpg',
    release: '2019',
    title: 'Family Fun Night',
    voteAvg: 7.6,
    description: 'A delightful comedy that brings the whole family together for laughs and joy.',
    genres: [
      { id: '9', name: 'Comedy' },
      { id: '10', name: 'Family' },
    ],
  },
  {
    id: '6',
    posterSource: 'https://image.tmdb.org/t/p/original/janjdSMrTRGtPrI1p9uOX66jv7x.jpg',
    backdropSource: 'https://image.tmdb.org/t/p/original/hNA73rnG4PjSwgojaC2gbO1f8Rt.jpg',
    release: '2018',
    title: 'The Last Frontier',
    voteAvg: 8.4,
    description: 'An action-packed journey to the edge of the world, filled with danger and discovery.',
    genres: [
      { id: '1', name: 'Action' },
      { id: '2', name: 'Adventure' },
    ],
  },
  {
    id: '7',
    posterSource: 'https://image.tmdb.org/t/p/original/O7REXWPANWXvX2jhQydHjAq2DV.jpg',
    backdropSource: 'https://image.tmdb.org/t/p/original/fzv87rT0jlAkh5Uf9PpIlUj6Nj8.jpg',
    release: '2017',
    title: 'Romantic Getaway',
    voteAvg: 7.9,
    description: 'A romantic escape to a picturesque destination, where love conquers all.',
    genres: [
      { id: '3', name: 'Romance' },
      { id: '4', name: 'Drama' },
    ],
  },
  {
    id: '8',
    posterSource: 'https://image.tmdb.org/t/p/original/janjdSMrTRGtPrI1p9uOX66jv7x.jpg',
    backdropSource: 'https://image.tmdb.org/t/p/original/o5vasl0xbZWWKQnAlaBTSgntHH2.jpg',
    release: '2016',
    title: 'Cosmic Voyage',
    voteAvg: 9.1,
    description: 'A breathtaking journey through the cosmos, exploring the wonders of the universe.',
    genres: [
      { id: '5', name: 'Sci-Fi' },
      { id: '6', name: 'Thriller' },
    ],
  },
  {
    id: '9',
    posterSource: 'https://image.tmdb.org/t/p/original/O7REXWPANWXvX2jhQydHjAq2DV.jpg',
    backdropSource: 'https://image.tmdb.org/t/p/original/yMoEGh8kDEwqsoJumnQLwFJ9V6h.jpg',
    release: '2015',
    title: 'Secrets of the Ancient City',
    voteAvg: 8.3,
    description: 'An archaeological adventure uncovering the mysteries of an ancient civilization.',
    genres: [
      { id: '7', name: 'Mystery' },
      { id: '8', name: 'Adventure' },
    ],
  },
  {
    id: '10',
    posterSource: 'https://image.tmdb.org/t/p/original/janjdSMrTRGtPrI1p9uOX66jv7x.jpg',
    backdropSource: 'https://image.tmdb.org/t/p/original/hNA73rnG4PjSwgojaC2gbO1f8Rt.jpg',
    release: '2014',
    title: 'Laugh Out Loud',
    voteAvg: 7.7,
    description: 'A hilarious comedy that will have you laughing from start to finish.',
    genres: [
      { id: '9', name: 'Comedy' },
      { id: '10', name: 'Family' },
    ],
  },
]
export const dummyComments = [
  {
    userName: 'John Doe',
    comment: 'This movie was absolutely amazing! The story was captivating.',
    rating: 4.8,
    date: '2025-04-30',
  },
  {
    userName: 'Jane Smith',
    comment: 'I enjoyed the visuals, but the plot was a bit predictable.',
    rating: 3.5,
    date: '2025-04-29',
  },
  {
    userName: 'Michael Johnson',
    comment: 'A masterpiece! The acting and direction were top-notch .',
    rating: 5.0,
    date: '2025-04-28',
  },
  {
    userName: 'Emily Davis',
    comment: 'Not my cup of tea, but I can see why others might like it.',
    rating: 2.8,
    date: '2025-04-27',
  },
  {
    userName: 'Chris Brown',
    comment: 'Great movie for a family night. Highly recommend it!',
    rating: 4.2,
    date: '2025-04-26',
  },
]
export const dummyGenres = [
  { id: '1', name: 'Action' },
  { id: '2', name: 'Adventure' },
  { id: '3', name: 'Romance' },
]
