import { DataSource, FindOptionsWhere, Repository } from 'typeorm'
import { RegisteredUser } from '~/models/registeredUser.model'
export class RegisteredUserRepository {
  private repository: Repository<RegisteredUser>

  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(RegisteredUser)
  }

  async findByEmail(email: string): Promise<RegisteredUser | null> {
    return this.repository.findOne({ where: { email } as FindOptionsWhere<RegisteredUser> })
  }

  async create(userData: RegisteredUser): Promise<RegisteredUser> {
    const user = this.repository.create(userData)
    return this.repository.save(user)
  }
}
