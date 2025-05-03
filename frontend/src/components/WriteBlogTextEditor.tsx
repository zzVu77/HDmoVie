import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { X, Plus, Upload } from 'lucide-react'
import { TagType } from '@/types'

type MediaItem = {
  index: number
  type: 'image' | 'video'
  url: string
}

export default function WriteBlogTextEditor({ allTags }: { allTags: TagType[] }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [media, setMedia] = useState<MediaItem[]>([])
  const [selectedTags, setSelectedTags] = useState<TagType[]>([])
  const [newTag, setNewTag] = useState('')
  const [tagQuery, setTagQuery] = useState('')
  let tagIndex = 0

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

  const addTag = () => {
    if (!newTag.trim()) return
    const tagObj = { id: (tagIndex++).toString(), name: newTag.trim() }
    setSelectedTags((prev) => [...prev, tagObj])
    setNewTag('')
  }

  const toggleTag = (tag: TagType) => {
    if (selectedTags.some((t) => t.id === tag.id)) {
      setSelectedTags((prev) => prev.filter((t) => t.id !== tag.id))
    } else {
      setSelectedTags((prev) => [...prev, tag])
    }
  }

  const handleSubmit = () => {
    // Submit logic here
  }

  const filteredTags = allTags.filter((tag) => tag.name && tag.name.toLowerCase().includes(tagQuery.toLowerCase()))

  return (
    <div className='p-4 max-w-3xl mx-auto space-y-6 bg-secondary-dark rounded-xl border border-tertiary-dark'>
      <Input
        className='text-white bg-transparent border border-tertiary-dark'
        placeholder='Title of your blog...'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Textarea
        className='min-h-[200px] resize-none text-white bg-transparent border border-tertiary-dark'
        placeholder='Start writing your blog...'
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      {/* Media Preview */}
      <div className='flex flex-wrap gap-4'>
        {media.map((item) => (
          <div key={item.index} className='relative'>
            {item.type === 'image' ? (
              <img src={item.url} className='w-32 h-20 object-cover rounded' />
            ) : (
              <video src={item.url} className='w-32 h-20 object-cover rounded' controls />
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

      {/* Upload Input */}
      <label className='flex items-center gap-2 cursor-pointer text-primary-yellow'>
        <Upload className='w-4 h-4' />
        Upload Image/Video
        <input type='file' accept='image/*,video/*' multiple hidden onChange={handleMediaUpload} />
      </label>

      {/* Tag Selection */}
      <div className='space-y-2'>
        <div className='flex flex-wrap gap-2'>
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

        <Input
          className='bg-transparent text-white border border-tertiary-dark'
          placeholder='Search tags...'
          value={tagQuery}
          onChange={(e) => setTagQuery(e.target.value)}
        />
        <div className='flex flex-wrap gap-2'>
          {filteredTags.map((tag) => (
            <button
              key={tag.id}
              onClick={() => toggleTag(tag)}
              className='px-2 py-1 text-sm bg-gray-700 hover:bg-primary-yellow hover:text-black rounded-full'
            >
              {tag.name}
            </button>
          ))}
        </div>

        <div className='flex gap-2'>
          <Input
            className='bg-transparent text-white border border-tertiary-dark'
            placeholder='Create new tag...'
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
          />
          <Button type='button' onClick={addTag}>
            <Plus className='w-4 h-4 mr-1' /> Add
          </Button>
        </div>
      </div>

      {/* Submit Button */}
      <Button className='w-full bg-primary-yellow text-black' onClick={handleSubmit}>
        Publish Blog
      </Button>
    </div>
  )
}
