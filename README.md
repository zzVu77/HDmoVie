# 🎬 HDmoVie Monorepo

![Node.js](https://img.shields.io/badge/Node.js-20.x-green?style=flat&logo=node.js) ![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-blue?style=flat&logo=typescript) ![Express](https://img.shields.io/badge/Express-4.21.2-black?style=flat&logo=express) ![React](https://img.shields.io/badge/React-19.x-blue?style=flat&logo=react)

HDMovie is a full-stack monorepo project built with Node.js, Express, React, and TypeScript. It follows a structured monorepo approach for managing both frontend and backend efficiently. 🚀

## 📂 Project Structure

```
hdmovie/
├── backend/         # Backend service (Node.js + Express + TypeORM)
├── frontend/        # Frontend service (React + Vite + Tailwind CSS)
├── node_modules/    # Dependencies
├── package.json     # Monorepo management
├── .husky/          # Git hooks
└── .gitignore       # Ignored files
```

## 🚀 Getting Started

### 🔧 Install Dependencies

```sh
npm install
```

This will install dependencies for both `backend/` and `frontend/` using `concurrently`.

### 🏃 Run Development Mode

```sh
npm start
```

Runs both backend and frontend in parallel.

### 🔨 Build Project

```sh
npm run build
```

Builds both backend and frontend.

### 🧹 Run Code Checks

```sh
npm run check:all
```

Runs linting, type checking, and formatting checks for both frontend and backend.

## 📦 Dependencies

### 🔹 Main Dependencies

- **Backend**: Express, TypeORM
- **Frontend**: React, Tailwind CSS

### 🔹 Dev Dependencies

- **Monorepo Management**: `concurrently`
- **Git Hooks**: `husky`

---

Built with ❤️ using a monorepo structure for scalability! 🚀
