import dotenv from 'dotenv';
dotenv.config();
console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'Loaded' : 'Missing');

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

  // ✅ CORS (allow localhost and Render frontend)
  const whitelist = [
   'https://dashboard.render.com/static/srv-d3j9eevdiees73cc61u0', // Live frontend
    'http://localhost:5174',
    'http://127.0.0.1:5174',
  ];

  app.use(
    cors({
      origin: (origin, callback) => {
        // allow non-browser requests (curl, Postman, mobile apps)
        if (!origin) {
          console.log('CORS: no origin (allowing)');
          return callback(null, true);
        }

        // quick whitelist check
        if (whitelist.includes(origin)) {
          console.log('CORS: origin allowed (whitelist) ->', origin);
          return callback(null, true);
        }

        // allow any localhost/127.0.0.1 port for dev
        try {
          const u = new URL(origin);
          if (u.hostname === 'localhost' || u.hostname === '127.0.0.1') {
            console.log('CORS: origin allowed (localhost) ->', origin);
            return callback(null, true);
          }
        } catch (e) {
          // malformed origin
        }

        console.warn('CORS: origin rejected ->', origin);
        return callback(new Error('Not allowed by CORS'));
      },
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
      credentials: true,
    })
  );

  // ✅ Middleware
  app.use(express.json());
  app.use(cookieParser());

  // ✅ Request logger
  app.use((req, res, next) => {
    console.log('[REQ]', req.method, req.originalUrl, 'Origin:', req.headers.origin || '(no origin)');
    console.log('[COOKIES]', req.cookies);
    next();
  });

  // ✅ Routes
  app.use('/api/auth', authRoutes);
  app.use('/api/transactions', auth, transactionRoutes);
  app.use('/api/budgets', auth, budgetRoutes);
  // goalRoutes removed

  // ✅ Default route
  app.get('/', (req, res) => res.send('API is running'));

  // ✅ Error handling
  app.use((err, req, res, next) => {
    if (err && err.message === 'Not allowed by CORS') {
      console.error('CORS Error: Origin not allowed ->', req.headers.origin);
      return res.status(403).json({ message: 'CORS blocked: This origin is not allowed.' });
    }
    console.error('Express error handler:', err && err.stack ? err.stack : err);
    res.status(500).json({ message: 'Server error' });
  });

  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
};

// ✅ Start server
startServer();

// ✅ Process-level crash handlers
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err && err.stack ? err.stack : err);
  process.exit(1);
});
process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason && reason.stack ? reason.stack : reason);
  process.exit(1);
});
