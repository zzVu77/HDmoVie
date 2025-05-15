import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { getMovies } from '@/services/movieService'
import { CastType, GenreType, MovieType } from '@/types'
import {
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
import { ChevronDown } from 'lucide-react'
import { useEffect, useState } from 'react'
import Wrapper from '../shared/Wrapper'
import { columns } from './movie-columns'
import { genreService } from '@/services/genreService'
import { MovieInfoModal } from './MovieInfoModal'
import { castService } from '@/services/castService'

export function ManageMovie() {
  const [data, setMovies] = useState<MovieType[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const refreshMovies = async () => {
    try {
      setLoading(true)
      const results = await getMovies()
      setMovies(results)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Can not fetch movies')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refreshMovies()
  }, [])
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const results = await getMovies()
        setMovies(results)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Can not fetch movies')
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
  }, [])

  const [genres, setGenres] = useState<GenreType[]>([])
  const fetchGenres = async () => {
    try {
      const genres = await genreService.getGenres()
      setGenres(genres)
    } catch {
      throw Error('Loading fail')
    }
  }
  const [casts, setCasts] = useState<CastType[]>([])
  const fetchCasts = async () => {
    try {
      const data = await castService.getCasts()
      setCasts(data)
    } catch {
      throw Error('Loading fail')
    }
  }
  useEffect(() => {
    fetchGenres()
  }, [])
  useEffect(() => {
    fetchCasts()
  }, [])

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    voteAvg: false,
    voteCount: false,
    casts: false,
  })
  const [rowSelection, setRowSelection] = useState({})

  const table = useReactTable({
    data: data,
    columns: columns(genres, casts, refreshMovies),
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
  if (loading) {
    return (
      <Wrapper className='mt-[100px]'>
        <p className='text-center'>Loading...</p>
      </Wrapper>
    )
  }

  if (error) {
    return (
      <Wrapper className='mt-[100px]'>
        <p className='text-red-500 text-center'>{error}</p>
      </Wrapper>
    )
  }

  return (
    <div className='w-full flex flex-col gap-2 px-1 '>
      <div className='flex items-center pt-4 gap-2'>
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
      <div className='self-end'>
        <MovieInfoModal
          title='Add new movie'
          genres={genres}
          casts={casts}
          onRefresh={refreshMovies}
          type='create'
          buttonTitle='Save'
          description='Fill in the required details such as title, genre, and other relevant information, then click Save to submit.'
        >
          <Button>Add new</Button>
        </MovieInfoModal>
      </div>
      <div className='rounded-md border '>
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
