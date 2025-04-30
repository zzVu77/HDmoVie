import { DataSource, Repository, FindOptionsWhere } from 'typeorm'
import { Movie } from '~/models/movie.model'
export class MovieRepository {
  private repository: Repository<Movie>

  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(Movie)
  }

  async findAll(): Promise<Movie[]> {
    return this.repository.find()
  }
  async create(movieData: Movie): Promise<Movie> {
    // Create movie instance using model
    const movie = Movie.createNewMovie(movieData)
    // Save to database
    return this.repository.save(movie)
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

  // async findById(id: number): Promise<Movie | null> {
  //   return this.repository.findOneBy({ id })
  // }

  // async create(movieData: Partial<Movie>): Promise<Movie> {
  //   const movie = this.repository.create(movieData)
  //   return this.repository.save(movie)
  // }

  // async update(id: number, movieData: Partial<Movie>): Promise<Movie | null> {
  //   await this.repository.update(id, movieData)
  //   return this.findById(id)
  // }

  // async delete(id: number): Promise<void> {
  //   await this.repository.delete(id)
  // }
  // async findByTitle(title: string): Promise<Movie | null> {
  //   return this.repository.findOneBy({ title })
  // }
}
