// import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

// // Class cha Account
// @Entity()
// export abstract class Account {
//   @PrimaryGeneratedColumn('uuid')
//   id: string;

//   @Column()
//   name: string;

//   @Column({ unique: true })
//   email: string;

//   @Column()
//   password: string; // Lưu ý: Trong thực tế, password nên được hash trước khi lưu

//   @CreateDateColumn()
//   createdAt: Date;

//   @UpdateDateColumn()
//   updatedAt: Date;
// }

// // Class con RegisteredUser
// @Entity({ name: 'accounts', discriminatorValue: 'registered_user' })
// export class RegisteredUser extends Account {
//   // Các phương thức của RegisteredUser có thể được định nghĩa ở đây
//   someRegisteredUserMethod(): string {
//     return `This is a method for RegisteredUser: ${this.email}`;
//   }
// }

// // Class con Admin
// @Entity({ name: 'accounts', discriminatorValue: 'admin' })
// export class Admin extends RegisteredUser {
//   // Các phương thức của Admin có thể được định nghĩa ở đây
//   someAdminMethod(): string {
//     return `This is a method for Admin: ${this.email}`;
//   }
// }
