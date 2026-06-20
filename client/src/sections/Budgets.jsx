import React from "react";
import BudgetCategoryItem from "../components/BudgetCategoryItem";
import { useAppContext } from "../contexts/AppProvider";

function Budgets() {
  const { budgetUsage } = useAppContext();
  const { totalBudget, totalSpent, remaining, percentUsed } = budgetUsage.total;

  const getBarColor = (pct) => {
    if (pct < 50) return 'bg-signal';
    if (pct < 80) return 'bg-warning';
    return 'bg-clay';
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-[var(--color-text-primary)]">Budgets</h1>
        <p className="text-sm text-[var(--color-text-muted)] mt-0.5">Track spending against your limits</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Total Budget */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)] mb-2">Total Budget</p>
          <p className="text-2xl font-bold text-[var(--color-text-primary)]">
            ₹{Number(totalBudget || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </p>
        </div>

        {/* Total Spent */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)] mb-2">Total Spent</p>
          <p className="text-2xl font-bold text-clay">
            ₹{Number(totalSpent || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </p>
        </div>

        {/* Remaining */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)] mb-2">Remaining</p>
          <p className={`text-2xl font-bold ${remaining >= 0 ? 'text-signal' : 'text-clay'}`}>
            ₹{Math.abs(Number(remaining || 0)).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </p>
          {remaining < 0 && (
            <p className="text-[10px] text-clay font-medium mt-0.5">Over budget</p>
          )}
        </div>
      </div>

      {/* Overall Progress */}
      {totalBudget > 0 && (
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-5 mb-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-[var(--color-text-secondary)]">Overall usage</span>
            <span className={`text-xs font-bold ${
              percentUsed > 80 ? 'text-clay' : percentUsed > 50 ? 'text-warning' : 'text-signal'
            }`}>{Number(percentUsed || 0).toFixed(0)}%</span>
          </div>
          <div className="w-full h-2 bg-[var(--color-surface-3)] rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${getBarColor(percentUsed)}`}
              style={{ width: `${Math.min(percentUsed, 100)}%` }}
            />
          </div>
        </div>
      )}

      {/* Category Breakdown */}
      {budgetUsage.report.length > 0 && (
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-[var(--color-text-primary)] mb-4">Budget Categories</h2>
          <div className="flex flex-col divide-y divide-[var(--color-border)]">
            {budgetUsage.report.map((item, index) => (
              <BudgetCategoryItem key={index} item={item} />
            ))}
          </div>
        </div>
      )}

      {budgetUsage.report.length === 0 && (
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-10 text-center shadow-sm">
          <p className="text-sm text-[var(--color-text-muted)]">No budget categories set yet.</p>
        </div>
      )}
    </div>
  );
}

export default Budgets;
