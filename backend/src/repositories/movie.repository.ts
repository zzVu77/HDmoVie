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

  async findMoviesByGenreIds(genreIds: string[], excludeMovieId: string, limit: number): Promise<Movie[]> {
    try {
      return this.repository
        .createQueryBuilder('movie')
        .leftJoinAndSelect('movie.genres', 'genre')
        .where('genre.id IN (:...genreIds)', { genreIds })
        .andWhere('movie.id != :excludeMovieId', { excludeMovieId })
        .limit(limit)
        .getMany()
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  async searchByTitle(title: string): Promise<Movie[]> {
    try {
      return this.repository
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
    try {
      return this.repository.save(movie)
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }
  async findLatestMovies(limit: number): Promise<Movie[]> {
    try {
      return this.repository
        .createQueryBuilder('movie')
        .leftJoinAndSelect('movie.genres', 'genres')
        .leftJoinAndSelect('movie.casts', 'casts')
        .orderBy('movie.releaseYear', 'DESC')
        .limit(limit)
        .getMany()
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  async findTopRatedMovies(limit: number): Promise<Movie[]> {
    try {
      return this.repository
        .createQueryBuilder('movie')
        .leftJoinAndSelect('movie.genres', 'genres')
        .leftJoinAndSelect('movie.casts', 'casts')
        .orderBy('movie.voteAvg', 'DESC')
        .limit(limit)
        .getMany()
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  async findTrendingMovies(limit: number): Promise<Movie[]> {
    try {
      return this.repository
        .createQueryBuilder('movie')
        .leftJoinAndSelect('movie.genres', 'genres')
        .leftJoinAndSelect('movie.casts', 'casts')
        .orderBy('movie.voteCount', 'DESC')
        .limit(limit)
        .getMany()
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  // Đổi tên tránh trùng với method có sẵn trong TypeORM Repository
  async findOneById(id: number): Promise<Movie | null> {
    try {
      return this.repository.findOne({ where: { id } as FindOptionsWhere<Movie> })
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }
}
