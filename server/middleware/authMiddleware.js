import jwt from "jsonwebtoken";
import User from "../models/User.js";

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user to request (excluding password)
    const user = await User.findByPk(decoded.id, {
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      // If user no longer exists, clear cookie
      res.clearCookie("token");
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();

  } catch (err) {
    console.error("AUTH ERROR:", err.message);

    // Clear invalid cookie
    res.clearCookie("token");

    return res.status(401).json({ message: "Not authorized" });
  }
};

export default auth;
