// SearchBar.tsx
import { cn } from '@/lib/utils'
import { getMovies, searchMoviesByTitle } from '@/services/movieService'
import { MovieType } from '@/types'
import { Search } from 'lucide-react'
import { useState } from 'react'
import { Input } from '../ui/input'

interface SearchBarProps {
  placeholder?: string
  onSearch?: (value: string | MovieType[]) => void
  className?: string
  searchType: 'movies' | 'blogs'
}

const SearchBar = ({ placeholder, onSearch, className, searchType = 'movies', ...props }: SearchBarProps) => {
  const [searchValue, setSearchValue] = useState('')

  const handleSearch = async () => {
    if (searchType === 'movies') {
      try {
        if (searchValue.trim()) {
          const response = await searchMoviesByTitle(searchValue)
          if (onSearch) {
            onSearch(response)
          }
        } else {
          const response = await getMovies()
          if (onSearch) {
            onSearch(response)
          }
        }
      } catch {
        throw new Error('Error fetching data from API')
      }
    }
  }

  return (
    <div className='relative w-full max-w-[80vw] mx-auto flex items-center justify-center'>
      <Search
        className={cn('absolute font-bold left-3 top-1/2 h-[20px] w-[20px] -translate-y-1/2')}
        color='var(--accent-yellow)'
      />
      <Input
        className={cn(
          'w-full pl-10 bg-primary-dark/80 text-[5px] h-12 text-primary-yellow shadow-none border-[3px] border-tertiary-dark/80 focus-within:border-none text-xl',
          className,
        )}
        placeholder={placeholder || 'Search...'}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSearch()
          }
        }}
        {...props}
      />
    </div>
  )
}

export default SearchBar
