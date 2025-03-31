// import express from 'express';
// import dotenv from 'dotenv';
// import userRoutes from './routes/user.routes';
// import sequelize from './config/database';

// dotenv.config();

// const app = express();
// app.use(express.json());
// app.use('/api', userRoutes);

// const PORT = process.env.PORT || 5000;

// sequelize
//   .sync()
//   .then(() => {
//     console.log('Database connected');
//     app.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//     });
//   })
//   .catch((err) => console.error('Unable to connect to database:', err));
