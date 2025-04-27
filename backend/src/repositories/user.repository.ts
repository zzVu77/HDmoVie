import { DataSource, Repository } from 'typeorm'
import { RegisteredUser } from '~/models/registeredUser.model'
import { FindOneOptions, FindOptionsWhere } from 'typeorm' // Import thêm các kiểu cần thiết

export class UserRepository {
  private repository: Repository<RegisteredUser>

  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(RegisteredUser)
  }

  // async findAll(): Promise<RegisteredUser[]> {
  //   return this.repository.find();
  // }

  // Thêm phương thức findOne để tìm người dùng theo ID
  async findOne(id: string): Promise<RegisteredUser | null> {
    // Đảm bảo rằng TypeORM hiểu rằng bạn đang tìm kiếm trường 'id' cụ thể
    return this.repository.findOne({ where: { id } as FindOptionsWhere<RegisteredUser> })
  }
}
