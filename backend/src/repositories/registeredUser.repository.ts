import { DataSource, Repository, FindOptionsSelect, FindOptionsWhere } from 'typeorm'
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
    return this.repository.findOne({ where: { id } as FindOptionsWhere<RegisteredUser> })
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
  async findAll(): Promise<RegisteredUser[]> {
    return this.repository.find()
  }

  async findById(id: string): Promise<RegisteredUser | null> {
    return await this.repository.findOne({
      where: { id: id } as FindOptionsWhere<RegisteredUser>,
      select: {
        id: true,
        email: true,
        fullName: true,
        dateOfBirth: true,
        role: false,
      } as FindOptionsSelect<RegisteredUser>,
    })
  }

  async findByIdWithPassword(id: string): Promise<RegisteredUser | null> {
    return await this.repository.findOne({
      where: { id: id } as FindOptionsWhere<RegisteredUser>,
      select: ['id', 'email', 'password', 'fullName', 'dateOfBirth'] as FindOptionsSelect<RegisteredUser>,
    })
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id)
  }
}
