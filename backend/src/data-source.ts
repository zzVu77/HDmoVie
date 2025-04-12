// import { DataSource } from 'typeorm'

// export const AppDataSource = new DataSource({
//   type: 'postgres', // Thay bằng database bạn dùng (mysql, sqlite, v.v.)
//   host: 'localhost',
//   port: 5432,
//   username: 'your_username',
//   password: 'your_password',
//   database: 'your_database',
//   synchronize: true, // Tự động tạo bảng dựa trên entity (chỉ dùng trong development)
//   logging: true, // Log các truy vấn SQL
//   entities: ['src/models/**/*.ts'], // Đường dẫn đến các entity
//   migrations: ['src/migrations/**/*.ts'], // Đường dẫn đến các migration
//   subscribers: ['src/subscribers/**/*.ts'], // Đường dẫn đến các subscriber
// })
