import { describe, it, expect } from 'vitest';
import { calculateBudgetUsage } from '../controllers/budgetController.js';
import { calculateMonthlySummary } from '../controllers/transactionController.js';

describe('calculateBudgetUsage', () => {
  it('should calculate budget usage correctly in normal cases (within budget limits)', () => {
    const budgets = [
      { category: 'Food', amount: 500 },
      { category: 'Utilities', amount: 200 },
    ];
    const expenses = [
      { category: 'Food', totalSpent: 200 },
      { category: 'Utilities', totalSpent: 50 },
    ];

    const result = calculateBudgetUsage(budgets, expenses);

    expect(result.report).toHaveLength(2);
    expect(result.report[0]).toEqual({
      category: 'Food',
      allocated: 500,
      spent: 200,
      remaining: 300,
      percentLeft: 60.00,
    });
    expect(result.report[1]).toEqual({
      category: 'Utilities',
      allocated: 200,
      spent: 50,
      remaining: 150,
      percentLeft: 75.00,
    });

    expect(result.total).toEqual({
      totalBudget: 700,
      totalSpent: 250,
      remaining: 450,
      percentUsed: 35.71, // (250 / 700) * 100 = 35.714...
    });
  });

  it('should handle zero-budget edge cases without throwing or dividing by zero', () => {
    const budgets = [
      { category: 'Food', amount: 0 },
      { category: 'Utilities', amount: 0 },
    ];
    const expenses = [
      { category: 'Food', totalSpent: 50 },
    ];

    const result = calculateBudgetUsage(budgets, expenses);

    expect(result.report[0].percentLeft).toBe(0);
    expect(result.report[1].percentLeft).toBe(0);
    expect(result.total.percentUsed).toBe(0);
    expect(result.total.totalBudget).toBe(0);
    expect(result.total.totalSpent).toBe(50);
    expect(result.total.remaining).toBe(-50);
  });

  it('should handle over-budget cases correctly', () => {
    const budgets = [
      { category: 'Food', amount: 100 },
    ];
    const expenses = [
      { category: 'Food', totalSpent: 150 },
    ];

    const result = calculateBudgetUsage(budgets, expenses);

    expect(result.report[0]).toEqual({
      category: 'Food',
      allocated: 100,
      spent: 150,
      remaining: -50,
      percentLeft: -50.00,
    });
    expect(result.total).toEqual({
      totalBudget: 100,
      totalSpent: 150,
      remaining: -50,
      percentUsed: 150.00,
    });
  });

  it('should handle budgets with no corresponding expenses', () => {
    const budgets = [
      { category: 'Food', amount: 200 },
    ];
    const expenses = [];

    const result = calculateBudgetUsage(budgets, expenses);

    expect(result.report[0]).toEqual({
      category: 'Food',
      allocated: 200,
      spent: 0,
      remaining: 200,
      percentLeft: 100.00,
    });
    expect(result.total).toEqual({
      totalBudget: 200,
      totalSpent: 0,
      remaining: 200,
      percentUsed: 0.00,
    });
  });

  it('should support custom mock format with spent instead of totalSpent', () => {
    const budgets = [
      { category: 'Entertainment', amount: 300 },
    ];
    const expenses = [
      { category: 'Entertainment', spent: 100 },
    ];

    const result = calculateBudgetUsage(budgets, expenses);

    expect(result.report[0].spent).toBe(100);
    expect(result.report[0].remaining).toBe(200);
    expect(result.report[0].percentLeft).toBe(66.67);
  });
});

describe('calculateMonthlySummary', () => {
  it('should calculate summary correctly in normal cases with positive income and expense', () => {
    const transactions = [
      { type: 'Income', amount: 5000, category: 'Salary' },
      { type: 'Expense', amount: 1000, category: 'Food' },
      { type: 'Expense', amount: 500, category: 'Utilities' },
      { type: 'Expense', amount: 500, category: 'Food' },
    ];

    const result = calculateMonthlySummary(transactions);

    expect(result.income).toBe(5000);
    expect(result.expense).toBe(2000);
    expect(result.balance).toBe(3000);
    expect(result.savingRate).toBe('60.00'); // (3000 / 5000) * 100
    
    expect(result.categoryBreakdown).toHaveLength(2);
    const foodBreakdown = result.categoryBreakdown.find(c => c.name === 'Food');
    const utilitiesBreakdown = result.categoryBreakdown.find(c => c.name === 'Utilities');

    expect(foodBreakdown.value).toBe(75.00); // 1500 / 2000 * 100
    expect(utilitiesBreakdown.value).toBe(25.00); // 500 / 2000 * 100
  });

  it('should handle zero-income cases correctly', () => {
    const transactions = [
      { type: 'Expense', amount: 500, category: 'Food' },
    ];

    const result = calculateMonthlySummary(transactions);

    expect(result.income).toBe(0);
    expect(result.expense).toBe(500);
    expect(result.balance).toBe(-500);
    expect(result.savingRate).toBe('0.00');
    expect(result.categoryBreakdown[0].value).toBe(100.00);
  });

  it('should handle zero-expense cases correctly', () => {
    const transactions = [
      { type: 'Income', amount: 1000, category: 'Salary' },
    ];

    const result = calculateMonthlySummary(transactions);

    expect(result.income).toBe(1000);
    expect(result.expense).toBe(0);
    expect(result.balance).toBe(1000);
    expect(result.savingRate).toBe('100.00');
    expect(result.categoryBreakdown).toEqual([]);
  });

  it('should handle empty transactions list correctly', () => {
    const transactions = [];

    const result = calculateMonthlySummary(transactions);

    expect(result.income).toBe(0);
    expect(result.expense).toBe(0);
    expect(result.balance).toBe(0);
    expect(result.savingRate).toBe('0.00');
    expect(result.categoryBreakdown).toEqual([]);
  });
});
