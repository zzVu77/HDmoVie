import { DataSource, FindOptionsWhere, Like, Repository } from 'typeorm'
import { Movie } from '~/models/movie.model'
export class MovieRepository {
  private repository: Repository<Movie>

  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(Movie)
  }

  async findAll(): Promise<Movie[]> {
    return this.repository.find({
      relations: ['genres', 'casts'],
    })
  }
  async create(movieData: Movie): Promise<Movie> {
    const movie = Movie.createNewMovie(movieData)
    return this.repository.save(movie)
  }

  async findById(id: string): Promise<Movie | null> {
    return this.repository.findOne({ where: { id } as FindOptionsWhere<Movie>, relations: ['genres', 'casts'] })
  }
  async searchByTitle(title: string): Promise<Movie[]> {
    try {
      return await this.repository
        .createQueryBuilder('movie')
        .leftJoinAndSelect('movie.genres', 'genres')
        .leftJoinAndSelect('movie.casts', 'casts')
        .where('movie.title LIKE :title', { title: `%${title}%` })
        .getMany()
    } catch (error: any) {
      console.error('Error in searchByTitle:', error.message, error.stack)
      throw error
    }
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id)
  }
}

// async create(movieData: Partial<Movie>): Promise<Movie> {
//   const movie = this.repository.create(movieData)
//   return this.repository.save(movie)
// }

// async update(id: number, movieData: Partial<Movie>): Promise<Movie | null> {
//   await this.repository.update(id, movieData)
//   return this.findById(id)
// }

// async findByTitle(title: string): Promise<Movie | null> {
//   return this.repository.findOneBy({ title })
// }
