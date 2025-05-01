import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

export function SearchBar({ placeholder = 'Search...' }: { placeholder?: string }) {
  return (
    <div className='relative w-full max-w-sm'>
      <Input type='text' placeholder={placeholder} className='pr-10' />
      <Search className='absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground' />
    </div>
  )
}
