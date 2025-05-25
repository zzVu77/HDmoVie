import { MovieCommentReportType, ReporterType } from '@/types'
import { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '../ui/checkbox'
import { Button } from '../ui/button'
import { Eye, Trash2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { ConfirmAlertDialog } from '../shared/ConfirmAlertDialog'
import { toast } from 'sonner'
import reportService from '@/services/reportService'

const ActionCell = ({ report, onReportUpdate }: { report: MovieCommentReportType; onReportUpdate: () => void }) => {
  const navigate = useNavigate()

  const handleDelete = async () => {
    try {
      await reportService.deleteCommentReport(report.commentId)
      toast.success('Report deleted successfully')
      onReportUpdate()
    } catch {
      toast.error('Failed to delete report')
    }
  }

  const handleView = () => {
    navigate(`/movie/${report.movieId}#${report.commentId}`)
  }

  return (
    <div className='flex items-center justify-center gap-2'>
      <Button variant='ghost' size='icon' onClick={handleView}>
        <Eye className='h-4 w-4 text-primary-dark' />
      </Button>
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
}

export const columns = (onReportUpdate: () => void): ColumnDef<MovieCommentReportType>[] => [
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
    accessorKey: 'title',
    header: 'Title',
    cell: ({ row }) => <div>{row.getValue('title') as string}</div>,
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => <ActionCell report={row.original} onReportUpdate={onReportUpdate} />,
  },
]
