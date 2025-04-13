// import { DataSource, Repository } from 'typeorm';
// import { User } from '../entities/User';

// export class UserRepository {
//   private repository: Repository<User>;

//   constructor(dataSource: DataSource) {
//     this.repository = dataSource.getRepository(User);
//   }

//   async findAll(): Promise<User[]> {
//     return this.repository.find();
//   }

//   async findById(id: number): Promise<User | null> {
//     return this.repository.findOneBy({ id });
//   }

//   async create(userData: Partial<User>): Promise<User> {
//     const user = this.repository.create(userData);
//     return this.repository.save(user);
//   }

//   async update(id: number, userData: Partial<User>): Promise<User | null> {
//     await this.repository.update(id, userData);
//     return this.findById(id);
//   }

//   async delete(id: number): Promise<void> {
//     await this.repository.delete(id);
//   }
// }
