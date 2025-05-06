import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm'
import { RegisteredUser } from './registeredUser.model'
import { Movie } from './movie.model'
import { boolean, number } from 'joi'

@Entity('watchlists')
export class Watchlist {
  @PrimaryGeneratedColumn('uuid')
  private id!: string

  @Column({ type: 'varchar', length: 255 })
  private title!: string

  @Column({ type: 'text', nullable: true })
  private description!: string

  @Column({ type: 'boolean', default: false })
  private isPublic!: boolean

  @ManyToOne(() => RegisteredUser, { nullable: false, onDelete: 'CASCADE' })
  private owner!: RegisteredUser

  @ManyToMany(() => Movie, { cascade: true })
  @JoinTable({
    name: 'watchlists_movies',
    joinColumn: { name: 'watchlistId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'movieId', referencedColumnName: 'id' },
  })
  private movies!: Movie[]

  constructor(owner: RegisteredUser) {
    this.owner = owner
  }

  // ===== GETTER =====
  // ==================

  public getOwner(): RegisteredUser {
    return this.owner
  }

  public isPrivate(): boolean {
    return this.isPublic === false
  }

  // ===== SETTER =====
  // ==================

  public setTitle(title: string): this {
    this.title = title
    return this
  }

  public setDescription(description: string): this {
    this.description = description
    return this
  }

  public setIsPublic(isPublic: boolean): this {
    this.isPublic = isPublic
    return this
  }

  // ===== OTHERS =====
  // ==================

  public updateInformation(title: string, description: string, isPublic: boolean): void {
    this.title = title
    this.description = description
    this.isPublic = isPublic
  }

  // Return true if succesfully delete
  public removeMovie(movieId: string): boolean {
    const initialLength = this.movies.length

    this.movies = this.movies.filter((movie) => movie.getId() !== movieId)

    return this.movies.length < initialLength
  }

  // Return true if succesfully add
  public addMovie(newMovie: Movie): boolean {
    const isExist = this.movies.some((movie) => movie.getId() === newMovie.getId())

    if (isExist) {
      return false
    }

    this.movies.push(newMovie)
    return true
  }
}
