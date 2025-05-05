// src/utils/cloudinary.ts

// Cloudinary configuration
// export const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'do2ffxgqt'
// export const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'blog_uploads'
export const CLOUDINARY_CLOUD_NAME = 'do2ffxgqt'
export const CLOUDINARY_UPLOAD_PRESET = 'blog_uploads'
/**
 * Uploads a single file to Cloudinary
 * @param file - The file to upload
 * @returns Promise resolving to the secure URL of the uploaded image
 * @throws Error if the upload fails
 */
export const uploadToCloudinary = async (file: File): Promise<string> => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)

  try {
    const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      throw new Error(`Upload failed with status: ${response.status}`)
    }

    const data: { secure_url: string } = await response.json()
    return data.secure_url
  } catch {
    throw new Error('Failed to upload image to Cloudinary')
  }
}

/**
 * Uploads multiple files to Cloudinary
 * @param files - Array of files to upload
 * @returns Promise resolving to an array of secure URLs
 * @throws Error if any upload fails
 */
export const uploadMultipleToCloudinary = async (files: File[]): Promise<string[]> => {
  if (files.length === 0) return []

  const uploadPromises = files.map((file) => uploadToCloudinary(file))

  try {
    return await Promise.all(uploadPromises)
  } catch {
    throw new Error('Failed to upload multiple images to Cloudinary')
  }
}
