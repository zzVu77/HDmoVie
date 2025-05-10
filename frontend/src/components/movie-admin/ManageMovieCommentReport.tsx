import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { ChevronDown, Eye, Trash2 } from 'lucide-react'
import * as React from 'react'
import { Link } from 'react-router-dom'
import { ConfirmAlertDialog } from '../shared/ConfirmAlertDialog'

interface MovieCommentReportType {
  id: string
  reporter: { id: string; fullName: string }
  reason: string
  dateReported: string
  content: string
  commentId: string
  movieId: string
}

// Sample data for movie comment reports
const data: MovieCommentReportType[] = [
  {
    id: '1',
    reporter: { id: '3', fullName: 'John Smith' },
    reason: 'Hate speech or discrimination',
    dateReported: '2025-05-01T10:15:22.000Z',
    content: 'This comment contains discriminatory remarks',
    commentId: '101',
    movieId: '1',
  },
  {
    id: '2',
    reporter: { id: '4', fullName: 'Emma Johnson' },
    reason: 'Spam or scams',
    dateReported: '2025-05-02T12:30:45.000Z',
    content: 'Comment is promoting unrelated products',
    commentId: '102',
    movieId: '2',
  },
  {
    id: '3',
    reporter: { id: '5', fullName: 'Michael Brown' },
    reason: 'Harassment or bullying',
    dateReported: '2025-05-03T09:45:33.000Z',
    content: 'Comment targets specific user with abusive language',
    commentId: '103',
    movieId: '1',
  },
  {
    id: '4',
    reporter: { id: '6', fullName: 'Sarah Wilson' },
    reason: 'Misinformation or false information',
    dateReported: '2025-05-03T16:20:11.000Z',
    content: 'Comment spreads false information about the movie',
    commentId: '104',
    movieId: '2',
  },
]

export const columns: ColumnDef<MovieCommentReportType>[] = [
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
    accessorKey: 'reporter',
    header: ({ column }) => (
      <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Reporter
      </Button>
    ),
    cell: ({ row }) => {
      const reporter = row.getValue('reporter') as { id: string; fullName: string }
      return <div>{reporter?.fullName || 'N/A'}</div>
    },
    filterFn: (row, id, value) => {
      const reporter = row.getValue(id) as { id: string; fullName: string }
      return reporter?.fullName.toLowerCase().includes(value.toLowerCase())
    },
  },
  {
    accessorKey: 'reason',
    header: ({ column }) => (
      <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Reason
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue('reason') as string}</div>,
    filterFn: (row, id, value) => {
      const reason = row.getValue(id) as string
      return reason?.toLowerCase().includes(value.toLowerCase())
    },
  },
  {
    accessorKey: 'dateReported',
    header: ({ column }) => (
      <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Date Reported
      </Button>
    ),
    cell: ({ row }) => {
      const dateReported = row.getValue('dateReported') as string
      return <div>{dateReported ? new Date(dateReported).toLocaleDateString() : 'N/A'}</div>
    },
  },
  {
    accessorKey: 'content',
    header: 'Comment Content',
    cell: ({ row }) => {
      const content = row.getValue('content') as string
      return (
        <div className='truncate max-w-xs'>
          {typeof content === 'string' ? content.substring(0, 50) + '...' : 'N/A'}
        </div>
      )
    },
    filterFn: (row, id, value) => {
      const content = row.getValue(id) as string
      return content?.toLowerCase().includes(value.toLowerCase())
    },
  },
  {
    accessorKey: 'commentId',
    header: 'Comment ID',
    cell: ({ row }) => <div>{row.getValue('commentId') as string}</div>,
  },
  {
    accessorKey: 'movieId',
    header: 'Movie ID',
    cell: ({ row }) => <div>{row.getValue('movieId') as string}</div>,
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const report = row.original
      return (
        <div className='flex items-center justify-center gap-2'>
          <Link to={`/movie/${report.movieId}/comment/${report.commentId}`} className='block'>
            <Eye className='h-4 w-4 text-primary-dark cursor-pointer' />
          </Link>
          <ConfirmAlertDialog
            title='Delete Comment'
            description='Are you sure you want to delete this comment? This action cannot be undone.'
            onConfirm={() => {
              // Implement delete functionality here
            }}
            trigger={<Trash2 className='h-4 w-4 text-primary-dark cursor-pointer' />}
            cancelText='No, go back'
            confirmText='Yes, delete'
          />
        </div>
      )
    },
  },
]

export function ManageMovieCommentReport() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className='w-full'>
      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-2xl font-bold'>Movie Comment Reports</h2>
      </div>
      <div className='flex items-center py-4 gap-2'>
        <Input
          placeholder='Filter by reporter...'
          value={(table.getColumn('reporter')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('reporter')?.setFilterValue(event.target.value)}
          className='max-w-sm text-xs'
        />
        <Input
          placeholder='Filter by reason...'
          value={(table.getColumn('reason')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('reason')?.setFilterValue(event.target.value)}
          className='max-w-sm text-xs'
        />
        <Input
          placeholder='Filter by content...'
          value={(table.getColumn('content')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('content')?.setFilterValue(event.target.value)}
          className='max-w-sm text-xs'
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline' className='ml-auto text-xs'>
              Columns <ChevronDown className='ml-2 h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className='capitalize'
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className='text-center'>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className='text-center'>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className='h-24 text-center'>
                  No comment reports found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className='flex items-center justify-end space-x-2 py-4'>
        <div className='flex-1 text-sm text-muted-foreground'>
          {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s)
          selected.
        </div>
        <div className='space-x-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button variant='outline' size='sm' onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ManageMovieCommentReport
