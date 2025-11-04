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

  // ✅ Required when deploying on Render to allow cookies
  app.set("trust proxy", 1);

  const whitelist = [
    "https://personal-finance-manager1.onrender.com",
    "http://localhost:5173",
  ];

  // ✅ Add required CORS headers before cors()
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
  });

  // ✅ CORS Config
  app.use(
    cors({
      origin: function (origin, callback) {
        if (!origin || whitelist.includes(origin)) {
          callback(null, true);
        } else {
          console.log("❌ CORS blocked:", origin);
          callback(new Error("Not allowed by CORS"));
        }
      },
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    })
  );

  // ✅ Express 5 Preflight handler (NO wildcard route!)
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

  // Debug logs (optional)
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
  app.get("/", (req, res) => res.send("API is running ✅"));

  // ✅ Global error handler
  app.use((err, req, res, next) => {
    if (err?.message === "Not allowed by CORS") {
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

// ✅ Crash safety handlers
process.on("uncaughtException", (err) => {
  console.error("❌ Uncaught Exception:", err.stack || err);
  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  console.error("❌ Unhandled Rejection:", reason.stack || reason);
  process.exit(1);
});
