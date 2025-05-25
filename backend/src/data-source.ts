import { DataSource } from 'typeorm'
import path from 'path'

class Database {
  private static instance: DataSource

  private constructor() {}

  public static getInstance(): DataSource {
    if (!Database.instance) {
      Database.instance = new DataSource({
        type: 'mysql',
        host: 'localhost', // hoặc 'mysql' nếu dùng Docker
        port: 33061,
        username: 'root',
        password: '123456',
        database: 'HDmoVie',
        synchronize: false,
        logging: true,
        entities: [path.join(__dirname, 'models/**/*.{js,ts}')],
        migrations: [path.join(__dirname, 'migrations/**/*.{js,ts}')],
        migrationsTableName: 'migrations',
        subscribers: [path.join(__dirname, 'subscribers/**/*.{js,ts}')],
      })
    }
    return Database.instance
  }
}

export default Database
export const AppDataSource = Database.getInstance()
