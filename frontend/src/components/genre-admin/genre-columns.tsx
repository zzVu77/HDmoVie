import { GenreType } from '@/types'
import { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '../ui/checkbox'
import { Button } from '../ui/button'
import { GenreInfoModal } from './GenreInfoModal'
import { PencilLine, Trash2 } from 'lucide-react'
import { ConfirmAlertDialog } from '../shared/ConfirmAlertDialog'
import { genreService } from '@/services/genreService'
import { toast } from 'sonner'

export const columns = (onGenreUpdate: () => void): ColumnDef<GenreType>[] => [
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
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue('id') || 'N/A'}</div>,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Name
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue('name') || 'N/A'}</div>,
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const handleDelete = async () => {
        const genreId = row.original.id
        try {
          await genreService.deleteGenre(genreId)
          toast.success('Genre deleted successfully')

          onGenreUpdate()
        } catch {
          throw Error("Can't delete")
        }
      }

      return (
        <div className='flex items-center justify-end gap-2'>
          <GenreInfoModal
            icon={<PencilLine className='h-4 w-4 text-primary-dark cursor-pointer' />}
            genre={row.original}
            onSave={() => {
              onGenreUpdate()
            }}
          />
          <ConfirmAlertDialog
            title=''
            description='Are you sure you want to delete this genre? This action cannot be undone.'
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
