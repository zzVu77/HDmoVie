import { Checkbox } from '@/components/ui/checkbox'
import { ColumnDef } from '@tanstack/react-table'
import { Eye, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ConfirmAlertDialog } from '../shared/ConfirmAlertDialog'
import { ImageDialogCell } from '../shared/ImageDialogCell'
import { Button } from '../ui/button'
import { BlogPost, TagType } from '@/types'
import { blogService } from '@/services/blogService'
import { toast } from 'sonner'

// Function to get first image URL for display
function getFirstImageUrl(imageUrls: Array<string | { id: string; url: string }>): string | null {
  if (!imageUrls || imageUrls.length === 0) return null
  const firstUrl = imageUrls[0]
  return typeof firstUrl === 'string' ? firstUrl : firstUrl.url
}

export const columns = (tags: TagType[], refreshBlogs: () => Promise<void>): ColumnDef<BlogPost>[] => [
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
    header: ({ column }) => (
      <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Date Created
      </Button>
    ),
    cell: ({ row }) => {
      const dateCreated = row.getValue('dateCreated') as string
      return <div>{dateCreated ? new Date(dateCreated).toLocaleDateString() : 'N/A'}</div>
    },
  },
  {
    accessorKey: 'owner',
    header: ({ column }) => (
      <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Owner
      </Button>
    ),
    cell: ({ row }) => {
      const owner = row.getValue('owner') as { id: string; fullName: string }
      return <div>{owner?.fullName || 'N/A'}</div>
    },
    filterFn: (row, id, value) => {
      const owner = row.getValue(id) as { id: string; fullName: string }
      return owner?.fullName.toLowerCase().includes(value.toLowerCase())
    },
  },
  {
    accessorKey: 'tags',
    header: ({ column }) => (
      <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Tags
      </Button>
    ),
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
      const imageUrls = row.getValue('imageUrls') as Array<string | { id: string; url: string }>
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
      const imageUrls = row.getValue(id) as Array<string | { id: string; url: string }>
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
      const handleDelete = async () => {
        try {
          await blogService.deleteBlog(blog.id)
          toast.success('Blog deleted successfully')
          refreshBlogs()
        } catch {
          toast.error("Can't delete blog")
        }
      }

      return (
        <div className='flex items-center justify-between gap-2'>
          <Link to={`/blog/${blog.id}`} className='block'>
            <Eye className='h-4 w-4 text-primary-dark cursor-pointer' />
          </Link>
          <ConfirmAlertDialog
            title='Delete Blog'
            description='Are you sure you want to delete this blog? This action cannot be undone.'
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

export default columns
