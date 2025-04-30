import { DataSource, Repository, FindOptionsWhere } from 'typeorm'
import { RegisteredUser } from '~/models/registeredUser.model'

export class RegisteredUserRepository {
  private repository: Repository<RegisteredUser>

  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(RegisteredUser)
  }

  async findOneByEmail(email: string): Promise<RegisteredUser | null> {
    return this.repository.findOne({ where: { email } as FindOptionsWhere<RegisteredUser> })
  }

  async save(user: RegisteredUser): Promise<RegisteredUser> {
    return this.repository.save(user)
  }

  async findOne(id: string): Promise<RegisteredUser | null> {
    // Đảm bảo rằng TypeORM hiểu rằng bạn đang tìm kiếm trường 'id' cụ thể
    return this.repository.findOne({ where: { id } as FindOptionsWhere<RegisteredUser> })
  }
}
