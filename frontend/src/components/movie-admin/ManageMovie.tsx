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
import { CastType, GenreType, MovieInfoModal, MovieType } from './MovieInfoModal'
import { ImageDialogCell } from '../shared/ImageDialogCell'

const data: MovieType[] = [
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

export const columns: ColumnDef<MovieType>[] = [
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
      return (
        <div className='flex items-center justify-between gap-2 '>
          <Link to='/movie' className='block'>
            <Eye className='h-4 w-4 text-primary-dark cursor-pointer' />
          </Link>

          <MovieInfoModal
            icon={<PencilLine className='h-4 w-4 text-primary-dark cursor-pointer' />}
            onSave={() => {}}
            movie={data[movieId - 1]}
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

export function ManageMovie() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({
    voteAvg: false,
    voteCount: false,
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
          placeholder='Filter by titles...'
          value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('title')?.setFilterValue(event.target.value)}
          className='max-w-sm text-xs'
        />
        <Input
          placeholder='Filter by genres...'
          value={(table.getColumn('genres')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('genres')?.setFilterValue(event.target.value)}
          className='max-w-sm text-xs'
        />
        <Input
          placeholder='Filter by casts...'
          value={(table.getColumn('casts')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('casts')?.setFilterValue(event.target.value)}
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
export default ManageMovie
