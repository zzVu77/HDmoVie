import { DataSource, FindOptionsWhere, FindOptionsSelect, Repository } from 'typeorm'
import { RegisteredUser } from '../models/registeredUser.model'

export class RegisteredUserRepository {
  private repository: Repository<RegisteredUser>

  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(RegisteredUser)
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

  async create(userData: Partial<RegisteredUser>): Promise<RegisteredUser> {
    const user = this.repository.create(userData)
    return this.repository.save(user)
  }

  async update(user: RegisteredUser): Promise<RegisteredUser> {
    try {
      return await this.repository.save(user)
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id)
  }
}
