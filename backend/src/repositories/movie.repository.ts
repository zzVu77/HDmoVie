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

  // Thêm phương thức findOne để tìm bộ phim theo ID
  async findOne(id: number): Promise<Movie | null> {
    return this.repository.findOne({ where: { id } as FindOptionsWhere<Movie> })
  }

}
