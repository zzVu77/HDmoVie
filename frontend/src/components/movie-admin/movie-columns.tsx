import { Checkbox } from '@/components/ui/checkbox'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, Eye, PencilLine, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ConfirmAlertDialog } from '../shared/ConfirmAlertDialog'
import { Button } from '../ui/button'
import { CastType, GenreType, MovieInfoModal, MovieType } from './MovieInfoModal'

const columns: ColumnDef<MovieType>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Title
        <ArrowUpDown className='ml-2 h-4 w-4' />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue('title') || 'N/A'}</div>,
  },
  {
    accessorKey: 'release',
    header: 'Release Date',
    cell: ({ row }) => {
      const releaseDate = row.getValue('release') as string
      return <div>{releaseDate ? new Date(releaseDate).toLocaleDateString() : 'N/A'}</div>
    },
  },
  {
    accessorKey: 'genres',
    header: 'Genres',
    cell: ({ row }) => {
      const genres = row.getValue('genres') as GenreType[]
      return <div>{genres?.map((g) => g.name).join(', ') || 'N/A'}</div>
    },
    filterFn: (row, id, value) => {
      const genres = row.getValue(id) as GenreType[]
      return genres?.some((g) => g.name.toLowerCase().includes(value.toLowerCase()))
    },
  },
  {
    accessorKey: 'voteAvg',
    header: ({ column }) => (
      <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Vote Average
        <ArrowUpDown className='ml-2 h-4 w-4' />
      </Button>
    ),
    cell: ({ row }) => {
      const voteAvg = row.getValue('voteAvg') as number
      return <div>{voteAvg ? voteAvg.toFixed(1) : 'N/A'}</div>
    },
  },
  {
    accessorKey: 'voteCount',
    header: 'Vote Count',
    cell: ({ row }) => {
      const voteCount = row.getValue('voteCount') as number
      return <div>{voteCount ? voteCount.toLocaleString() : 'N/A'}</div>
    },
  },
  {
    accessorKey: 'casts',
    header: 'Casts',
    cell: ({ row }) => {
      const casts = row.getValue('casts') as CastType[]
      return <div>{casts?.map((c) => c.name).join(', ') || 'N/A'}</div>
    },
    filterFn: (row, id, value) => {
      const casts = row.getValue(id) as CastType[]
      return casts?.some((c) => c.name.toLowerCase().includes(value.toLowerCase()))
    },
  },
  {
    accessorKey: 'trailerSource',
    header: 'Trailer Source',
    cell: ({ row }) => <div className='truncate max-w-xs'>{row.getValue('trailerSource') || 'N/A'}</div>,
  },
  {
    accessorKey: 'posterSource',
    header: 'Poster',
    cell: ({ row }) => {
      const posterSource = row.getValue('posterSource') as string
      return posterSource ? <img src={posterSource} alt='Poster' className='h-16 w-12 object-cover rounded' /> : 'N/A'
    },
    enableSorting: false,
  },
  {
    accessorKey: 'backdropSource',
    header: 'Backdrop',
    cell: ({ row }) => {
      const backdropSource = row.getValue('backdropSource') as string
      return backdropSource ? (
        <img src={backdropSource} alt='Backdrop' className='h-16 w-28 object-cover rounded' />
      ) : (
        'N/A'
      )
    },
    enableSorting: false,
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: () => {
      return (
        <div className='flex items-center justify-between gap-2 '>
          <Link to='/movie' className='block'>
            <Eye className='h-4 w-4 text-primary-dark cursor-pointer' />
          </Link>

          <MovieInfoModal
            icon={<PencilLine className='h-4 w-4 text-primary-dark cursor-pointer' />}
            onSave={() => {}}
          ></MovieInfoModal>

          {/* <MovieInfoModal
            icon={<BadgePlus className='h-4 w-4 text-primary-dark cursor-pointer' />}
            onSave={() => {}}
          ></MovieInfoModal> */}

          <ConfirmAlertDialog
            title=''
            description='Are you sure you want to delete this movie? This action cannot be undone.'
            onConfirm={() => {}}
            trigger={<Trash2 className='h-4 w-4 text-primary-dark cursor-pointer' />}
            cancelText='No, go back'
            confirmText='Yes, proceed'
          />
        </div>
      )
    },
  },
]
export const data: MovieType[] = [
  {
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
  },
  {
    id: '2',
    title: 'The Matrix',
    release: '1999-03-31',
    voteAvg: 8.7,
    voteCount: 28000,
    genres: [{ name: 'Sci-Fi' }, { name: 'Action' }],
    casts: [{ name: 'Keanu Reeves' }, { name: 'Laurence Fishburne' }],
    description: 'A hacker discovers a mysterious truth about his reality.',
    trailerSource: 'https://www.youtube.com/watch?v=m8e-FF8MsqU',
    posterSource: 'https://image.tmdb.org/t/p/original/janjdSMrTRGtPrI1p9uOX66jv7x.jpg',
    backdropSource: 'https://image.tmdb.org/t/p/original/ce3prrjh9ZehEl5JinNqr4jIeaB.jpg',
  },
  {
    id: '3',
    title: 'Interstellar',
    release: '2014-11-07',
    voteAvg: 8.6,
    voteCount: 32000,
    genres: [{ name: 'Sci-Fi' }, { name: 'Adventure' }],
    casts: [{ name: 'Matthew McConaughey' }, { name: 'Anne Hathaway' }],
    description: 'A team of explorers travel through a wormhole in space.',
    trailerSource: 'https://www.youtube.com/watch?v=zSWdZVtXT7E',
    posterSource: 'https://image.tmdb.org/t/p/original/janjdSMrTRGtPrI1p9uOX66jv7x.jpg',
    backdropSource: 'https://image.tmdb.org/t/p/original/ce3prrjh9ZehEl5JinNqr4jIeaB.jpg',
  },
]

export default columns
