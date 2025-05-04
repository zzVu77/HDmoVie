import 'reflect-metadata'
import { DataSource, FindOptionsWhere, Repository } from 'typeorm'
import { Movie } from '~/models/movie.model'

export class MovieRepository {
  private repository: Repository<Movie>

  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(Movie)
  }

  async findAll(): Promise<Movie[]> {
    try {
      return this.repository.find({
        relations: ['genres', 'casts'],
      })
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  async create(movieData: Movie): Promise<Movie> {
    try {
      return this.repository.save(movieData)
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  async findById(id: string): Promise<Movie | null> {
    try {
      return this.repository.findOne({
        where: { id } as FindOptionsWhere<Movie>,
        relations: ['genres', 'casts'],
      })
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  async searchByTitle(title: string): Promise<Movie[]> {
    try {
      return await this.repository
        .createQueryBuilder('movie')
        .leftJoinAndSelect('movie.genres', 'genres')
        .leftJoinAndSelect('movie.casts', 'casts')
        .where('movie.title LIKE :title', { title: `%${title}%` })
        .getMany()
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.repository.delete(id)
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }
  async update(movie: Movie): Promise<Movie> {
    return this.repository.save(movie)
  }
}
