import express from 'express';
import auth from '../middleware/authMiddleware.js';
import validate from '../middleware/validate.js';
import { addTransactionSchema } from '../validators/transactionValidator.js';
import {
    addTransaction,
    getTransactions,
    getMonthlySummary,
    getMonthlyIncomeExpenseSummary
} from '../controllers/transactionController.js';

const router = express.Router();
router.route('/').post(auth, validate(addTransactionSchema), addTransaction);
router.route('/').get(auth, getTransactions);
router.route('/summary/:year/:month').get(auth, getMonthlySummary);
router.get('/monthly-summary', auth, getMonthlyIncomeExpenseSummary);
export default router;