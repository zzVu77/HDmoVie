import { DataTable } from '@/components/ui/Genre/GenreList'
import { GenreType } from '@/types'
import { columns } from '@/components/ui/Genre/columns'

const genres: GenreType[] = [
  {
    id: '1',
    name: 'Fiction',
  },
  {
    id: '2',
    name: 'Non-Fiction',
  },
  {
    id: '3',
    name: 'Science Fiction',
  },
]

export default function GenresPage() {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='container mx-auto py-10 px-6 bg-white rounded-md max-w-3xl'>
        <h1 className='font-bold text-dark'>Genres</h1>
        <DataTable columns={columns} data={genres} />
        <div className='flex justify-end items-center mt-4'>
          <div className='space-x-2'>
            <button className='border border-gray-200 rounded-md px-3 py-1 hover:bg-gray-100'>Previous</button>
            <button className='border border-gray-200 rounded-md px-3 py-1 hover:bg-gray-100'>Next</button>
          </div>
        </div>
      </div>
    </div>
  )
}
