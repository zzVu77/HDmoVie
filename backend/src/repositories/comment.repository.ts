import { DataSource, FindOptionsWhere, Repository } from 'typeorm'
import { MovieComment } from '~/models/movieComment.model'
import { BlogComment } from '~/models/blogComment.model'
import { Comment } from '~/models/comment.model'

export class CommentRepository {
  private commentRepo: Repository<Comment>
  private movieCommentRepo: Repository<MovieComment>
  private blogCommentRepo: Repository<BlogComment>

  constructor(dataSource: DataSource) {
    this.commentRepo = dataSource.getRepository(Comment)
    this.movieCommentRepo = dataSource.getRepository(MovieComment)
    this.blogCommentRepo = dataSource.getRepository(BlogComment)
  }

  async saveMovieComment(comment: MovieComment): Promise<MovieComment> {
    return this.movieCommentRepo.save(comment)
  }

  async saveBlogComment(comment: BlogComment): Promise<BlogComment> {
    return this.blogCommentRepo.save(comment)
  }

  // Find any comment (movie or blog) by id
  async findCommentById(id: string): Promise<Comment | null> {
    return this.commentRepo.findOne({
      where: { id } as FindOptionsWhere<Comment>,
      relations: ['user'],
    })
  }

  // Find specifically a movie comment by id
  async findMovieCommentById(id: string): Promise<MovieComment | null> {
    return this.movieCommentRepo.findOne({
      where: { id } as FindOptionsWhere<MovieComment>,
      relations: ['user', 'movie', 'parentComment'],
    })
  }

  // Find specifically a blog comment by id
  async findBlogCommentById(id: string): Promise<BlogComment | null> {
    return this.blogCommentRepo.findOne({
      where: { id } as FindOptionsWhere<BlogComment>,
      relations: ['user', 'blog', 'parentComment'],
    })
  }

  // Get comments for a specific blog
  async findCommentsByBlogId(blogId: string): Promise<BlogComment[]> {
    return this.blogCommentRepo.find({
      where: { blog: { id: blogId } },
      relations: ['user', 'parentComment', 'blog'],
    })
  }
  //Load Movie Comments by Movie ID
  async findCommentsByMovieId(movieId: string): Promise<MovieComment[]> {
    return this.movieCommentRepo.find({
      select: {
        id: true,
        content: true,
        date: true,
        parentComment: true,
        user: { id: true, fullName: true, role: false },
        movie: { id: true, title: true },
      } as FindOptionsWhere<Comment>,
      where: { movie: { id: movieId } as FindOptionsWhere<MovieComment> },
      relations: ['user', 'parentComment', 'movie'],
    })
  }
}
