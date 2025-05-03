import { MovieInfoModal } from '@/components/movie-admin/MovieInfoModal'
import { ConfirmAlertDialog } from '@/components/shared/ConfirmAlertDialog'
import { Button } from '@/components/ui/button'
const data = {
  id: '1',
  title: 'Inception',
  release: '2010-07-16',
  voteAvg: 8.8,
  voteCount: 35000,
  genres: [{ name: 'Sci-Fi' }, { name: 'Action' }],
  casts: [{ name: 'Leonardo DiCaprio' }, { name: 'Joseph Gordon-Levitt' }],
  description: 'A thief who steals corporate secrets through dream infiltration technology.',
  trailerSource: 'https://www.youtube.com/watch?v=YoHD9XEInc0',
  posterSource: 'https://image.tmdb.org/t/p/original/janjdSMrTRGtPrI1p9uOX66jv7x.jpg',
  backdropSource: 'https://image.tmdb.org/t/p/original/ce3prrjh9ZehEl5JinNqr4jIeaB.jpg',
}
const TestComponent = () => {
  return (
    <div>
      <MovieInfoModal onSave={() => {}} movie={data}>
        Test component
      </MovieInfoModal>
      <ConfirmAlertDialog
        title='Confirm Action'
        description='This will perform an irreversible action. Proceed?'
        onConfirm={() => {}}
        trigger={<Button variant='destructive'>Perform Action</Button>}
        cancelText='No, go back'
        confirmText='Yes, proceed'
      />
    </div>
  )
}

export default TestComponent
