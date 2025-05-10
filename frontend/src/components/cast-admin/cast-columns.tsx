import { CastType } from '@/types'
import { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { PencilLine, Trash2 } from 'lucide-react'
import { ConfirmAlertDialog } from '../shared/ConfirmAlertDialog'
import { CastInfoModal } from './CastInfoModal'
import { ImageDialogCell } from '../shared/ImageDialogCell'

export const castColumns = (data: CastType[]): ColumnDef<CastType>[] => [
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
    accessorKey: 'profilePath',
    header: 'Profile Image',
    cell: ({ row }) => {
      const profilePath = row.getValue('profilePath') as string
      return profilePath ? (
        <ImageDialogCell
          src={profilePath}
          alt='Profile'
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
      const castId = row.getValue('id') as string
      const cast = data.find((c) => c.id === castId)
      return (
        <div className='flex items-center justify-end gap-2'>
          <CastInfoModal
            icon={<PencilLine className='h-4 w-4 text-primary-dark cursor-pointer' />}
            onSave={() => {}}
            cast={cast!}
          />
          <ConfirmAlertDialog
            title=''
            description='Are you sure you want to delete this cast? This action cannot be undone.'
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
