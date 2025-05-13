import { useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { X, Image } from 'lucide-react'
import { TagType, MediaItem } from '@/types'
import { uploadMediasToCloud } from '@/services/cloudService'
import TagInput from './BlogTagInput'
import { Dialog, DialogFooter, DialogHeader } from './ui/dialog'
import { DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Text } from './ui/typography'
import { Avatar, AvatarFallback } from './ui/avatar'
import { format } from 'date-fns'

type WriteBlogTextEditorProps = {
  userFullName?: string
}

const dbTags: TagType[] = [{ id: '1', name: 'haha' }]

export default function WriteBlogTextEditor({ userFullName }: WriteBlogTextEditorProps) {
  const [content, setContent] = useState('')
  const [media, setMedia] = useState<MediaItem[]>([])

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
    try {
      const mediaCloudUrls = await uploadMediasToCloud(media)
      const newBlog = {
        content,
        images: mediaCloudUrls.map((url) => ({ url })),
        tags: [],
      }

      const res = await fetch('/api/blogs/createee', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBlog),
      })

      if (!res.ok) throw new Error('Failed to create blog')
      // const data = await res.json()
    } catch (err) {
      alert((err as Error).message)
    }
  }

  return (
    <>
      <Dialog>
        <DialogTrigger className='w-full bg-secondary-dark border-tertiary-dark border-b flex flex-row gap-x-4 items-center py-5 px-5'>
          <div onClick={(e) => e.stopPropagation()}>
            <a href='https://google.com'>
              <Avatar>
                <AvatarFallback className='bg-white text-primary-dark'>
                  {userFullName?.slice(0, 2) ?? 'US'}
                </AvatarFallback>
              </Avatar>
            </a>
          </div>
          <Text body={4} className='text-gray-500 cursor-text w-full text-left'>
            What's news?
          </Text>
        </DialogTrigger>
        <DialogContent className='gap-0 bg-secondary-dark border-tertiary-dark custom-sheet p-0 max-w-[700px]'>
          <DialogHeader className='flex items-center text-lg text-white font-bold p-3 border-b border-tertiary-dark'>
            New Blog
          </DialogHeader>

          <div className='w-full px-3 py-4 space-y-6 bg-secondary-dark rounded-lg shadow-lg'>
            {/*User information*/}
            <div className='pl-2 flex flex-row items-center gap-x-3 mb-1'>
              <Avatar>
                <AvatarFallback className='bg-white text-primary-dark'>
                  {userFullName?.slice(0, 2) ?? 'US'}
                </AvatarFallback>
              </Avatar>
              <div className='flex flex-col'>
                <Text body={4} className='text-white'>
                  {userFullName ?? 'Unknown'}
                </Text>
                <Text body={5} className='text-gray-500'>
                  {format(new Date(), 'dd/MM/yyyy')}
                </Text>
              </div>
            </div>

            <div className='flex flex-row items-center mt-1 mb-0 gap-y-2'>
              {/* Tag Selector */}
              <TagInput dbTags={dbTags} />
            </div>

            {/* Blog Content Textarea */}
            <Textarea
              className='resize-none min-h-15 text-white border-1 border-tertiary-dark focus:outline-none focus-visible:ring-0 mt-2 mb-0'
              placeholder="What's new?"
              value={content}
              autoFocus={true}
              onChange={(e) => setContent(e.target.value)}
            />

            <div className='mt-2 flex mb-0'>
              {/* Upload Input */}
              <label className='cursor-pointer text-gray-300 hover:text-white ml-auto'>
                <Image className='w-5 h-5' />
                <input type='file' accept='image/*,video/*' multiple hidden onChange={handleMediaUpload} />
              </label>
            </div>

            {/* Media Preview */}
            <div className={`flex flex-wrap gap-4 m-0 ${media.length !== 0 ? 'mt-3' : ''}`}>
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
          </div>

          <DialogFooter className='p-3 pt-0'>
            {/* Submit Button */}
            <Button
              className='w-full bg-tertiary-yellow cursor-pointer text-black hover:[box-shadow:0_0_5px_#fff]'
              onClick={handleSubmit}
            >
              Publish Blog
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
