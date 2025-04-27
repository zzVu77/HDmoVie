import { DataSource, FindOptionsWhere, Repository } from 'typeorm'
import { MovieComment } from '~/models/movieComment.model'
import { BlogComment } from '~/models/blogComment.model'

export class CommentRepository {
  private movieCommentRepo: Repository<MovieComment>
  private blogCommentRepo: Repository<BlogComment>

  constructor(dataSource: DataSource) {
    this.movieCommentRepo = dataSource.getRepository(MovieComment)
    this.blogCommentRepo = dataSource.getRepository(BlogComment)
  }

  async saveMovieComment(comment: MovieComment): Promise<MovieComment> {
    return this.movieCommentRepo.save(comment)
  }

  async saveBlogComment(comment: BlogComment): Promise<BlogComment> {
    return this.blogCommentRepo.save(comment)
  }

  // Cập nhật phương thức findOneBy để tìm comment theo id (chuỗi UUID)
  async findMovieCommentById(id: string): Promise<MovieComment | null> {
    return this.movieCommentRepo.findOne({ where: { id } as FindOptionsWhere<MovieComment> })
  }

  async findBlogCommentById(id: string): Promise<BlogComment | null> {
    return this.blogCommentRepo.findOne({ where: { id } as FindOptionsWhere<BlogComment> })
  }
}
