import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import transactionRoutes from './routes/transactionRoutes.js';
import budgetRoutes from './routes/budgetRoutes.js';
import auth from './middleware/authMiddleware.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { sequelize } from './config/db.js';

// Connect and sync Sequelize models
const startServer = async () => {
  await connectDB();
  try {
    await sequelize.sync();
    console.log('All models were synchronized successfully.');
  } catch (err) {
    console.error('Sequelize sync error:', err);
    process.exit(1);
  }

  const app = express();
  app.use(cookieParser());

  app.use(cors({
    origin: [
      'http://localhost:5173',
      'https://personal-finance-manager-nine.vercel.app'
    ],
    credentials: true
  }));

  app.use(express.json());

  app.use('/api/auth', authRoutes);
  app.use('/api/transactions', auth, transactionRoutes);
  app.use('/api/budgets', auth, budgetRoutes);

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();

