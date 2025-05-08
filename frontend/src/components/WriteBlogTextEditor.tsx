import { useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { X, Image } from 'lucide-react'
import { TagType, MediaItem } from '@/types'
import { uploadMediasToCloud } from '@/services/cloudService'
import { WithContext as ReactTags, SEPARATORS } from 'react-tag-input'

export default function WriteBlogTextEditor() {
  const [tags, setTags] = useState<TagType[]>([])
  const [content, setContent] = useState('')
  const [media, setMedia] = useState<MediaItem[]>([])

  // Handle events for tag selection
  // Delete a tag
  const handleDelete = (index: number) => {
    setTags(tags.filter((_, i) => i !== index))
  }

  // Update a tag
  const onTagUpdate = (index: number, newTag: TagType) => {
    const updatedTags = [...tags]
    // Remove old tag and insert new one
    updatedTags.splice(index, 1, newTag)
    setTags(updatedTags)
  }

  // Add a tag
  const handleAddition = (tag: TagType) => {
    setTags((prevTags) => {
      return [...prevTags, tag]
    })
  }

  // Drag tag on the selector
  const handleDrag = (tag: TagType, currPos: number, newPos: number) => {
    const newTags = tags.slice()

    newTags.splice(currPos, 1)
    newTags.splice(newPos, 0, tag)

    // re-render
    setTags(newTags)
  }

  const handleTagClick = (index: number) => {
    alert('Haha ' + index)
  }

  const onClearAll = () => {
    setTags([])
  }

  // Handle media upload
  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return
    const newMedias: MediaItem[] = Array.from(files).map((file) => ({
      index: Date.now() + Math.random(),
      file,
      type: file.type.startsWith('video') ? 'video' : 'image',
      url: URL.createObjectURL(file),
    }))
    setMedia((prev) => [...prev, ...newMedias])
  }

  const handleSubmit = async () => {
    // Submit logic here
    // Upload media to cloud
    const mediaCloudUrls = await uploadMediasToCloud(media)

    const newBlog = {
      content,
      images: mediaCloudUrls.map((url) => {
        return { url: url }
      }),
      tags: [],
    }
    // Send newBlog to the server or handle it as needed
    fetch('/api/blogs/createee', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newBlog),
    }).then((res) => {
      if (!res.ok) throw new Error('Failed to create blog')
      return res.json()
    })
  }

  return (
    <div className='w-full p-4 space-y-6 bg-secondary-dark rounded-lg border border-tertiary-dark shadow-lg'>
      {/* Header Section */}
      <div className='flex flex-row flex-wrap items-center mb-0 gap-y-2'>
        {/* Upload Input */}
        <label className='flex items-center gap-2 cursor-pointer text-gray-300 hover:text-white ml-2'>
          <Image className='w-5 h-5' />
          <input type='file' accept='image/*,video/*' multiple hidden onChange={handleMediaUpload} />
        </label>

        {/* Tag Selector */}
        <ReactTags
          separators={[SEPARATORS.ENTER, SEPARATORS.COMMA]}
          handleDelete={handleDelete}
          handleAddition={handleAddition}
          handleDrag={handleDrag}
          handleTagClick={handleTagClick}
          onTagUpdate={onTagUpdate}
          inputFieldPosition='bottom'
          editable
          clearAll
          onClearAll={onClearAll}
          maxTags={7}
        />
      </div>

      {/* Blog Content Textarea */}
      <Textarea
        className='resize-none min-h-0 text-white border-none focus:outline-none focus-visible:ring-0 mt-1 mb-0'
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
      <Button
        className='w-full bg-tertiary-yellow cursor-pointer text-black mt-3 hover:[box-shadow:0_0_5px_#fff]'
        onClick={handleSubmit}
      >
        Publish Blog
      </Button>
    </div>
  )
}
