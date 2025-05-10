import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { zodResolver } from '@hookform/resolvers/zod'
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
import { ChevronDown, PencilLine, Plus, Trash2 } from 'lucide-react'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { ConfirmAlertDialog } from '../shared/ConfirmAlertDialog'
import { Text } from '../ui/typography'

// Define Tag Type
export interface TagType {
  id: string
  name: string
}

// Sample data for tags
const data: TagType[] = [
  {
    id: 'tag-003',
    name: 'Analysis',
  },
  {
    id: '2',
    name: 'Anime',
  },
  {
    id: '1',
    name: 'Avenger',
  },
  {
    id: '3',
    name: 'Action',
  },
  {
    id: '4',
    name: 'Marvel',
  },
  {
    id: '5',
    name: 'DC',
  },
]

// Zod schema for form validation
const tagSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Tag name is required'),
})

type TagFormValues = z.infer<typeof tagSchema>

// Tag Edit Modal Component
function TagEditModal({
  tag,
  onSave,
  children,
  icon,
  title,
}: {
  tag?: TagType
  onSave?: () => void
  children?: React.ReactNode
  icon?: React.ReactNode
  title?: string
}) {
  const form = useForm<TagFormValues>({
    resolver: zodResolver(tagSchema),
    defaultValues: {
      id: tag?.id || '',
      name: tag?.name || '',
    },
  })

  const onSubmit = (data: TagFormValues) => {
    if (onSave) onSave()
    form.reset(data) // Reset form with current values
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className={`flex flex-row items-center ${title ? 'gap-2' : 'gap-0'}`}>
          {icon}
          <Text body={4} className='text-primary-dark'>
            {children || ''}
          </Text>
        </div>
      </DialogTrigger>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle className='text-center font-bold text-xl'>{title || 'Edit Tag'}</DialogTitle>
          <DialogDescription className='text-center text-sm text-muted-foreground'>
            {tag ? 'Edit tag details below.' : 'Create a new tag.'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 px-1'>
            <div className='grid gap-4 py-4'>
              {tag && (
                <FormField
                  control={form.control}
                  name='id'
                  render={({ field }) => (
                    <FormItem className='grid grid-cols-4 items-center gap-4'>
                      <FormLabel className='text-right'>ID</FormLabel>
                      <FormControl>
                        <Input id='id' className='col-span-3' readOnly {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-4 items-center gap-4'>
                    <FormLabel className='text-right'>Name</FormLabel>
                    <FormControl>
                      <Input id='name' className='col-span-3' {...field} />
                    </FormControl>
                    <FormMessage className='col-span-4 text-right' />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button type='submit'>Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export const columns: ColumnDef<TagType>[] = [
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
    cell: ({ row }) => <div>{(row.getValue('name') as string) || 'N/A'}</div>,
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const tagId = row.getValue('id') as string
      return (
        <div className='flex items-center justify-center gap-4'>
          <TagEditModal
            icon={<PencilLine className='h-4 w-4 text-primary-dark cursor-pointer' />}
            onSave={() => {}}
            tag={data.find((tag) => tag.id === tagId)}
          />

          <ConfirmAlertDialog
            title='Delete Tag'
            description='Are you sure you want to delete this tag? This action cannot be undone and may affect blogs using this tag.'
            onConfirm={() => {}}
            trigger={<Trash2 className='h-4 w-4 text-primary-dark cursor-pointer' />}
            cancelText='No, go back'
            confirmText='Yes, delete'
          />
        </div>
      )
    },
  },
]

export function ManageTag() {
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
      <div className='flex items-center justify-between py-4'>
        <div className='flex items-center gap-2'>
          <Input
            placeholder='Filter by name...'
            value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
            onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
            className='max-w-sm text-xs'
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline' className='text-xs'>
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

        <TagEditModal title='Add New Tag' icon={<Plus className='h-4 w-4' />} onSave={() => {}}>
          Add New Tag
        </TagEditModal>
      </div>

      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
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

export default ManageTag
