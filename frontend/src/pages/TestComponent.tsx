import Carousel3D from '@/components/Carousel3D'
// const data = {
//   id: '1',
//   title: 'Inception',
//   release: '2010-07-16',
//   voteAvg: 8.8,
//   voteCount: 35000,
//   genres: [{ name: 'Sci-Fi' }, { name: 'Action' }],
//   casts: [{ name: 'Leonardo DiCaprio' }, { name: 'Joseph Gordon-Levitt' }],
//   description: 'A thief who steals corporate secrets through dream infiltration technology.',
//   trailerSource: 'https://www.youtube.com/watch?v=YoHD9XEInc0',
//   posterSource: 'https://image.tmdb.org/t/p/original/janjdSMrTRGtPrI1p9uOX66jv7x.jpg',
//   backdropSource: 'https://image.tmdb.org/t/p/original/ce3prrjh9ZehEl5JinNqr4jIeaB.jpg',
// }
import 'react-responsive-3d-carousel/dist/styles.css'

const TestComponent = () => {
  return (
    <div>
      <Carousel3D></Carousel3D>
    </div>
  )
}

export default TestComponent
