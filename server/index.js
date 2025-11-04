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
  await connectDB();

  try {
    await sequelize.sync();
    console.log("✅ DB Synced Successfully");
  } catch (err) {
    console.error("❌ Sequelize sync error:", err);
    process.exit(1);
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

  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => console.log(`🚀 Backend running on ${PORT}`));
};

startServer();
