import express from 'express';
import rateLimit from 'express-rate-limit';
import auth from '../middleware/authMiddleware.js'
import validate from '../middleware/validate.js';
import { registerSchema, loginSchema } from '../validators/authValidator.js';
import { register, login, getCurrentUser, logout } from '../controllers/authController.js';

// Rate limiter for auth endpoints: 10 requests per 15 minutes per IP
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many attempts. Please try again after 15 minutes.' },
});

const router = express.Router();
router.post('/register', authLimiter, validate(registerSchema), register);
router.post('/login', authLimiter, validate(loginSchema), login);
router.post('/logout', logout);
router.get('/me', auth, getCurrentUser);

export default router;