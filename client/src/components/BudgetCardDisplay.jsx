import React, { useState } from 'react';
import { Pencil, Trash2, Check, X } from 'lucide-react';
import { useAppContext } from '../contexts/AppProvider';

function BudgetCardDisplay({ item }) {
  const { updateBudget, deleteBudget, getBudgetUsage, getBudgets, budgetUsage } = useAppContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editedAmount, setEditedAmount] = useState(item.amount);

  const usageData = budgetUsage.report.find(b => b.category === item.category);
  const spent = usageData ? usageData.spent : 0;
  const budget = item.amount;
  const pctUsed = budget > 0 ? Math.min((spent / budget) * 100, 100) : 0;

  const barColor =
    pctUsed >= 100 ? 'bg-clay' :
    pctUsed >= 80  ? 'bg-warning' :
                     'bg-signal';

  const handleSave = async () => {
    try {
      await updateBudget(item._id || item.id, { category: item.category, amount: editedAmount });
      await getBudgetUsage();
      setIsEditing(false);
    } catch { return null; }
  };

  const handleDelete = async () => {
    try {
      await deleteBudget(item._id || item.id);
      await getBudgets(); await getBudgetUsage();
    } catch { return null; }
  };

  return (
    <div className="py-4">
      <div className="flex items-start justify-between gap-4 mb-3">
        {/* Left */}
        <div>
          <p className="text-sm font-semibold text-[var(--color-text-primary)]">{item.category}</p>
          <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
            ₹{spent.toLocaleString('en-IN', { minimumFractionDigits: 2 })} spent
            {' · '}
            ₹{(budget - spent).toLocaleString('en-IN', { minimumFractionDigits: 2 })} remaining
          </p>
        </div>

        {/* Right — amount + actions */}
        <div className="flex items-center gap-2 shrink-0">
          {isEditing ? (
            <div className="relative">
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[10px] font-semibold text-[var(--color-text-muted)]">₹</span>
              <input
                type="number"
                value={editedAmount}
                onChange={(e) => setEditedAmount(e.target.value)}
                className="
                  pl-6 pr-2 py-1.5 w-28 rounded-lg text-xs
                  bg-[var(--color-surface-2)] border border-[var(--color-border)]
                  text-[var(--color-text-primary)]
                  focus:outline-none focus:ring-2 focus:ring-accent/30
                "
              />
            </div>
          ) : (
            <span className="text-sm font-bold text-[var(--color-text-primary)]">
              ₹{Number(budget).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </span>
          )}

          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="p-1.5 rounded-lg text-signal hover:bg-emerald-50 dark:hover:bg-emerald-950/20 border border-[var(--color-border)] cursor-pointer"
              >
                <Check size={14} />
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="p-1.5 rounded-lg text-[var(--color-text-muted)] hover:bg-[var(--color-surface-3)] border border-[var(--color-border)] cursor-pointer"
              >
                <X size={14} />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="p-1.5 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-3)] border border-[var(--color-border)] cursor-pointer"
              >
                <Pencil size={14} />
              </button>
              <button
                onClick={handleDelete}
                className="p-1.5 rounded-lg text-[var(--color-text-muted)] hover:text-clay hover:bg-red-50 dark:hover:bg-red-950/20 border border-[var(--color-border)] cursor-pointer"
              >
                <Trash2 size={14} />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-1.5 bg-[var(--color-surface-3)] rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${barColor}`}
            style={{ width: `${pctUsed}%` }}
          />
        </div>
        <span className="text-[10px] font-semibold text-[var(--color-text-muted)] w-10 text-right">
          {pctUsed.toFixed(0)}%
        </span>
      </div>
    </div>
  );
}

export default BudgetCardDisplay;
