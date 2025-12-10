import dotenv from "dotenv";
dotenv.config();
console.log("JWT_SECRET:", process.env.JWT_SECRET ? "Loaded" : "Missing");

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB, { sequelize } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import budgetRoutes from "./routes/budgetRoutes.js";

const startServer = async () => {
  // ✅ Enhanced connection with better error handling
  const dbConnected = await connectDB({ retries: 10, delayMs: 5000 });

  if (!dbConnected) {
    console.error("❌ Failed to connect to database after multiple retries.");
    console.error("🔄 Server will keep trying to reconnect...");
    
    // Keep trying to reconnect every 30 seconds
    setInterval(async () => {
      console.log("🔄 Attempting to reconnect to database...");
      const reconnected = await connectDB({ retries: 1, delayMs: 1000 });
      if (reconnected) {
        console.log("✅ Database reconnected successfully!");
      }
    }, 30000);
  }

  try {
    await sequelize.sync();
    console.log("✅ DB Synced Successfully");
  } catch (err) {
    console.error("❌ Sequelize sync error:", err);
    // Don't exit, keep server running
  }

  const app = express();

  // Required for trusting proxy (Render HTTPS → Express HTTP)
  app.set("trust proxy", 1);

  const allowedOrigins = [
    "https://personal-finance-manager1.onrender.com",
    "http://localhost:5173",
  ];

  // ✅ Single CORS + Preflight middleware (no conflicting cors())
  app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
      res.header("Access-Control-Allow-Origin", origin);
    }

    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");

    if (req.method === "OPTIONS") {
      return res.sendStatus(204); // ✅ Fix CORS preflight
    }

    next();
  });

  app.use(express.json());
  app.use(cookieParser());

  // Debug
  app.use((req, res, next) => {
    console.log("[REQ]", req.method, req.originalUrl, "Origin:", req.headers.origin);
    console.log("[COOKIES]", req.cookies);
    next();
  });

  // ✅ API Routes
  app.use("/api/auth", authRoutes);
  app.use("/api/transactions", transactionRoutes);
  app.use("/api/budgets", budgetRoutes);

  app.get("/", (req, res) => res.send("Backend Live ✅"));

  // ✅ Health check endpoint
  app.get("/health", async (req, res) => {
    try {
      await sequelize.authenticate();
      res.json({ status: "ok", database: "connected" });
    } catch (err) {
      res.status(503).json({ status: "error", database: "disconnected", error: err.message });
    }
  });

  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => console.log(`🚀 Backend running on ${PORT}`));
};

startServer();
