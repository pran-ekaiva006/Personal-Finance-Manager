import dotenv from "dotenv";
dotenv.config();
console.log("JWT_SECRET:", process.env.JWT_SECRET ? "Loaded" : "Missing");

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB, { sequelize, keepAlive } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import budgetRoutes from "./routes/budgetRoutes.js";

const startServer = async () => {
  // ✅ Enhanced connection with longer timeout for sleeping database
  const dbConnected = await connectDB({ retries: 15, initialDelayMs: 2000 });

  if (!dbConnected) {
    console.error("❌ Failed to connect to database after multiple retries.");
    console.error("🔄 Server will start but database operations will fail until connection is restored.");
    
    // ✅ Keep trying to reconnect in background
    const reconnectInterval = setInterval(async () => {
      console.log("🔄 Background: Attempting to reconnect to database...");
      const reconnected = await connectDB({ retries: 2, initialDelayMs: 1000 });
      if (reconnected) {
        console.log("✅ Database reconnected successfully!");
        clearInterval(reconnectInterval);
        
        // ✅ Start keepalive pings
        keepAlive();
        
        // ✅ Sync models after reconnection
        try {
          await sequelize.sync();
          console.log("✅ DB Synced Successfully after reconnection");
        } catch (err) {
          console.error("❌ Sequelize sync error after reconnection:", err);
        }
      }
    }, 30000); // Try every 30 seconds
  } else {
    // ✅ Database connected on first try - start keepalive
    keepAlive();
  }

  // ✅ Sync models (only if connected)
  if (dbConnected) {
    try {
      await sequelize.sync();
      console.log("✅ DB Synced Successfully");
    } catch (err) {
      console.error("❌ Sequelize sync error:", err);
    }
  }

  const app = express();

  // Required for trusting proxy (Render HTTPS → Express HTTP)
  app.set("trust proxy", 1);

  const allowedOrigins = [
    "https://personal-finance-manager1.onrender.com",
    "http://localhost:5173",
    "http://localhost:5174", // Added for Vite
  ];

  // ✅ CORS + Preflight middleware
  app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
      res.header("Access-Control-Allow-Origin", origin);
    }

    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");

    if (req.method === "OPTIONS") {
      return res.sendStatus(204);
    }

    next();
  });

  app.use(express.json());
  app.use(cookieParser());

  // Debug (disable in production)
  if (process.env.NODE_ENV !== "production") {
    app.use((req, res, next) => {
      console.log("[REQ]", req.method, req.originalUrl, "Origin:", req.headers.origin);
      next();
    });
  }

  // ✅ API Routes
  app.use("/api/auth", authRoutes);
  app.use("/api/transactions", transactionRoutes);
  app.use("/api/budgets", budgetRoutes);

  app.get("/", (req, res) => res.send("Backend Live ✅"));

  // ✅ Health check endpoint with database status
  app.get("/health", async (req, res) => {
    try {
      await sequelize.authenticate();
      res.json({ 
        status: "ok", 
        database: "connected",
        timestamp: new Date().toISOString()
      });
    } catch (err) {
      res.status(503).json({ 
        status: "error", 
        database: "disconnected", 
        error: err.message,
        timestamp: new Date().toISOString()
      });
    }
  });

  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => console.log(`🚀 Backend running on ${PORT}`));
};

startServer();
