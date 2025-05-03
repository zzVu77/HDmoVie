import { useState, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/typography'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { X, Image as ImageIcon, Plus, Loader2 } from 'lucide-react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'

// Define interfaces for clarity and TypeScript compliance
interface Tag {
  id: string
  name: string
}

interface ImagePreview {
  file: File
  url: string
  uploaded: boolean
  uploading: boolean
  cloudUrl?: string
}

interface CreateBlogProps {
  onPostCreated?: () => void
}

const CreateBlog = ({ onPostCreated }: CreateBlogProps) => {
  const navigate = useNavigate()
  const [content, setContent] = useState('')
  const [tags, setTags] = useState<Tag[]>([])
  const [newTag, setNewTag] = useState('')
  const [imagePreviewList, setImagePreviewList] = useState<ImagePreview[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [previewMode, setPreviewMode] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageSelection = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    const newImagePreviews: ImagePreview[] = Array.from(files).map((file) => ({
      file,
      url: URL.createObjectURL(file),
      uploaded: false,
      uploading: false,
    }))

    setImagePreviewList((prev) => [...prev, ...newImagePreviews])

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }, [])

  const uploadImagesToCloud = useCallback(async (): Promise<string[]> => {
    const imagesToUpload = imagePreviewList.filter((img) => !img.uploaded)
    if (imagesToUpload.length === 0) return []

    setIsUploading(true)
    setImagePreviewList((prev) => prev.map((img) => (!img.uploaded ? { ...img, uploading: true } : img)))

    try {
      const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
      const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET

      if (!cloudName || !uploadPreset) {
        throw new Error('Cloudinary configuration is missing')
      }

      const uploadPromises = imagesToUpload.map(async (img) => {
        const formData = new FormData()
        formData.append('file', img.file)
        formData.append('upload_preset', uploadPreset)

        const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
          method: 'POST',
          body: formData,
        })
        const data = await response.json()
        if (!response.ok) {
          throw new Error(`Upload failed for image: ${data.error?.message || 'Unknown error'}`)
        }
        return { originalFile: img.file, cloudUrl: data.secure_url as string }
      })

      const uploadedImages = await Promise.all(uploadPromises)

      setImagePreviewList((prev) =>
        prev.map((img) => {
          const uploadResult = uploadedImages.find((result) => result.originalFile === img.file)
          if (uploadResult) {
            return {
              ...img,
              cloudUrl: uploadResult.cloudUrl,
              uploaded: true,
              uploading: false,
            }
          }
          return img
        }),
      )

      return uploadedImages.map((img) => img.cloudUrl)
    } catch (error) {
      throw new Error(`Error uploading images to cloud ${error}`)
      setImagePreviewList((prev) => prev.map((img) => (img.uploading ? { ...img, uploading: false } : img)))
      return []
    } finally {
      setIsUploading(false)
    }
  }, [imagePreviewList])

  const handleAddTag = useCallback(() => {
    if (newTag.trim() && !tags.some((tag) => tag.name === newTag.trim())) {
      setTags((prev) => [...prev, { id: `tag-${Date.now()}`, name: newTag.trim() }])
      setNewTag('')
    }
  }, [newTag, tags])

  const handleNewTagKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        handleAddTag()
      }
    },
    [handleAddTag],
  )

  const handleRemoveTag = useCallback((tagId: string) => {
    setTags((prev) => prev.filter((tag) => tag.id !== tagId))
  }, [])

  const handleRemoveImage = useCallback((index: number) => {
    setImagePreviewList((prev) => {
      const imageToRemove = prev[index]
      URL.revokeObjectURL(imageToRemove.url)
      return prev.filter((_, i) => i !== index)
    })
  }, [])

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      if (!content.trim()) return

      setIsSubmitting(true)

      try {
        const cloudImageUrls = await uploadImagesToCloud()
        const existingCloudUrls = imagePreviewList
          .filter((img) => img.uploaded && img.cloudUrl)
          .map((img) => img.cloudUrl as string)

        const allCloudUrls = [...existingCloudUrls, ...cloudImageUrls]

        const newBlog = {
          content,
          tags,
          images: allCloudUrls,
          dateCreated: new Date().toISOString(),
        }

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        onPostCreated?.()
        navigate('/blog')
      } catch (error) {
        throw new Error(`Error creating blog: ${error}`)
      } finally {
        setIsSubmitting(false)
      }
    },
    [content, imagePreviewList, navigate, onPostCreated, tags, uploadImagesToCloud],
  )

  const togglePreviewMode = useCallback(() => {
    setPreviewMode((prev) => !prev)
  }, [])

  return (
    <Card className='max-w-2xl mx-auto my-8 bg-tertiary-dark border-zinc-700'>
      <CardHeader>
        <div className='flex justify-between items-center'>
          <Text className='text-xl font-semibold'>Create New Blog Post</Text>
          <Button
            type='button'
            variant='ghost'
            onClick={togglePreviewMode}
            className='text-primary-yellow hover:text-yellow-300'
            aria-label={previewMode ? 'Switch to Edit Mode' : 'Switch to Preview Mode'}
          >
            {previewMode ? 'Edit Mode' : 'Preview Mode'}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='space-y-2'>
            <Textarea
              placeholder="What's on your mind?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className='min-h-[200px] bg-zinc-800 border-zinc-700 text-white'
              disabled={previewMode || isSubmitting}
              aria-label='Blog post content'
            />
          </div>

          {imagePreviewList.length > 0 && (
            <div className='mb-6'>
              <Text className='font-medium mb-2'>Images ({imagePreviewList.length})</Text>
              {imagePreviewList.length > 1 ? (
                <Carousel className='w-full'>
                  <CarouselContent>
                    {imagePreviewList.map((img, index) => (
                      <CarouselItem key={index} className='basis-full md:basis-1/2 lg:basis-1/3'>
                        <div className='relative p-1'>
                          <div className='overflow-hidden rounded-lg aspect-square bg-zinc-800'>
                            <div className='relative w-full h-full'>
                              <img
                                src={img.url}
                                alt={`Blog image ${index + 1}`}
                                className='w-full h-full object-cover'
                              />
                              {img.uploading && (
                                <div className='absolute inset-0 bg-black/50 flex items-center justify-center'>
                                  <Loader2 className='animate-spin text-white' size={24} aria-label='Uploading' />
                                </div>
                              )}
                            </div>
                            {!previewMode && !isSubmitting && (
                              <button
                                onClick={() => handleRemoveImage(index)}
                                className='absolute top-3 right-3 bg-black/70 hover:bg-black text-white rounded-full p-1'
                                type='button'
                                aria-label={`Remove image ${index + 1}`}
                              >
                                <X size={16} />
                              </button>
                            )}
                          </div>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <div className='flex justify-center mt-2'>
                    <div className='flex gap-2'>
                      <CarouselPrevious
                        className='static translate-y-0 bg-zinc-800 hover:bg-zinc-700 border-zinc-700'
                        aria-label='Previous image'
                      />
                      <CarouselNext
                        className='static translate-y-0 bg-zinc-800 hover:bg-zinc-700 border-zinc-700'
                        aria-label='Next image'
                      />
                    </div>
                  </div>
                </Carousel>
              ) : (
                <div className='relative rounded-lg overflow-hidden'>
                  <div className='relative w-full h-64'>
                    <img src={imagePreviewList[0].url} alt='Blog image' className='w-full h-full object-cover' />
                    {imagePreviewList[0].uploading && (
                      <div className='absolute inset-0 bg-black/50 flex items-center justify-center'>
                        <Loader2 className='animate-spin text-white' size={24} aria-label='Uploading' />
                      </div>
                    )}
                  </div>
                  {!previewMode && !isSubmitting && (
                    <button
                      onClick={() => handleRemoveImage(0)}
                      className='absolute top-3 right-3 bg-black/70 hover:bg-black text-white rounded-full p-1'
                      type='button'
                      aria-label='Remove image'
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          {!previewMode && (
            <>
              <div className='space-y-2'>
                <div className='flex items-center gap-2'>
                  <Input
                    type='text'
                    placeholder='Add a tag'
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyDown={handleNewTagKeyDown}
                    className='bg-zinc-800 border-zinc-700 text-white'
                    disabled={isSubmitting}
                    aria-label='New tag input'
                  />
                  <Button
                    type='button'
                    onClick={handleAddTag}
                    className='bg-primary-yellow hover:bg-secondary-yellow text-black'
                    disabled={isSubmitting}
                    aria-label='Add tag'
                  >
                    <Plus size={16} />
                  </Button>
                </div>
                <div className='flex flex-wrap gap-2'>
                  {tags.map((tag) => (
                    <Badge key={tag.id} variant='outline' className='text-white flex items-center gap-1'>
                      {tag.name}
                      <button
                        onClick={() => handleRemoveTag(tag.id)}
                        className='hover:text-red-400'
                        type='button'
                        disabled={isSubmitting}
                        aria-label={`Remove tag ${tag.name}`}
                      >
                        <X size={14} />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              <div className='space-y-2'>
                <input
                  type='file'
                  ref={fileInputRef}
                  onChange={handleImageSelection}
                  multiple
                  accept='image/*'
                  className='hidden'
                  disabled={isSubmitting}
                  id='image-upload'
                />
                <Button
                  type='button'
                  onClick={() => fileInputRef.current?.click()}
                  className='bg-zinc-800 hover:bg-zinc-700 text-white'
                  disabled={isSubmitting}
                  aria-label='Select images'
                >
                  <ImageIcon size={16} className='mr-2' />
                  Select Images
                </Button>
                <Text className='text-xs text-zinc-400 mt-1'>Images will be uploaded when you submit the post</Text>
              </div>
            </>
          )}

          {previewMode && tags.length > 0 && (
            <div className='space-y-2'>
              <Text className='font-medium'>Tags</Text>
              <div className='flex flex-wrap gap-2'>
                {tags.map((tag) => (
                  <Badge key={tag.id} variant='outline' className='text-white'>
                    {tag.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div className='flex justify-end'>
            <Button
              type='submit'
              className='bg-primary-yellow hover:bg-secondary-yellow text-black'
              disabled={!content.trim() || isSubmitting || isUploading}
              aria-label='Submit blog post'
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className='mr-2 animate-spin' aria-hidden='true' />
                  {isUploading ? 'Uploading Images...' : 'Creating Post...'}
                </>
              ) : (
                'Post'
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default CreateBlog
