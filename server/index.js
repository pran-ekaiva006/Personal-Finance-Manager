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

  // Required on Render for cookies
  app.set("trust proxy", 1);

  const allowedOrigins = [
    "https://personal-finance-manager1.onrender.com",
    "http://localhost:5173",
  ];

  // ✅ CORS Middleware (Only this — no duplicates)
  app.use(
    cors({
      origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          console.log("❌ CORS BLOCKED:", origin);
          callback(new Error("Not allowed by CORS"));
        }
      },
      credentials: true,
      allowedHeaders: ["Content-Type", "Authorization"],
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    })
  );

  // ✅ Fix EXPRESS v5 wildcard issue
  app.options("*", (req, res) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
      res.header("Access-Control-Allow-Origin", origin);
    }
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    return res.sendStatus(204);
  });

  app.use(express.json());
  app.use(cookieParser());

  // Debug logs (remove if needed)
  app.use((req, res, next) => {
    console.log("[REQ]", req.method, req.originalUrl, "Origin:", req.headers.origin);
    console.log("[COOKIES]", req.cookies);
    next();
  });

  // API Routes
  app.use("/api/auth", authRoutes);
  app.use("/api/transactions", transactionRoutes);
  app.use("/api/budgets", budgetRoutes);

  app.get("/", (req, res) => res.send("Backend Live ✅"));

  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => console.log(`🚀 Backend running on ${PORT}`));
};

startServer();
