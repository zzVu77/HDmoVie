import { TagType } from '@/types'
import { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '../ui/checkbox'
import { Button } from '../ui/button'
import { Trash2 } from 'lucide-react'
import { ConfirmAlertDialog } from '../shared/ConfirmAlertDialog'
import { tagService } from '@/services/tagService'
import { toast } from 'sonner'

export const columns = (onTagUpdate: () => void): ColumnDef<TagType>[] => [
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
        const tagId = row.original.id
        try {
          await tagService.deleteTag(tagId)
          toast.success('Tag deleted successfully')
          onTagUpdate()
        } catch {
          toast.error("Can't delete tag")
        }
      }

      return (
        <div className='flex items-center justify-end gap-2'>
          <ConfirmAlertDialog
            title=''
            description='Are you sure you want to delete this tag? This action cannot be undone.'
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
