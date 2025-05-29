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
import { BlogCommentReportType } from '@/types'
import { columns } from './blog-comment-report-columns'
import reportService from '@/services/reportService'
import { toast } from 'sonner'

export function ManageBlogCommentReport() {
  const [data, setData] = React.useState<BlogCommentReportType[]>([])
  const [loading, setLoading] = React.useState(true)
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const fetchReports = React.useCallback(async () => {
    setLoading(true)
    try {
      const response = await reportService.getBlogCommentReports()
      // Transform the raw data to BlogCommentReportType
      const reports: BlogCommentReportType[] = response.map((report: any) => ({
        id: report.id,
        reporter: {
          id: report.reporter.id,
          email: report.reporter.email,
          fullName: report.reporter.fullName,
          dateOfBirth: report.reporter.dateOfBirth,
        },
        reason: report.reason,
        dateReported: report.dateReported ? new Date(report.dateReported).toISOString() : new Date().toISOString(),
        content: report.comment.content,
        commentId: report.comment.id,
        blogId: report.comment.blog.id,
      }))

      setData(reports)
    } catch {
      toast.error('Failed to fetch reports:')
    } finally {
      setLoading(false)
    }
  }, [])

  React.useEffect(() => {
    fetchReports()
  }, [])

  const table = useReactTable({
    data,
    columns: columns(fetchReports),
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
        <h2 className='text-2xl font-bold'>Blog Comment Reports</h2>
      </div>
      <div className='flex items-center py-4'>
        <Input
          placeholder='Filter by reporter...'
          value={(table.getColumn('reporter')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('reporter')?.setFilterValue(event.target.value)}
          className='max-w-sm'
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
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className='capitalize'
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className='rounded-md border'>
        {loading ? (
          <div className='flex justify-center items-center h-32'>Loading reports...</div>
        ) : (
          <Table>
            <TableHeader className='sticky'>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow className='mx-auto' key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead className='text-center' key={header.id}>
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    )
                  })}
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
                  <TableCell colSpan={columns(fetchReports).length} className='h-24 text-center'>
                    No reports found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
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
export default ManageBlogCommentReport
