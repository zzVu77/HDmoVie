import { DataSource } from 'typeorm'
import path from 'path'
import dotenv from 'dotenv'
dotenv.config()
export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.MYSQLHOST || 'localhost',
  port: Number(process.env.MYSQLPORT) || 33061,
  username: process.env.MYSQLUSER || 'root',
  password: process.env.MYSQLPASSWORD || '123456',
  database: process.env.MYSQLDATABASE || 'HDmoVie',
  synchronize: false,
  logging: true,
  entities: [path.join(__dirname, 'models/**/*.{js,ts}')],
  migrations: [path.join(__dirname, 'migrations/**/*.{js,ts}')],
  migrationsTableName: 'migrations',
  subscribers: [path.join(__dirname, 'subscribers/**/*.{js,ts}')],
})
