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

  async findByToken(refreshToken: string): Promise<RegisteredUser | null> {
    return this.repository.findOne({ where: { refreshToken } as FindOptionsWhere<RegisteredUser> })
  }

  async create(userData: Partial<RegisteredUser>): Promise<RegisteredUser> {
    const user = this.repository.create(userData)
    const savedUser = await this.repository.save(user)

    const result = await this.repository.findOne({
      select: {
        id: true,
        email: true,
        fullName: true,
        password: false,
        dateOfBirth: true,
      } as FindOptionsWhere<RegisteredUser>,
      where: { id: savedUser.getId() } as FindOptionsWhere<RegisteredUser>,
    })

    if (!result) {
      throw new Error('Failed to retrieve user')
    }

    return result
  }
  async update(user: RegisteredUser): Promise<RegisteredUser> {
    try {
      return await this.repository.save(user)
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }
}
