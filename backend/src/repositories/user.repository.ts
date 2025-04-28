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
    return this.repository.findOne({
      where: { id: id } as FindOptionsWhere<RegisteredUser>,
      select: ['id', 'email', 'fullName', 'dateOfBirth', 'role'] as FindOptionsSelect<RegisteredUser>,
    })
  }

  async create(userData: Partial<RegisteredUser>): Promise<RegisteredUser> {
    const user = this.repository.create(userData)
    return this.repository.save(user)
  }

  async update(id: string, userData: Partial<RegisteredUser>): Promise<RegisteredUser | null> {
    await this.repository.update(id, userData)
    return this.findById(id)
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id)
  }
}
