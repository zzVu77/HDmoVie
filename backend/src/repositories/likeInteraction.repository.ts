import { DataSource, FindOptionsWhere, Repository } from 'typeorm'
import { LikeInteraction } from '~/models/likeInteraction.model'

export class LikeInteractionRepository {
  private likeInteractionRepo: Repository<LikeInteraction>

  constructor(dataSource: DataSource) {
    this.likeInteractionRepo = dataSource.getRepository(LikeInteraction)
  }

  // Lưu một tương tác like
  async save(likeInteraction: LikeInteraction): Promise<LikeInteraction> {
    return this.likeInteractionRepo.save(likeInteraction)
  }

  async findLikeInteractionByTarget(blogId: string): Promise<LikeInteraction | null> {
    return this.likeInteractionRepo.findOne({
      where: {
        blog: {
          id: blogId,
        },
      } as FindOptionsWhere<LikeInteraction>, // ép kiểu, nhưng không bắt buộc
      relations: ['likers'],
    })
  }

  // Tìm tất cả các tương tác like theo targetId
  //   async findLikesForTarget(targetId: string): Promise<LikeInteraction[]> {
  //     return this.likeInteractionRepo.find({
  //       where: { targetId }
  //     })
  //   }

  // Xóa một tương tác like
  async removeLikeInteraction(likeInteraction: LikeInteraction): Promise<void> {
    await this.likeInteractionRepo.remove(likeInteraction)
  }
}
