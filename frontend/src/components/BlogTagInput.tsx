import { useState, useEffect, useRef } from 'react'
import { TagType } from '@/types'
import { Text } from './ui/typography'

export default function TagInput({ dbTags }: { dbTags: TagType[] }) {
  const [tagQuery, setTagQuery] = useState('')
  const [selectedTags, setSelectedTags] = useState<TagType[]>([])
  const [allTags, setAllTags] = useState<TagType[]>(dbTags)
  const [isShowingTagSuggest, setIsShowingTagSuggest] = useState(false)
  const tagInputRef = useRef<HTMLDivElement>(null)

  // Click outside will hide the tag suggestion
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (tagInputRef.current && !tagInputRef.current.contains(e.target as Node)) {
        setIsShowingTagSuggest(false)
      }
    }

    // Add event listener to document
    document.addEventListener('mousedown', handleClickOutside)
    // Cleanup function to remove event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  })

  // Remove or add tag into selected tag
  // Also update the allTags
  const toggleTag = (tag: TagType) => {
    if (selectedTags.some((t) => t.id === tag.id)) {
      setAllTags((prev) => [...prev, tag]) // Add back to available tags
      setSelectedTags((prev) => prev.filter((t) => t.id !== tag.id))
    } else {
      setAllTags((prev) => prev.filter((t) => t.id !== tag.id)) // Remove from available tags
      setSelectedTags((prev) => [...prev, tag])
    }
  }

  const createNewTag = async (name: string) => {
    return { id: (Date.now() + Math.random()).toString(), name: name.trim() }
    // const res = await fetch('/api/tags/create', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ name }),
    // })
    // if (!res.ok) throw new Error('Failed to create tag')
    // return await res.json()
  }

  // Filter tags to display on tag suggestion
  const filteredTags = allTags.filter((tag) => tag.name && tag.name.toLowerCase().includes(tagQuery.toLowerCase()))

  return (
    <div className='w-full'>
      <div className='flex flex-wrap gap-2 bg-secondary-dark px-2 py-1 rounded-md border border-none'>
        {selectedTags.map((tag) => (
          <div
            key={tag.id}
            className='flex items-center gap-1 bg-transparent border-1 border-white text-white hover:border-primary-yellow hover:text-primary-yellow px-2 py-0 rounded-md text-sm cursor-pointer'
            onClick={() => toggleTag(tag)}
          >
            {tag.name}
          </div>
        ))}
      </div>
      <div ref={tagInputRef} className='pr-2 py-1 relative'>
        <input
          type='text'
          className='bg-transparent text-sm ml-2 outline-none text-white flex-1 w-full min-h-[22px]'
          placeholder='#'
          value={tagQuery}
          autoFocus={false}
          onChange={(e) => setTagQuery(e.target.value)}
          onFocus={() => setIsShowingTagSuggest(true)}
        />
        {isShowingTagSuggest && tagQuery.trim() !== '' && (
          <>
            <div className='absolute mt-1 w-full bg-secondary-dark border border-tertiary-dark rounded-lg shadow z-10 max-h-40'>
              <div className='max-h-40 overflow-y-auto custom-scroll'>
                {/* Always show 'Add new tag' if query is non-empty and not an exact match */}
                {tagQuery.trim() &&
                  !allTags.some((tag) => (tag.name ?? '').toLowerCase() === tagQuery.trim().toLowerCase()) && (
                    <div
                      className='px-2 py-2 text-white hover:bg-tertiary-dark rounded-lg cursor-pointer'
                      onClick={async () => {
                        const newTagObj = await createNewTag(tagQuery.trim())
                        allTags.push(newTagObj)
                        toggleTag(newTagObj)
                        setTagQuery('')
                        setIsShowingTagSuggest(false)
                      }}
                    >
                      {tagQuery.trim()}
                      <br />
                      <Text body={5} className='text-gray-400'>
                        Add new topic
                      </Text>
                    </div>
                  )}
                {filteredTags.map((tag) => (
                  <div
                    key={tag.id}
                    onClick={() => {
                      toggleTag(tag)
                      setTagQuery('')
                      setIsShowingTagSuggest(false)
                    }}
                    className='px-2 py-2 hover:bg-tertiary-dark text-white cursor-pointer rounded-lg'
                  >
                    {tag.name}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
