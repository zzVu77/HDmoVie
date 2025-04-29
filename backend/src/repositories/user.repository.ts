import { DataSource, Repository } from 'typeorm'
import { RegisteredUser } from '~/models/registeredUser.model'
import { FindOneOptions, FindOptionsWhere } from 'typeorm' // Import thêm các kiểu cần thiết

export class UserRepository {
  private repository: Repository<RegisteredUser>

  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(RegisteredUser)
  }


  // method findOne to find user by ID
  async findOne(id: string): Promise<RegisteredUser | null> {
    return this.repository.findOne({ where: { id } as FindOptionsWhere<RegisteredUser> })
  }
}
