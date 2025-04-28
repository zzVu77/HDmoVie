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

  constructor(
    title: string,
    description: string,
    releaseYear: string,
    trailerSource: string,
    posterSource: string,
    backdropSource: string,
    voteAvg: number,
    voteCount: number,
    genres: Genre[],
    casts: Cast[],
  ) {
    this.title = title
    this.description = description
    this.releaseYear = releaseYear
    this.trailerSource = trailerSource
    this.posterSource = posterSource
    this.backdropSource = backdropSource
    this.voteAvg = voteAvg
    this.voteCount = voteCount
    this.genres = genres
    this.casts = casts
  }

  updateMovie(
    updateTitle?: string,
    updateDescription?: string,
    updateReleaseYear?: string,
    updateTrailerSource?: string,
    updatePosterSource?: string,
    updateBackdropSource?: string,
    updateVoteAvg?: number,
    updateVoteCount?: number,
    updateGenres?: Genre[],
    updateCasts?: Cast[],
  ): void {
    this.setTitle(updateTitle ?? this.title)
    this.setDescription(updateDescription ?? this.description)
    this.setReleaseYear(updateReleaseYear ?? this.releaseYear)
    this.setTrailerSource(updateTrailerSource ?? this.trailerSource)
    this.setPosterSource(updatePosterSource ?? this.posterSource)
    this.setBackdropSource(updateBackdropSource ?? this.backdropSource)
    this.setVoteAvg(updateVoteAvg ?? this.voteAvg)
    this.setVoteCount(updateVoteCount ?? this.voteCount)
    this.setGenres(updateGenres ?? this.genres)
    this.setCasts(updateCasts ?? this.casts)
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

  // Setter methods
  setId(id: string): void {
    this.id = id
  }
  setTitle(title: string): void {
    this.title = title
  }
  setDescription(description: string): void {
    this.description = description
  }
  setReleaseYear(releaseYear: string): void {
    this.releaseYear = releaseYear
  }
  setTrailerSource(trailerSource: string): void {
    this.trailerSource = trailerSource
  }
  setPosterSource(posterSource: string): void {
    this.posterSource = posterSource
  }
  setBackdropSource(backdropSource: string): void {
    this.backdropSource = backdropSource
  }
  setVoteAvg(voteAvg: number): void {
    this.voteAvg = voteAvg
  }
  setVoteCount(voteCount: number): void {
    this.voteCount = voteCount
  }
  setGenres(genres: Genre[]): void {
    this.genres = Array.isArray(genres) ? genres : []
  }
  setCasts(casts: Cast[]): void {
    this.casts = Array.isArray(casts) ? casts : []
  }
}
