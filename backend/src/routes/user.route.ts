// import { Router } from 'express';
// import { UserController } from '../controllers/UserController';
// import { UserService } from '../services/UserService';
// import { UserRepository } from '../repositories/UserRepository';
// import { AppDataSource } from '../data-source';

// const router = Router();

// // Khởi tạo dependencies
// const userRepository = new UserRepository(AppDataSource);
// const userService = new UserService(userRepository);
// const userController = new UserController(userService);

// // Định nghĩa routes
// router.get('/', (req, res) => userController.getAllUsers(req, res));
// router.get('/:id', (req, res) => userController.getUserById(req, res));
// router.post('/', (req, res) => userController.createUser(req, res));
// router.put('/:id', (req, res) => userController.updateUser(req, res));
// router.delete('/:id', (req, res) => userController.deleteUser(req, res));

// export default router;
