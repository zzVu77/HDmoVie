import { Search } from 'lucide-react'
import { Input } from '../ui/input'
import type { InputHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface SearchBarProps extends InputHTMLAttributes<HTMLInputElement> {
  iconColor?: string
}

const SearchBar = ({ iconColor = 'text-primary-dark', className, ...props }: SearchBarProps) => {
  return (
    <div className='relative w-full flex items-center justify-center '>
      <Search className={cn('absolute left-3 top-1/2 h-[20px] w-[20px] -translate-y-1/2 text-red-600', iconColor)} />
      <Input
        className={cn('w-full pl-10 bg-white text-[ 5px]', className)}
        placeholder='Search...'
        type='search'
        {...props}
      />
    </div>
  )
}

export default SearchBar
