import { TagType } from '@/types'
import { apiGet, apiPost, apiDelete } from '@/utils/axiosConfig'

export const tagService = {
  // Fetch all genres
  getTags: async (): Promise<TagType[]> => {
    try {
      const response = await apiGet<TagType[]>('/tags')
      return response.data
    } catch {
      throw Error("Can't get Tags")
    }
  },

  // Create a new tag
  createTag: async (payload: { name: string }): Promise<void> => {
    try {
      await apiPost('/tags/create', payload)
    } catch {
      throw Error("Can't create Tag")
    }
  },

  deleteTag: async (id?: string): Promise<void> => {
    try {
      await apiDelete(`/tags/delete/${id}`, {})
    } catch {
      throw Error("Can't Delete Tag")
    }
  },
}
