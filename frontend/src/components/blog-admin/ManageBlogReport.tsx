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

// Define Blog Report Type
export interface ReporterType {
  id: string
  fullName: string
}

export interface BlogReportType {
  id: string
  reporter: ReporterType
  reason: string
  dateReported: string
  content: string
  blogId: string
}

// Sample data for blog reports
const data: BlogReportType[] = [
  {
    id: '1',
    reporter: { id: '3', fullName: 'John Smith' },
    reason: 'Inappropriate content',
    dateReported: '2025-05-01T09:23:44.000Z',
    content: 'This blog contains offensive material about Avengers',
    blogId: '1',
  },
  {
    id: '2',
    reporter: { id: '4', fullName: 'Emma Johnson' },
    reason: 'Copyright infringement',
    dateReported: '2025-05-02T15:42:12.000Z',
    content: 'Blog contains copyrighted anime imagery without permission',
    blogId: '2',
  },
  {
    id: '3',
    reporter: { id: '5', fullName: 'Michael Brown' },
    reason: 'Misinformation',
    dateReported: '2025-05-03T11:18:37.000Z',
    content: 'The blog spreads false information about Marvel characters',
    blogId: '1',
  },
  {
    id: '4',
    reporter: { id: '6', fullName: 'Sarah Wilson' },
    reason: 'Hate speech',
    dateReported: '2025-05-03T14:27:56.000Z',
    content: 'Blog contains hateful comments about anime fans',
    blogId: '2',
  },
]

export const columns: ColumnDef<BlogReportType>[] = [
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
      const reporter = row.getValue('reporter') as ReporterType
      return <div>{reporter?.fullName || 'N/A'}</div>
    },
    filterFn: (row, id, value) => {
      const reporter = row.getValue(id) as ReporterType
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
    header: 'Content',
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
    accessorKey: 'blogId',
    header: 'Blog ID',
    cell: ({ row }) => <div>{row.getValue('blogId') as string}</div>,
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const report = row.original

      return (
        <div className='flex items-center justify-center gap-2'>
          <Link to={`/blog/${report.blogId}`} className='block'>
            <Eye className='h-4 w-4 text-primary-dark cursor-pointer' />
          </Link>

          <ConfirmAlertDialog
            title='Delete Report'
            description='Are you sure you want to delete this report? This action cannot be undone.'
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

export function ManageBlogReport() {
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
        <h2 className='text-2xl font-bold'>Blog Reports</h2>
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

        {/* Column Visibility */}
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
                  No reports found.
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

export default ManageBlogReport
