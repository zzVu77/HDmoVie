import { GenreType } from '@/types'
import { apiGet, apiPost, apiPut, apiDelete } from '@/utils/axiosConfig'

export const genreService = {
  // Fetch all genres
  getGenres: async (): Promise<GenreType[]> => {
    try {
      const response = await apiGet<GenreType[]>('/genres')
      return response.data
    } catch {
      throw Error("Can't get Genres")
    }
  },

  // Create a new genre
  createGenre: async (payload: { name: string }): Promise<void> => {
    try {
      await apiPost('/genres/create', payload)
    } catch {
      throw Error("Can't create Genre")
    }
  },

  // Update an existing genre
  updateGenre: async (id: string, payload: { name: string }): Promise<void> => {
    try {
      await apiPut(`/genres/update/${id}`, payload)
    } catch {
      throw Error("Can't update Genre")
    }
  },
  deleteGenre: async (id?: string): Promise<void> => {
    try {
      await apiDelete(`/genres/delete/${id}`, {})
    } catch {
      throw Error("Can't Delete Genre")
    }
  },
}
