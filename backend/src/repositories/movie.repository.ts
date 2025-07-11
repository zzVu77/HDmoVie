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
      // Get all movies ordered by release year
      const allMovies = await this.repository
        .createQueryBuilder('movie')
        .leftJoinAndSelect('movie.genres', 'genres')
        .leftJoinAndSelect('movie.casts', 'casts')
        .orderBy('movie.releaseYear', 'DESC')
        .getMany()

      // Return only the requested limit
      return allMovies.slice(0, limit)
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  async findTopRatedMovies(limit: number): Promise<Movie[]> {
    try {
      // Get all movies ordered by vote average
      const allMovies = await this.repository
        .createQueryBuilder('movie')
        .leftJoinAndSelect('movie.genres', 'genres')
        .leftJoinAndSelect('movie.casts', 'casts')
        .orderBy('movie.voteAvg', 'DESC')
        .getMany()

      // Return only the requested limit
      return allMovies.slice(0, limit)
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }
  async findTrendingMovies(limit: number): Promise<Movie[]> {
    try {
      // Get all movies with their vote counts and comment counts
      const allMovies = await this.repository
        .createQueryBuilder('movie')
        .leftJoinAndSelect('movie.genres', 'genres')
        .leftJoinAndSelect('movie.casts', 'casts')
        .leftJoin('Comment', 'comments', 'comments.movieId = movie.id')
        .addSelect('COUNT(DISTINCT comments.id)', 'commentCount')
        .groupBy('movie.id')
        .addGroupBy('genres.id')
        .addGroupBy('casts.id')
        .orderBy('(movie.voteCount + COUNT(DISTINCT comments.id))', 'DESC')
        .getMany()

      // Return only the requested limit
      return allMovies.slice(0, limit)
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  // Đổi tên tránh trùng với method có sẵn trong TypeORM Repository
  async findOneById(id: string): Promise<Movie | null> {
    try {
      return this.repository.findOne({ where: { id } as FindOptionsWhere<Movie> })
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }
}
