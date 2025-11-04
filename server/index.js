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
    console.log("✅ All models were synchronized successfully.");
  } catch (err) {
    console.error("❌ Sequelize sync error:", err);
    process.exit(1);
  }

  const app = express();

  // Required For Cookies on Render
  app.set("trust proxy", 1);

  const allowedOrigins = [
    "https://personal-finance-manager1.onrender.com",
    "http://localhost:5173",
  ];

  // ✅ Universal CORS header for ALL requests
  app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
      res.header("Access-Control-Allow-Origin", origin);
    }

    res.header("Access-Control-Allow-Credentials", "true");
    res.header(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, X-Requested-With"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");

    if (req.method === "OPTIONS") {
      return res.sendStatus(204); // STOP HERE — do NOT continue to routes
    }

    next();
  });

  // ✅ cors() (must come AFTER manual headers)
  app.use(
    cors({
      origin: allowedOrigins,
      credentials: true,
    })
  );

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

  app.get("/", (req, res) => res.send("API is running ✅"));

  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () =>
    console.log(`🚀 Backend running on port ${PORT}`)
  );
};

startServer();
