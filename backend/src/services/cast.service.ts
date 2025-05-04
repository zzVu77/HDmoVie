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
}
