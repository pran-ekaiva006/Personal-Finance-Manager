import jwt from "jsonwebtoken";
import User from "../models/User.js";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const getCookieOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",   // HTTPS only on Render
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  path: "/",                                       // Required for Chrome
  maxAge: 30 * 24 * 60 * 60 * 1000,                // 30 days
});


// ✅ REGISTER
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ where: { email } });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ name, email, password });

    res.cookie("token", generateToken(user.id), getCookieOptions());

    res.status(201).json({ id: user.id, name: user.name, email: user.email });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};


// ✅ LOGIN
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (user && (await user.matchPassword(password))) {
      res.cookie("token", generateToken(user.id), getCookieOptions());

      return res.json({ id: user.id, name: user.name, email: user.email });
    }

    res.status(401).json({ message: "Invalid credentials" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};


// ✅ LOGOUT
export const logout = async (req, res) => {
  try {
    res.clearCookie("token", getCookieOptions());
    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};


// ✅ CURRENT USER
export const getCurrentUser = async (req, res) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ message: "Not authenticated" });

    res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
