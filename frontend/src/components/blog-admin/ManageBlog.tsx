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
import { ChevronDown, Eye, PencilLine, Trash2 } from 'lucide-react'
import * as React from 'react'
import { Link } from 'react-router-dom'
import { ConfirmAlertDialog } from '../shared/ConfirmAlertDialog'
import { ImageDialogCell } from '../shared/ImageDialogCell'
import { BlogInfoModal } from './BlogInfoModal'

// Define Blog Type
export interface TagType {
  id: string
  name: string
}

export interface BlogOwnerType {
  id: string
  fullName: string
}

export interface ImageUrlType {
  id: string
  url: string
}

export interface BlogType {
  id: string
  content: string
  dateCreated: string
  owner: BlogOwnerType
  tags: TagType[]
  imageUrls: Array<string | ImageUrlType>
}

// Sample data for blogs
const data: BlogType[] = [
  {
    id: '1',
    content: 'Please release new version of Avenger',
    dateCreated: '2025-05-04T11:18:23.000Z',
    owner: { id: '1', fullName: 'Alice Wonderland' },
    tags: [{ id: '1', name: 'Avenger' }],
    imageUrls: [],
  },
  {
    id: '2',
    content: 'Wibu never die',
    dateCreated: '2025-05-04T11:18:23.000Z',
    owner: { id: '2', fullName: 'Bob Dave Tint' },
    tags: [{ id: '2', name: 'Anime' }],
    imageUrls: [{ id: '2', url: 'https://image.tmdb.org/t/p/original/janjdSMrTRGtPrI1p9uOX66jv7x.jpg' }],
  },
]

// Function to get first image URL for display
function getFirstImageUrl(imageUrls: Array<string | ImageUrlType>): string | null {
  if (!imageUrls || imageUrls.length === 0) return null
  const firstUrl = imageUrls[0]
  return typeof firstUrl === 'string' ? firstUrl : firstUrl.url
}

export const columns: ColumnDef<BlogType>[] = [
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
    accessorKey: 'content',
    header: ({ column }) => (
      <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Content
      </Button>
    ),
    cell: ({ row }) => {
      const content = row.getValue('content')
      return (
        <div className='truncate max-w'>{typeof content === 'string' ? content.substring(0, 50) + '...' : 'N/A'}</div>
      )
    },
    filterFn: (row, id, value) => {
      const content = row.getValue(id) as string
      return content?.toLowerCase().includes(value.toLowerCase())
    },
  },
  {
    accessorKey: 'dateCreated',
    header: 'Date Created',
    cell: ({ row }) => {
      const dateCreated = row.getValue('dateCreated') as string
      return <div>{dateCreated ? new Date(dateCreated).toLocaleDateString() : 'N/Aidad'}</div>
    },
  },
  {
    accessorKey: 'owner',
    header: 'Owner',
    cell: ({ row }) => {
      const owner = row.getValue('owner') as BlogOwnerType
      return <div>{owner?.fullName || 'N/A'}</div>
    },
    filterFn: (row, id, value) => {
      const owner = row.getValue(id) as BlogOwnerType
      return owner?.fullName.toLowerCase().includes(value.toLowerCase())
    },
  },
  {
    accessorKey: 'tags',
    header: 'Tags',
    cell: ({ row }) => {
      const tags = row.getValue('tags') as TagType[]
      return <div>{tags?.map((t) => t.name).join(', ') || 'N/A'}</div>
    },
    filterFn: (row, id, value) => {
      const tags = row.getValue(id) as TagType[]
      return tags?.some((t) => t.name.toLowerCase().includes(value.toLowerCase()))
    },
  },
  {
    accessorKey: 'imageUrls',
    header: 'Image',
    cell: ({ row }) => {
      const imageUrls = row.getValue('imageUrls') as Array<string | ImageUrlType>
      const firstImageUrl = getFirstImageUrl(imageUrls)
      return firstImageUrl ? (
        <ImageDialogCell
          src={firstImageUrl}
          alt='Blog Image'
          smallClassName='h-16 w-12'
          largeClassName='max-w-sm w-full h-auto'
        />
      ) : (
        'N/A'
      )
    },
    filterFn: (row, id, value) => {
      const imageUrls = row.getValue(id) as Array<string | ImageUrlType>
      if (!imageUrls || imageUrls.length === 0) return false
      return imageUrls.some((url) => {
        const urlStr = typeof url === 'string' ? url : url.url
        return urlStr.toLowerCase().includes(value.toLowerCase())
      })
    },
    enableSorting: false,
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const blog = row.original
      return (
        <div className='flex items-center justify-between'>
          <Link to={`/blog/${blog.id}`} className='block'>
            <Eye className='h-4 w-4 text-primary-dark cursor-pointer' />
          </Link>
          <BlogInfoModal
            icon={<PencilLine className='h-4 w-4 text-primary-dark cursor-pointer' />}
            // onSave={(updatedData) => {
            //   // Implement save functionality here
            // }}
            blog={blog}
          />
          <ConfirmAlertDialog
            title='Delete Blog'
            description='Are you sure you want to delete this blog? This action cannot be undone.'
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

export function ManageBlog() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({
    dateCreated: false,
  })
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
      <div className='flex items-center py-4 gap-2'>
        <Input
          placeholder='Filter by content...'
          value={(table.getColumn('content')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('content')?.setFilterValue(event.target.value)}
          className='max-w-sm text-xs'
        />
        <Input
          placeholder='Filter by owner...'
          value={(table.getColumn('owner')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('owner')?.setFilterValue(event.target.value)}
          className='max-w-sm text-xs'
        />
        <Input
          placeholder='Filter by tags...'
          value={(table.getColumn('tags')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('tags')?.setFilterValue(event.target.value)}
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
          <TableHeader className='sticky'>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow className='mx-auto' key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead className='text-center' key={header.id}>
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
                    <TableCell className='text-center' key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className='h-24 text-center'>
                  No results.
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

export default ManageBlog
