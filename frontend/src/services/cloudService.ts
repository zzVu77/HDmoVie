import { MediaItem } from '@/types'

export async function uploadMediasToCloud(mediaItems: MediaItem[]): Promise<string[]> {
  if (!mediaItems || mediaItems.length === 0) {
    return []
  }

  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET

  if (!cloudName || !uploadPreset) {
    throw new Error('Cloudinary configuration is missing')
  }

  const uploadPromises = mediaItems.map(async (item) => {
    const formData = new FormData()
    formData.append('file', item.file)
    formData.append('upload_preset', uploadPreset)

    const isVideo = item.file.type.startsWith('video/')
    const endpoint = isVideo ? 'video/upload' : 'image/upload'

    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/${endpoint}`, {
      method: 'POST',
      body: formData,
    })

    const data = await response.json()
    if (!response.ok) {
      throw new Error(`Upload failed for ${item.file.name}: ${data.error?.message || 'Unknown error'}`)
    }

    return data.secure_url as string
  })

  const results = await Promise.allSettled(uploadPromises)

  const successfulUrls: string[] = []
  const errors: string[] = []

  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      successfulUrls.push(result.value)
    } else {
      const fileName = mediaItems[index]?.file.name || 'unknown file'
      errors.push(`${fileName}: ${result.reason.message}`)
    }
  })

  if (errors.length > 0) {
    throw new Error(errors.join(' '))
  }

  return successfulUrls
}
