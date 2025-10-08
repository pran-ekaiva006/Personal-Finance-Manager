import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import connectDB, { sequelize } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import transactionRoutes from './routes/transactionRoutes.js';
import budgetRoutes from './routes/budgetRoutes.js';
import auth from './middleware/authMiddleware.js';

const startServer = async () => {
  await connectDB();
  try {
    await sequelize.sync();
    console.log('✅ All models were synchronized successfully.');
  } catch (err) {
    console.error('❌ Sequelize sync error:', err);
    process.exit(1);
  }

  const app = express();

  // simple request logger to help debug incoming requests
  app.use((req, res, next) => {
    console.log('[REQ]', req.method, req.originalUrl, 'Origin:', req.headers.origin || '(no origin)');
    next();
  });

  // parse JSON bodies before anything else
  app.use(express.json());

  // parse cookies for auth middleware
  app.use(cookieParser());

  // Replace your current app.use(cors(...)) with this:
  const whitelist = [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'https://personal-finance-manager-nine.vercel.app'
  ];

  // safer dev CORS: return boolean true/false (cors will echo origin when credentials: true)
  app.use(
    cors({
      origin: (origin, callback) => {
        // allow non-browser requests (no origin)
        if (!origin) return callback(null, true);
        if (whitelist.includes(origin)) return callback(null, true);
        return callback(null, false);
      },
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
      credentials: true,
    })
  );

  // Do NOT add app.options('/*', ...) or app.options('*', ...) — that triggers path-to-regexp in this environment.

  // small error middleware to convert CORS "not allowed" into 403 rather than crashing
  app.use((err, req, res, next) => {
    if (err && /cors/i.test(err.message)) {
      return res.status(403).json({ message: 'CORS blocked: origin not allowed' });
    }
    next(err);
  });

  // catch-all express error handler (ensure it's after routes if you want to see route errors)
  app.use((err, req, res, next) => {
    console.error('Express error handler:', err && err.stack ? err.stack : err);
    res.status(500).json({ message: 'Server error' });
  });

  // ✅ Routes
  app.use('/api/auth', authRoutes);
  app.use('/api/transactions', auth, transactionRoutes);
  app.use('/api/budgets', auth, budgetRoutes);

  // ✅ Default route (optional)
  app.get('/', (req, res) => res.send('API is running'));

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
};

startServer();

// process-level handlers to log unexpected crashes
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err && err.stack ? err.stack : err);
  process.exit(1);
});
process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason && reason.stack ? reason.stack : reason);
  process.exit(1);
});
