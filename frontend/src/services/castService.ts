import { CastType } from '@/types'
import { apiGet, apiPost, apiPut, apiDelete } from '@/utils/axiosConfig'

export const castService = {
  // Fetch all casts
  getCasts: async (): Promise<CastType[]> => {
    try {
      const response = await apiGet<CastType[]>('/casts')
      return response.data
    } catch {
      throw Error("Can't get Casts")
    }
  },

  // Create a new Cast
  createCast: async (payload: { name: string; profilePath?: string }): Promise<void> => {
    try {
      await apiPost('/casts/create', payload)
    } catch {
      throw Error("Can't create Cast")
    }
  },

  // Update an existing Cast
  updateCast: async (id: string, payload: { name: string; profilePath?: string }): Promise<void> => {
    try {
      await apiPut(`/casts/update/${id}`, payload)
    } catch {
      throw Error("Can't update Cast")
    }
  },
  deleteCast: async (id?: string): Promise<void> => {
    try {
      await apiDelete(`/casts/delete/${id}`, {})
    } catch {
      throw Error("Can't Delete Cast")
    }
  },
}
