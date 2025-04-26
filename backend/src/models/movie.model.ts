import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm'
import { Genre } from './genre.model'
import { Cast } from './cast.model'

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

  // Getter methods
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

  static createNewMovie(data: Movie): Movie {
    // Ensure genres and casts are arrays
    data.genres = Array.isArray(data.genres) ? data.genres : []
    data.casts = Array.isArray(data.casts) ? data.casts : []

    // Create and return movie instance
    return new Movie(data)
  }
}
