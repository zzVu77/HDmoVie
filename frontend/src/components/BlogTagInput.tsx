import { useState, useEffect, useRef, useMemo } from 'react'
import { TagType } from '@/types'
import { Text } from './ui/typography'
import { tagService } from '@/services/tagService'
import { toast } from 'sonner'

type TagInputProps = {
  dbTags: TagType[]
  onChange?: (tags: TagType[]) => void
}

export default function TagInput({ dbTags, onChange }: TagInputProps) {
  const [tagQuery, setTagQuery] = useState('')
  const [selectedTags, setSelectedTags] = useState<TagType[]>([])
  const [allTags, setAllTags] = useState<TagType[]>(dbTags)
  const [isShowingTagSuggest, setIsShowingTagSuggest] = useState(false)
  const tagInputRef = useRef<HTMLDivElement>(null)

  // Use call back function to notify selected tag to parent
  useEffect(() => {
    onChange?.(selectedTags)
  }, [selectedTags, onChange])

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
  }, [])

  // Remove or add tag into selected tag
  const toggleTag = (tag: TagType) => {
    if (selectedTags.some((t) => t.id === tag.id)) {
      setSelectedTags((prev) => prev.filter((t) => t.id !== tag.id))
    } else {
      setSelectedTags((prev) => [...prev, tag])
    }
  }

  const createNewTag = async (name: string) => {
    try {
      const newTag = await tagService.createTag({ name: name.trim() })
      return newTag
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Cannot create tag')
      const newTag: TagType = { id: Math.floor(Date.now()).toString(), name: name.trim() }
      return newTag
    }
  }

  // Filter tags to display on tag suggestion
  const filteredTags = useMemo(() => {
    return allTags.filter((tag) => tag.name && tag.name.toLowerCase().includes(tagQuery.toLowerCase()))
  }, [tagQuery, allTags])

  return (
    <div className='w-full relative'>
      {/* Set relative here */}
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
        <div ref={tagInputRef} className='relative min-w-[0.75rem] max-w-full flex-grow'>
          <input
            type='text'
            className='bg-transparent text-sm outline-none text-white'
            placeholder='#'
            value={tagQuery}
            onChange={(e) => setTagQuery(e.target.value)}
            onFocus={() => setIsShowingTagSuggest(true)}
          />
          {isShowingTagSuggest && tagQuery.trim() !== '' && (
            <div className='absolute top-full left-0 mt-1 w-full bg-secondary-dark border border-tertiary-dark rounded-lg shadow z-10 max-h-40 overflow-hidden'>
              <div className='max-h-40 overflow-y-auto custom-scroll'>
                {tagQuery.trim() &&
                  !allTags.some((tag) => (tag.name ?? '').toLowerCase() === tagQuery.trim().toLowerCase()) && (
                    <div
                      className='px-2 py-2 text-white hover:bg-tertiary-dark rounded-lg cursor-pointer'
                      onClick={async () => {
                        const newTagObj = await createNewTag(tagQuery.trim())
                        setAllTags((prev) => [...prev, newTagObj])
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
          )}
        </div>
      </div>
    </div>
  )
}
