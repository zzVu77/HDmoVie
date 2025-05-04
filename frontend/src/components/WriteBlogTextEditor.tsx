import { useState } from 'react'
import { useEffect, useRef } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Text } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { X, Image } from 'lucide-react'
import { TagType } from '@/types'

type MediaItem = {
  index: number
  type: 'image' | 'video'
  url: string
}

export default function WriteBlogTextEditor({ allTags }: { allTags: TagType[] }) {
  const [availableTags, setAvailableTags] = useState<TagType[]>(allTags)
  const [content, setContent] = useState('')
  const [media, setMedia] = useState<MediaItem[]>([])
  const [selectedTags, setSelectedTags] = useState<TagType[]>([])
  const [showTagInput, setShowTagInput] = useState(false)
  const [tagQuery, setTagQuery] = useState('')
  const tagInputRef = useRef<HTMLDivElement>(null)

  // Handle click outside to close tag input
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (tagInputRef.current && !tagInputRef.current.contains(e.target as Node)) {
        setShowTagInput(false)
      }
    }

    // Add event listener to document
    document.addEventListener('mousedown', handleClickOutside)
    // Cleanup function to remove event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Handle media upload
  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return
    const newMedia: MediaItem[] = Array.from(files).map((file) => ({
      index: Date.now() + Math.random(),
      type: file.type.startsWith('video') ? 'video' : 'image',
      url: URL.createObjectURL(file),
    }))
    setMedia((prev) => [...prev, ...newMedia])
  }

  const toggleTag = (tag: TagType) => {
    if (selectedTags.some((t) => t.id === tag.id)) {
      setAvailableTags((prev) => [...prev, tag]) // Add back to available tags
      setSelectedTags((prev) => prev.filter((t) => t.id !== tag.id))
    } else {
      setAvailableTags((prev) => prev.filter((t) => t.id !== tag.id)) // Remove from available tags
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

  const handleSubmit = () => {
    // Submit logic here
  }

  const filteredTags = availableTags.filter(
    (tag) => tag.name && tag.name.toLowerCase().includes(tagQuery.toLowerCase()),
  )

  return (
    <div className='w-full p-4 space-y-6 bg-secondary-dark rounded-lg border border-tertiary-dark shadow-lg'>
      {/* Header Section */}
      <div className='flex flex-row flex-wrap items-center mb-4 gap-y-2'>
        {/* Upload Input */}
        <label className='flex items-center gap-2 cursor-pointer text-gray-300 hover:text-white ml-2'>
          <Image className='w-5 h-5' />
          <input type='file' accept='image/*,video/*' multiple hidden onChange={handleMediaUpload} />
        </label>

        {/* Tag Selector */}
        {/* Tag Input & Dropdown */}
        <div ref={tagInputRef} className='relative ml-3'>
          <Input
            className='bg-transparent text-white h-5 p-4 border border-tertiary-dark'
            placeholder='Add hashtags...'
            value={tagQuery}
            onChange={(e) => setTagQuery(e.target.value)}
            onFocus={() => setShowTagInput(true)}
          />
          {/* Dropdown for tag suggestions or new tag creation */}
          {showTagInput && (
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
                        setShowTagInput(false)
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
                      setShowTagInput(false)
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

        {/* Selected Tags */}
        {selectedTags.map((tag) => (
          <div
            key={tag.id}
            className='bg-secondary-yellow text-black px-2 rounded-full text-sm flex items-center gap-1 ml-2'
          >
            {tag.name}
            <X className='w-3 h-3 cursor-pointer hover:text-gray-600' onClick={() => toggleTag(tag)} />
          </div>
        ))}
      </div>

      {/* Blog Content Textarea */}
      <Textarea
        className='resize-none text-white bg-transparent border-none outline-none focus:outline-none focus:ring-0 focus:shadow-none focus:border-none mt-2 mb-0'
        placeholder="What's new?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      {/* Media Preview */}
      <div className='flex flex-wrap gap-4 m-0 mt-3'>
        {media.map((item) => (
          <div key={item.index} className='relative'>
            {item.type === 'image' ? (
              <img src={item.url} className='h-20 object-cover rounded' />
            ) : (
              <video src={item.url} className='h-20 object-cover rounded' controls />
            )}
            <button
              className='absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 cursor-pointer'
              onClick={() => setMedia((prev) => prev.filter((m) => m.index !== item.index))}
            >
              <X className='w-3 h-3' />
            </button>
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <Button className='w-full bg-tertiary-yellow text-black mt-3' onClick={handleSubmit}>
        Publish Blog
      </Button>
    </div>
  )
}
