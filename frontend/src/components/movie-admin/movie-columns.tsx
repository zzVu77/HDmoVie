import { Checkbox } from '@/components/ui/checkbox'
import { ColumnDef } from '@tanstack/react-table'
import { Eye, PencilLine, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ConfirmAlertDialog } from '../shared/ConfirmAlertDialog'
import { ImageDialogCell } from '../shared/ImageDialogCell'
import { Button } from '../ui/button'
import { CastType, GenreType, MovieType } from '@/types'
import { MovieInfoModal } from './MovieInfoModal'
import { deleteMovie } from '@/services/movieService'
import { toast } from 'sonner'

export const columns = (genres: GenreType[]): ColumnDef<MovieType>[] => [
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
    accessorKey: 'id',
    header: ({ column }) => (
      <Button variant='ghost' className='w-fit' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        ID
        {/* <ArrowUpDown className='ml-2 h-4 w-4' /> */}
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue('id') || 'N/A'}</div>,
  },
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Title
        {/* <ArrowUpDown className='ml-2 h-4 w-4' /> */}
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
        {/* <ArrowUpDown className='ml-2 h-4 w-4' /> */}
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
    cell: ({ row }) => <div className='truncate w-full'>{row.getValue('trailerSource') || 'N/A'}</div>,
  },
  {
    accessorKey: 'posterSource',
    header: 'Poster',
    cell: ({ row }) => {
      const posterSource = row.getValue('posterSource') as string
      return posterSource ? (
        <ImageDialogCell
          src={posterSource}
          alt='Poster'
          smallClassName='h-16 w-12'
          largeClassName='max-w-sm w-full h-auto'
        />
      ) : (
        'N/A'
      )
    },
    enableSorting: false,
  },
  {
    accessorKey: 'backdropSource',
    header: 'Backdrop',
    cell: ({ row }) => {
      const backdropSource = row.getValue('backdropSource') as string
      return backdropSource ? (
        <ImageDialogCell
          src={backdropSource}
          alt='Poster'
          smallClassName='h-16 w-12'
          largeClassName='max-w-sm w-full h-auto'
        />
      ) : (
        'N/A'
      )
    },
    enableSorting: false,
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const movieId = row.getValue('id') as number
      const handleDelete = async () => {
        try {
          await deleteMovie(row.original.id)
          toast.success('Movie deleted successfully')
        } catch {
          throw Error("Can't delete")
        }
      }

      return (
        <div className='flex items-center justify-between gap-2 '>
          <Link to={`/movie/${movieId}`} className='block'>
            <Eye className='h-4 w-4 text-primary-dark cursor-pointer' />
          </Link>

          <MovieInfoModal
            icon={<PencilLine className='h-4 w-4 text-primary-dark cursor-pointer' />}
            onSave={() => {}}
            movie={row.original}
            genres={genres}
          ></MovieInfoModal>

          {/* <MovieInfoModal
            icon={<BadgePlus className='h-4 w-4 text-primary-dark cursor-pointer' />}
            onSave={() => {}}
          ></MovieInfoModal> */}

          <ConfirmAlertDialog
            title=''
            description='Are you sure you want to delete this movie? This action cannot be undone.'
            onConfirm={handleDelete}
            trigger={<Trash2 className='h-4 w-4 text-primary-dark cursor-pointer' />}
            cancelText='No, go back'
            confirmText='Yes, proceed'
          />
        </div>
      )
    },
  },
]

export default columns
