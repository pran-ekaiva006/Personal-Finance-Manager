import express from 'express';
import auth from '../middleware/authMiddleware.js';
import validate from '../middleware/validate.js';
import { budgetSchema } from '../validators/budgetValidator.js';
import {
  addBudget,
  getBudgets,
  updateBudget,
  deleteBudget,
  getBudgetUsageThisMonth
} from '../controllers/budgetController.js';

const router = express.Router();

router.post('/', auth, validate(budgetSchema), addBudget);
router.get('/', auth, getBudgets);
router.put('/:id', auth, validate(budgetSchema), updateBudget);
router.delete('/:id', auth, deleteBudget);
router.get('/status', auth, getBudgetUsageThisMonth);

export default router;
