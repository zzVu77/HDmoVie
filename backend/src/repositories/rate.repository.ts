import { Repository, FindOptionsWhere } from 'typeorm'
import { Rate } from '~/models/rate.model'
import { AppDataSource } from '~/data-source'

export class RateRepository {
  private repository: Repository<Rate>

  constructor(dataSource = AppDataSource) {
    this.repository = dataSource.getRepository(Rate)
  }

  async create(rate: Rate): Promise<Rate> {
    try {
      return await this.repository.save(rate)
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  async findByMovieId(movieId: string): Promise<Rate[]> {
    try {
      return await this.repository.find({
        where: { movie: { id: movieId } } as FindOptionsWhere<Rate>,
        relations: ['user', 'movie'],
      })
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  async findByUserIdAndMovieId(userId: string, movieId: string): Promise<Rate | null> {
    try {
      return await this.repository.findOne({
        where: {
          user: { id: userId },
          movie: { id: movieId },
        } as FindOptionsWhere<Rate>,
        relations: ['user', 'movie'],
      })
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  async update(rate: Rate): Promise<Rate> {
    try {
      return await this.repository.save(rate)
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      const result = await this.repository.delete(id)
      return result.affected ? result.affected > 0 : false
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }
  async findByIdWithMovie(id: string): Promise<Rate | null> {
    try {
      return await this.repository.findOne({
        where: { id },
        relations: ['user', 'movie'],
      })
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }
}
