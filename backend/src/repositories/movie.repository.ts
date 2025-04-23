import { DataSource, Repository } from 'typeorm'
import { Movie } from '~/models/movie.model'
export class MovieRepository {
  private repository: Repository<Movie>

  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(Movie)
  }

  async findAll(): Promise<Movie[]> {
    return this.repository.find()
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
