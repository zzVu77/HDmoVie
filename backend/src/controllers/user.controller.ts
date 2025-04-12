// import { Request, Response } from 'express';
// import { AppDataSource } from '../data-source';
// import { RegisteredUser } from '../entities/RegisteredUser';
// import { Admin } from '../entities/Admin';

// export class AccountController {
//   // Tạo RegisteredUser
//   async createRegisteredUser(req: Request, res: Response) {
//     try {
//       const { name, email, password } = req.body;
//       const user = new RegisteredUser();
//       user.name = name;
//       user.email = email;
//       user.password = password; // Trong thực tế, cần hash password

//       const userRepository = AppDataSource.getRepository(RegisteredUser);
//       const savedUser = await userRepository.save(user);
//       res.status(201).json(savedUser);
//     } catch (error) {
//       res.status(500).json({ message: 'Error creating user', error });
//     }
//   }

//   // Tạo Admin
//   async createAdmin(req: Request, res: Response) {
//     try {
//       const { name, email, password } = req.body;
//       const admin = new Admin();
//       admin.name = name;
//       admin.email = email;
//       admin.password = password;

//       const adminRepository = AppDataSource.getRepository(Admin);
//       const savedAdmin = await adminRepository.save(admin);
//       res.status(201).json(savedAdmin);
//     } catch (error) {
//       res.status(500).json({ message: 'Error creating admin', error });
//     }
//   }

//   // Lấy tất cả tài khoản (RegisteredUser và Admin)
//   async getAllAccounts(req: Request, res: Response) {
//     try {
//       const userRepository = AppDataSource.getRepository(RegisteredUser);
//       const adminRepository = AppDataSource.getRepository(Admin);
//       const users = await userRepository.find();
//       const admins = await adminRepository.find();
//       res.json([...users, ...admins]);
//     } catch (error) {
//       res.status(500).json({ message: 'Error fetching accounts', error });
//     }
//   }

//   // Lấy tài khoản theo ID
//   async getAccountById(req: Request, res: Response) {
//     try {
//       const id = req.params.id;
//       const userRepository = AppDataSource.getRepository(RegisteredUser);
//       const adminRepository = AppDataSource.getRepository(Admin);

//       let account = await userRepository.findOneBy({ id });
//       if (!account) {
//         account = await adminRepository.findOneBy({ id });
//       }

//       if (!account) {
//         return res.status(404).json({ message: 'Account not found' });
//       }
//       res.json(account);
//     } catch (error) {
//       res.status(500).json({ message: 'Error fetching account', error });
//     }
//   }

//   // Cập nhật tài khoản
//   async updateAccount(req: Request, res: Response) {
//     try {
//       const id = req.params.id;
//       const { name, email } = req.body;
//       const userRepository = AppDataSource.getRepository(RegisteredUser);
//       const adminRepository = AppDataSource.getRepository(Admin);

//       let account = await userRepository.findOneBy({ id });
//       let repository = userRepository;
//       if (!account) {
//         account = await adminRepository.findOneBy({ id });
//         repository = adminRepository;
//       }

//       if (!account) {
//         return res.status(404).json({ message: 'Account not found' });
//       }

//       account.name = name || account.name;
//       account.email = email || account.email;
//       const updatedAccount = await repository.save(account);
//       res.json(updatedAccount);
//     } catch (error) {
//       res.status(500).json({ message: 'Error updating account', error });
//     }
//   }

//   // Xóa tài khoản
//   async deleteAccount(req: Request, res: Response) {
//     try {
//       const id = req.params.id;
//       const userRepository = AppDataSource.getRepository(RegisteredUser);
//       const adminRepository = AppDataSource.getRepository(Admin);

//       let account = await userRepository.findOneBy({ id });
//       let repository = userRepository;
//       if (!account) {
//         account = await adminRepository.findOneBy({ id });
//         repository = adminRepository;
//       }

//       if (!account) {
//         return res.status(404).json({ message: 'Account not found' });
//       }

//       await repository.remove(account);
//       res.json({ message: 'Account deleted' });
//     } catch (error) {
//       res.status(500).json({ message: 'Error deleting account', error });
//     }
//   }
// }
