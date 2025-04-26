import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm'
import { Genre } from './genre.model'
import { Cast } from './cast.model' // Import Cast entity

@Entity('movies')
export class Movie {
  @PrimaryGeneratedColumn('uuid')
  private id!: string

  @Column({ type: 'varchar', length: 255 })
  private title!: string

  @Column({ type: 'text' })
  private description!: string

  @Column({ type: 'date' })
  private releaseYear!: string

  @Column({ type: 'text', nullable: true })
  private trailerSource!: string

  @Column({ type: 'text' })
  private posterSource!: string

  @Column({ type: 'text' })
  private backdropSource!: string

  @Column({ type: 'float' })
  private voteAvg!: number

  @Column({ type: 'int' })
  private voteCount!: number

  @ManyToMany(() => Genre, { cascade: true })
  @JoinTable({
    name: 'movies_genres',
    joinColumn: { name: 'movieId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'genreId', referencedColumnName: 'id' },
  })
  private genres!: Genre[]

  @ManyToMany(() => Cast, { cascade: true })
  @JoinTable({
    name: 'movies_casts',
    joinColumn: { name: 'movieId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'castId', referencedColumnName: 'id' },
  })
  private casts!: Cast[]

  constructor(data?: Partial<Movie>) {
    if (data) {
      Object.assign(this, data)
    }
  }
  // Getter and Setter methods
  getId(): string {
    return this.id
  }

  getTitle(): string {
    return this.title
  }

  getDescription(): string {
    return this.description
  }

  getReleaseYear(): string {
    return this.releaseYear
  }

  getTrailerSource(): string | undefined {
    return this.trailerSource
  }

  getPosterSource(): string {
    return this.posterSource
  }

  getBackdropSource(): string {
    return this.backdropSource
  }

  getVoteAvg(): number {
    return this.voteAvg
  }

  getVoteCount(): number {
    return this.voteCount
  }

  getGenres(): Genre[] {
    return this.genres
  }

  getCasts(): Cast[] {
    return this.casts
  }
  //Business logic
  static createNewMovie(data: Movie): Movie {
    // Validation
    if (!data.title || data.title.trim() === '') {
      throw new Error('Movie title is required')
    }
    if (!data.description) {
      throw new Error('Movie description is required')
    }
    if (!data.releaseYear) {
      throw new Error('Release year is required')
    }
    if (!data.posterSource) {
      throw new Error('Poster source is required')
    }
    if (!data.backdropSource) {
      throw new Error('Backdrop source is required')
    }
    if (data.voteAvg === undefined || data.voteAvg < 0 || data.voteAvg > 10) {
      throw new Error('Vote average must be between 0 and 10')
    }
    if (data.voteCount === undefined || data.voteCount < 0) {
      throw new Error('Vote count must be non-negative')
    }

    // Ensure genres and casts are arrays
    data.genres = Array.isArray(data.genres) ? data.genres : []
    data.casts = Array.isArray(data.casts) ? data.casts : []

    // Create and return movie instance
    return new Movie(data)
  }
}
