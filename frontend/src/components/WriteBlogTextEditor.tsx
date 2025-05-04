import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Text } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { X, Images, Hash } from 'lucide-react'
import { TagType } from '@/types'

type MediaItem = {
  index: number
  type: 'image' | 'video'
  url: string
}

export default function WriteBlogTextEditor({ allTags }: { allTags: TagType[] }) {
  const [content, setContent] = useState('')
  const [media, setMedia] = useState<MediaItem[]>([])
  const [selectedTags, setSelectedTags] = useState<TagType[]>([])
  const [showTagInput, setShowTagInput] = useState(false)
  // const [newTag, setNewTag] = useState('')
  const [tagQuery, setTagQuery] = useState('')
  let tagIndex = 0

  // Handle media upload
  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return
    const newMedia: MediaItem[] = Array.from(files).map((file) => ({
      index: tagIndex++,
      type: file.type.startsWith('video') ? 'video' : 'image',
      url: URL.createObjectURL(file),
    }))
    setMedia((prev) => [...prev, ...newMedia])
  }

  // Handle tag addition
  // const addTag = () => {
  //   if (!newTag.trim()) return
  //   const tagObj = { id: (tagIndex++).toString(), name: newTag.trim() }
  //   setSelectedTags((prev) => [...prev, tagObj])
  //   setNewTag('')
  // }

  const toggleTag = (tag: TagType) => {
    if (selectedTags.some((t) => t.id === tag.id)) {
      setSelectedTags((prev) => prev.filter((t) => t.id !== tag.id))
    } else {
      setSelectedTags((prev) => [...prev, tag])
    }
  }

  const createNewTag = async (name: string) => {
    const res = await fetch('/api/tags', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    })
    if (!res.ok) throw new Error('Failed to create tag')
    return await res.json()
  }

  const handleSubmit = () => {
    // Submit logic here
  }

  const filteredTags = allTags.filter((tag) => tag.name && tag.name.toLowerCase().includes(tagQuery.toLowerCase()))

  return (
    <div className='w-full p-4 space-y-6 bg-secondary-dark rounded-lg border border-tertiary-dark shadow-lg'>
      <div className='flex flex-row items-center mb-3'>
        {/* Upload Input */}
        <label className='flex items-center gap-2 cursor-pointer text-gray-300 hover:text-white ml-2'>
          <Images className='w-5 h-5' />
          <input type='file' accept='image/*,video/*' multiple hidden onChange={handleMediaUpload} />
        </label>

        {/* Tag Selector */}
        <div className='relative flex flex-row items-center ml-3 mb-0'>
          {/* Hash Icon Trigger */}
          <button className='text-gray-300 hover:text-white' onClick={() => setShowTagInput(!showTagInput)}>
            <Hash className='w-5 h-5' />
          </button>

          {/* Tag Input & Dropdown */}
          {showTagInput && (
            <div className='relative ml-3'>
              <Input
                className='bg-transparent text-white h-5 py-0'
                placeholder='Search or add tag...'
                value={tagQuery}
                onChange={(e) => setTagQuery(e.target.value)}
              />
              {/* Dropdown for tag suggestions or new tag creation */}
              <div className='absolute mt-1 w-full bg-secondary-dark border border-tertiary-dark rounded-lg shadow z-10 max-h-40'>
                <div className='max-h-40 overflow-y-auto custom-scroll'>
                  {filteredTags.length > 0 ? (
                    filteredTags.map((tag) => (
                      <div
                        key={tag.id}
                        onClick={() => {
                          toggleTag(tag)
                          setTagQuery('')
                          setShowTagInput(false)
                        }}
                        className='px-2 py-2 hover:bg-tertiary-dark text-white cursor-pointer'
                      >
                        {tag.name}
                      </div>
                    ))
                  ) : (
                    <div
                      className='px-2 py-2 text-white hover:bg-tertiary-dark cursor-pointer'
                      onClick={async () => {
                        const newTagObj = await createNewTag(tagQuery)
                        toggleTag(newTagObj)
                        setTagQuery('')
                        setShowTagInput(false)
                      }}
                    >
                      {tagQuery} <br />{' '}
                      <Text body={5} className='text-gray-400'>
                        Add new topic
                      </Text>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Selected Tags */}
          <div className='flex flex-wrap gap-2 ml-2'>
            {selectedTags.map((tag) => (
              <span
                key={tag.id}
                className='bg-primary-yellow text-black px-2 py-1 rounded-full text-sm flex items-center gap-1'
              >
                {tag.name}
                <X className='w-3 h-3 cursor-pointer' onClick={() => toggleTag(tag)} />
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Blog Content Textarea */}
      <Textarea
        className='resize-none text-white bg-transparent border-none outline-none focus:outline-none focus:ring-0 focus:shadow-none focus:border-none mt-2 mb-0'
        placeholder="What's new?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      {/* Media Preview */}
      <div className='flex flex-wrap gap-4 m-0 mt-2'>
        {media.map((item) => (
          <div key={item.index} className='relative'>
            {item.type === 'image' ? (
              <img src={item.url} className='h-20 object-cover rounded' />
            ) : (
              <video src={item.url} className='h-20 object-cover rounded' controls />
            )}
            <button
              className='absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1'
              onClick={() => setMedia((prev) => prev.filter((m) => m.index !== item.index))}
            >
              <X className='w-4 h-4' />
            </button>
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <Button className='w-full bg-primary-yellow text-black mt-2' onClick={handleSubmit}>
        Publish Blog
      </Button>
    </div>
  )
}
