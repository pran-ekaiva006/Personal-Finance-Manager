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

  // Required for cookies to work on Render
  app.set("trust proxy", 1);

  // ✅ Allowed frontend URLs
  const whitelist = [
    "https://personal-finance-manager1.onrender.com",
    "http://localhost:5173",
  ];

  const corsOptions = {
    origin: (origin, callback) => {
      if (!origin || whitelist.includes(origin)) {
        callback(null, true);
      } else {
        console.error("❌ CORS Blocked Origin:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  };

  // ✅ CORS must be BEFORE JSON and routes
  app.use(cors(corsOptions));

  /**
   * ✅ EXPRESS 5 FIX (NO wildcard allowed)
   * Handle all OPTIONS requests manually to avoid crashing path-to-regexp.
   */
  app.use((req, res, next) => {
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Origin", req.headers.origin);
      res.header("Access-Control-Allow-Credentials", "true");
      res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
      res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
      return res.sendStatus(204);
    }
    next();
  });

  // ✅ Middleware
  app.use(express.json());
  app.use(cookieParser());

  // Debug logs
  app.use((req, res, next) => {
    console.log("[REQ]", req.method, req.originalUrl, "Origin:", req.headers.origin);
    console.log("[COOKIES]", req.cookies);
    next();
  });

  // ✅ Routes
  app.use("/api/auth", authRoutes);
  app.use("/api/transactions", transactionRoutes);
  app.use("/api/budgets", budgetRoutes);

  // ✅ Default route
  app.get("/", (req, res) => res.send("API is running"));

  // ✅ Error handling
  app.use((err, req, res, next) => {
    if (err && err.message === "Not allowed by CORS") {
      return res.status(403).json({ message: "CORS blocked: Origin not allowed" });
    }
    console.error("Express Error:", err.stack || err);
    res.status(500).json({ message: "Server error" });
  });

  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
};

// ✅ Start server
startServer();

// ✅ Process crash safety
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err.stack || err);
  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Rejection:", reason.stack || reason);
  process.exit(1);
});
