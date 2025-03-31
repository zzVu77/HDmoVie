// import { Request, Response } from 'express';
// import { getAllUsers, getUserById, createUser } from '../services/user.service';

// export const getUsers = async (req: Request, res: Response) => {
//   const users = await getAllUsers();
//   res.json(users);
// };

// export const getUser = async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const user = await getUserById(Number(id));
//   if (!user) return res.status(404).json({ message: 'User not found' });
//   res.json(user);
// };

// export const addUser = async (req: Request, res: Response) => {
//   const newUser = await createUser(req.body);
//   res.status(201).json(newUser);
// };
