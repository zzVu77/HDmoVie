import { MediaItem } from '@/types'

export async function uploadMediasToCloud(mediaItems: MediaItem[]): Promise<string[]> {
  if (!mediaItems || mediaItems.length === 0) {
    return []
  }

  try {
    // Check if Cloudinary configuration is available
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET

    if (!cloudName || !uploadPreset) {
      throw new Error('Cloudinary configuration is missing')
    }

    // Upload images to Cloudinary
    // Create an array of promises for each image upload
    const uploadPromises = mediaItems.map(async (img) => {
      // Create a FormData object to send the image file
      const formData = new FormData()
      formData.append('file', img.file)
      formData.append('upload_preset', uploadPreset)

      // Send the image file to Cloudinary
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formData,
      })

      // Check if the response is OK and parse the JSON data
      const data = await response.json()
      if (!response.ok) {
        throw new Error(`Upload failed for image: ${data.error?.message || 'Unknown error'}`)
      }

      // Return the URL of the uploaded image
      return data.secure_url as string
    })

    return await Promise.all(uploadPromises)
  } catch (error) {
    throw new Error(`Error uploading images to cloud ${(error as Error).message}`)
  }
}
