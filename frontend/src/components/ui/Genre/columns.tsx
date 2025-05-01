import { ColumnDef } from '@tanstack/react-table'
import { GenreType } from '@/types'

export const columns: ColumnDef<GenreType>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
]
