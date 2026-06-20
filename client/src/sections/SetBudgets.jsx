import React, { useState } from 'react';
import BudgetCardDisplay from '../components/BudgetCardDisplay';
import { useAppContext } from '../contexts/AppProvider';
import toast from 'react-hot-toast';

const inputClass = `
  w-full px-3 py-2.5 rounded-xl text-sm
  bg-[var(--color-surface-2)] border border-[var(--color-border)]
  text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)]
  focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent
  disabled:opacity-50
`;

const labelClass = "block text-xs font-medium text-[var(--color-text-secondary)] mb-1.5";

function SetBudgets() {
  const { addBudget, budgets, getBudgets, expenseCategory, getBudgetUsage } = useAppContext();
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!category || !amount) {
      toast.error('Please select a category and enter a budget.');
      return;
    }
    setLoading(true);
    try {
      await addBudget({ category, amount });
      await getBudgets();
      await getBudgetUsage();
      setCategory(''); setAmount('');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-[var(--color-text-primary)]">Set Budgets</h1>
        <p className="text-sm text-[var(--color-text-muted)] mt-0.5">Create and manage monthly spending limits</p>
      </div>

      {/* Info Banner (empty state) */}
      {budgets.length === 0 && (
        <div className="
          bg-accent/5 border border-accent/15 dark:border-accent/20
          rounded-2xl p-4 mb-5 flex items-start gap-3
        ">
          <span className="text-xl mt-0.5">🎯</span>
          <div>
            <p className="text-sm font-semibold text-[var(--color-text-primary)]">No budgets set yet</p>
            <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
              Use the form below to create monthly spending limits. Once set, track them on the Budgets page.
            </p>
          </div>
        </div>
      )}

      {/* Add Budget Form */}
      <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-6 shadow-sm mb-5">
        <h2 className="text-sm font-semibold text-[var(--color-text-primary)] mb-5">New Budget Limit</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div>
            <label className={labelClass}>Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={`${inputClass} cursor-pointer`}
              disabled={loading}
            >
              <option value="">Select category…</option>
              {expenseCategory.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass}>Monthly limit</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-[var(--color-text-muted)]">₹</span>
              <input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className={`${inputClass} pl-7`}
                disabled={loading}
              />
            </div>
          </div>

          <div className="flex items-end">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="
                w-full py-2.5 rounded-xl text-sm font-semibold text-white
                bg-accent hover:bg-accent-dark
                disabled:opacity-50 disabled:cursor-not-allowed
                cursor-pointer transition-colors
              "
            >
              {loading ? 'Saving…' : '+ Set Budget'}
            </button>
          </div>
        </div>
      </div>

      {/* Budget List */}
      {budgets.length > 0 && (
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-[var(--color-text-primary)] mb-4">Monthly Budgets</h2>
          <div className="flex flex-col divide-y divide-[var(--color-border)]">
            {budgets.map((item) => (
              <BudgetCardDisplay key={item._id || item.id} item={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default SetBudgets;
