import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
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
import * as React from 'react'
import Wrapper from '../shared/Wrapper'
import { columns } from './blog-columns'
import { BlogInfoModal } from './BlogInfoModal'
import { blogService } from '@/services/blogService'
import { BlogPost, TagType } from '@/types'
import { tagService } from '@/services/tagService'

export function ManageBlog() {
  const [data, setBlogs] = React.useState<BlogPost[]>([])
  const [loading, setLoading] = React.useState<boolean>(true)
  const [error, setError] = React.useState<string | null>(null)
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [tags, setTags] = React.useState<TagType[]>([])

  const refreshBlogs = async () => {
    try {
      setLoading(true)
      const results = await blogService.getAllBlogs()
      setBlogs(results.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Không thể tải danh sách blog')
    } finally {
      setLoading(false)
    }
  }

  const fetchTags = async () => {
    try {
      const tags = await tagService.getTags()
      setTags(tags)
    } catch {
      throw Error('Không thể tải danh sách tags')
    }
  }

  React.useEffect(() => {
    refreshBlogs()
    fetchTags()
  }, [])

  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({
    dateCreated: false,
  })
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns: columns(tags, refreshBlogs),
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
    <div className='w-full flex flex-col gap-2 px-1'>
      <div className='flex items-center pt-4 gap-2'>
        <Input
          placeholder='Content Filter...'
          value={(table.getColumn('content')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('content')?.setFilterValue(event.target.value)}
          className='max-w-sm text-xs'
        />
        <Input
          placeholder='Owner Filter...'
          value={(table.getColumn('owner')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('owner')?.setFilterValue(event.target.value)}
          className='max-w-sm text-xs'
        />
        <Input
          placeholder='Tag Filter...'
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
      <div className='self-end'>
        <BlogInfoModal>
          <Button>Add new</Button>
        </BlogInfoModal>
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
                  Không có kết quả.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className='flex items-center justify-end space-x-2 py-4'>
        <div className='flex-1 text-sm text-muted-foreground'>
          {table.getFilteredSelectedRowModel().rows.length} của {table.getFilteredRowModel().rows.length} dòng được
          chọn.
        </div>
        <div className='space-x-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Trước
          </Button>
          <Button variant='outline' size='sm' onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Sau
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ManageBlog
