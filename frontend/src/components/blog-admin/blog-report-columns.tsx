import { BlogReportType, ReporterType } from '@/types'
import { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '../ui/checkbox'
import { Button } from '../ui/button'
import { Eye, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ConfirmAlertDialog } from '../shared/ConfirmAlertDialog'
import { toast } from 'sonner'
import reportService from '@/services/reportService'
// Sample data for blog reports

export const columns = (onReportUpdate: () => void): ColumnDef<BlogReportType>[] => [
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
    accessorKey: 'content',
    header: ({ column }) => (
      <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Comment Content
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
    sortingFn: (rowA, rowB) => {
      const contentA = (rowA.getValue('content') as string) || ''
      const contentB = (rowB.getValue('content') as string) || ''
      return contentA.localeCompare(contentB)
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const report = row.original

      const handleDelete = async () => {
        try {
          await reportService.deleteBlogReport(report.blogId)
          toast.success('Report deleted successfully')
          onReportUpdate()
        } catch {
          toast.error('Failed to delete report')
        }
      }

      return (
        <div className='flex items-center justify-center gap-2'>
          <Link to={`/blog/${report.blogId}`} className='block'>
            <Eye className='h-4 w-4 text-primary-dark cursor-pointer' />
          </Link>
          <ConfirmAlertDialog
            title='Delete Report'
            description='Are you sure you want to delete this report? This action cannot be undone.'
            onConfirm={handleDelete}
            trigger={<Trash2 className='h-4 w-4 text-primary-dark cursor-pointer' />}
            cancelText='No, go back'
            confirmText='Yes, delete'
          />
        </div>
      )
    },
  },
]
