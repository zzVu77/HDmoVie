import { SearchNormal1 } from 'iconsax-reactjs'
import { useEffect, useRef, useState } from 'react'

export function SearchBar({
  placeholder,
  onExpandChange,
}: {
  placeholder: string
  onExpandChange: (expanded: boolean) => void
}) {
  const [isExpanded, setIsExpanded] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setIsExpanded(false)
        onExpandChange(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [onExpandChange])

  const handleExpand = () => {
    setIsExpanded(true)
    onExpandChange(true)
  }

  return (
    <div
      className={`flex items-center bg-transparent text-white rounded-md transition-all duration-300 ${
        isExpanded ? 'w-64 ring-2' : 'w-10'
      } hover:ring-2 hover:ring-offset-2 hover:ring-[var(--accent-yellow)]`}
    >
      <button onClick={handleExpand} className='p-2 focus:outline-none'>
        <SearchNormal1 size='32' color='#fff' className='h-5 w-5' variant='Outline' />
      </button>
      {isExpanded && (
        <input
          ref={inputRef}
          type='text'
          placeholder={placeholder}
          className='flex-grow p-2 bg-transparent text-white focus:outline-none transition-all duration-300 w-full'
        />
      )}
    </div>
  )
}
