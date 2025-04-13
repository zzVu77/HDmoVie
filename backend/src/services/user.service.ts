// import { User } from '../entities/User';
// import { UserRepository } from '../repositories/UserRepository';

// export class UserService {
//   constructor(private userRepository: UserRepository) {}

//   async getAllUsers(): Promise<User[]> {
//     return this.userRepository.findAll();
//   }

//   async getUserById(id: number): Promise<User | null> {
//     return this.userRepository.findById(id);
//   }

//   async createUser(userData: Partial<User>): Promise<User> {
//     // Thêm logic validate hoặc xử lý business logic nếu cần
//     if (!userData.email || !userData.name || !userData.password) {
//       throw new Error('Missing required fields');
//     }
//     return this.userRepository.create(userData);
//   }

//   async updateUser(id: number, userData: Partial<User>): Promise<User | null> {
//     return this.userRepository.update(id, userData);
//   }

//   async deleteUser(id: number): Promise<void> {
//     return this.userRepository.delete(id);
//   }
// }
