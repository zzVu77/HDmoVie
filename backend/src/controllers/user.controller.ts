// import { Request, Response } from 'express';
// import { UserService } from '../services/UserService';

// export class UserController {
//   constructor(private userService: UserService) {}

//   async getAllUsers(req: Request, res: Response): Promise<void> {
//     try {
//       const users = await this.userService.getAllUsers();
//       res.json(users);
//     } catch (error) {
//       res.status(500).json({ message: 'Internal server error' });
//     }
//   }

//   async getUserById(req: Request, res: Response): Promise<void> {
//     try {
//       const id = parseInt(req.params.id);
//       const user = await this.userService.getUserById(id);
//       if (!user) {
//         res.status(404).json({ message: 'User not found' });
//         return;
//       }
//       res.json(user);
//     } catch (error) {
//       res.status(500).json({ message: 'Internal server error' });
//     }
//   }

//   async createUser(req: Request, res: Response): Promise<void> {
//     try {
//       const user = await this.userService.createUser(req.body);
//       res.status(201).json(user);
//     } catch (error) {
//       res.status(400).json({ message: (error as Error).message });
//     }
//   }

//   async updateUser(req: Request, res: Response): Promise<void> {
//     try {
//       const id = parseInt(req.params.id);
//       const user = await this.userService.updateUser(id, req.body);
//       if (!user) {
//         res.status(404).json({ message: 'User not found' });
//         return;
//       }
//       res.json(user);
//     } catch (error) {
//       res.status(500).json({ message: 'Internal server error' });
//     }
//   }

//   async deleteUser(req: Request, res: Response): Promise<void> {
//     try {
//       const id = parseInt(req.params.id);
//       await this.userService.deleteUser(id);
//       res.status(204).send();
//     } catch (error) {
//       res.status(500).json({ message: 'Internal server error' });
//     }
//   }
// }
