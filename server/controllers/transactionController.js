import Transaction from '../models/Transaction.js';
import { Op } from 'sequelize';


export const addTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.create({ ...req.body, UserId: req.user.id });
    res.status(201).json(transaction);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};


export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.findAll({ where: { UserId: req.user.id } });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};



export const calculateMonthlySummary = (transactions) => {
  let income = 0;
  let expense = 0;
  const categorySummary = {};

  for (const t of transactions) {
    const amount = parseFloat(t.amount || 0);
    if (t.type === 'Income') {
      income += amount;
    } else if (t.type === 'Expense') {
      expense += amount;
      categorySummary[t.category] = (categorySummary[t.category] || 0) + amount;
    }
  }

  const balance = income - expense;
  const savingRate = income > 0 ? ((balance / income) * 100).toFixed(2) : '0.00';

  const categoryBreakdown = Object.entries(categorySummary).map(([category, amount]) => ({
    name: category,
    value: expense > 0 ? ((amount / expense) * 100) : 0.0
  }));

  return { income, expense, balance, savingRate, categoryBreakdown };
};

export const getMonthlySummary = async (req, res) => {
  try {
    const { year, month } = req.params;
    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 0, 23, 59, 59, 999);

    const transactions = await Transaction.findAll({
      where: {
        UserId: req.user.id,
        date: { [Op.gte]: start, [Op.lte]: end }
      }
    });

    const summary = calculateMonthlySummary(transactions);
    res.json(summary);
  } catch (error) {
    console.error('Monthly summary error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};





export const getMonthlyIncomeExpenseSummary = async (req, res) => {
  try {
    const userId = req.user.id;
    const yearsBack = parseInt(req.query.yearsBack || 1);
    const monthsToRoll = 12 * yearsBack;

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth(); // 0-based index

    // Start of rolling period: (monthsToRoll - 1) months ago, day 1
    const startOfPeriod = new Date(currentYear, currentMonth - (monthsToRoll - 1), 1, 0, 0, 0, 0);
    // End of rolling period: end of current month
    const endOfPeriod = new Date(currentYear, currentMonth + 1, 0, 23, 59, 59, 999);

    // Fetch all transactions in the rolling range
    const transactions = await Transaction.findAll({
      where: {
        UserId: userId,
        date: {
          [Op.gte]: startOfPeriod,
          [Op.lte]: endOfPeriod,
        }
      }
    });

    const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthlyData = [];

    // Pre-populate the rolling month objects in chronological order
    for (let i = monthsToRoll - 1; i >= 0; i--) {
      const d = new Date(currentYear, currentMonth - i, 1);
      const mIdx = d.getMonth();
      const y = d.getFullYear();
      monthlyData.push({
        month: `${monthLabels[mIdx]} '${y.toString().slice(-2)}`,
        monthIndex: mIdx,
        year: y,
        income: 0,
        expense: 0
      });
    }

    transactions.forEach(entry => {
      const dateObj = new Date(entry.date);
      const m = dateObj.getMonth();
      const y = dateObj.getFullYear();
      
      const target = monthlyData.find(d => d.monthIndex === m && d.year === y);
      if (target) {
        if (entry.type === 'Income') {
          target.income += entry.amount;
        } else if (entry.type === 'Expense') {
          target.expense += entry.amount;
        }
      }
    });

    // Remove temporary index properties before sending
    const cleanedData = monthlyData.map(({ month, income, expense }) => ({
      month,
      income,
      expense
    }));

    res.status(200).json(cleanedData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};