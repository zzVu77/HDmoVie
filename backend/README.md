# 🚀 Backend Project

![Node.js](https://img.shields.io/badge/Node.js-20.x-green?style=flat&logo=node.js) ![Express](https://img.shields.io/badge/Express-4.21.2-black?style=flat&logo=express) ![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-blue?style=flat&logo=typescript) ![TypeORM](https://img.shields.io/badge/TypeORM-0.3.22-blue?style=flat&logo=typeorm)

A modern backend project built with Node.js, Express, TypeScript, and TypeORM. 🛠️

## 📂 Project Structure

```
backend/
├── src/              # Source code
├── dist/             # Compiled JavaScript files
├── node_modules/     # Dependencies
├── package.json      # Project metadata and dependencies
├── tsconfig.json     # TypeScript configuration
├── .eslintrc.js      # ESLint configuration
├── .prettierrc       # Prettier configuration
└── .env              # Environment variables
```

## ⚡ Getting Started

### 🔧 Install Dependencies

```sh
npm install
```

### 🚀 Start MySQL Container

To start the MySQL database using Docker, run:

```sh
 npm run mysql:up
```

This will start the MySQL container and set up the HDmoVie database.

### 📦 Run Migrations

To apply the migrations to the database, run:

```sh
 npm run migration:run
```

This will execute all pending migrations and update the database schema.

### 🌱 Seeding the Database

Use this command to insert sample data into your MySQL database:

```sh
 npm run db:seed
```

This will execute all pending migrations and update the database schema.

### 🧰 Generate a New Migration

To generate a new migration file after changing your entities, run:

```sh
 npm run migration:generate src/migrations/<YourMigrationName>
```

This will create a new migration file for the changes in your entities.

### 🏃 Run Development Server

```sh
npm run dev
```

### 🔨 Build Project

```sh
npm run build
```

### 🚀 Start Production Server

```sh
npm start
```

### 🧹 Lint & Format Code

```sh
npm run check:all
```

### 🧹 Run Redis

```sh
docker run --name redis -p 6379:6379 -d redis
```

## 📦 Dependencies

### 🔹 Main Dependencies

- **Express** `^4.21.2`
- **TypeORM** `^0.3.22`
- **CORS** `^2.8.5`
- **Reflect Metadata** `^0.2.2`
- **MySQL2** `^3.14.0`

### 🔹 Development Dependencies

- **TypeScript** `^5.8.3`
- **Nodemon** `^3.1.9`
- **ESLint & Prettier** for code linting and formatting
- **ts-node**, **tsc-alias**, **dotenv**, etc.

---

Made with ❤️ using Node.js, Express, TypeScript, and TypeORM! 🚀
