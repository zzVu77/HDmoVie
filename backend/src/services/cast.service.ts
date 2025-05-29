import { Cast } from '~/models/cast.model'
import { CastRepository } from '~/repositories/cast.repository'

export class CastService {
  constructor(private castRepository: CastRepository) {}
  async validateCasts(castIds: string[]): Promise<Cast[]> {
    const casts = await this.castRepository.findByIds(castIds)
    if (casts.length !== castIds.length) {
      throw new Error('One or more cast IDs do not exist')
    }
    return casts
  }
  async getAllCasts(): Promise<Cast[]> {
    try {
      return await this.castRepository.findAll()
    } catch (error) {
      throw new Error(`Failed to get all casts: ${(error as Error).message}`)
    }
  }

  async createCast(name: string, profilePath: string): Promise<Cast> {
    try {
      const castData = new Cast(name, profilePath)
      return await this.castRepository.create(castData)
    } catch (error) {
      throw new Error(`Failed to create cast: ${(error as Error).message}`)
    }
  }

  async getCastById(id: string): Promise<Cast | null> {
    try {
      return this.castRepository.findById(id)
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  async deleteCast(id: string): Promise<void> {
    try {
      await this.castRepository.delete(id)
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  async updateCast(id: string, name: string, profilePath: string): Promise<Cast | null> {
    const cast = await this.castRepository.findById(id)

    if (!cast) {
      throw new Error('Cast not found')
    }
    cast.updateCast(name, profilePath)
    return this.castRepository.update(cast)
  }
}
