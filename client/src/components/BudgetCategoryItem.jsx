import React from "react";

const BudgetCategoryItem = ({ item }) => {
  const spent = Number(item.spent || 0);
  const allocated = Number(item.allocated || 0);
  const remaining = Number(item.remaining || 0);
  const pctUsed = allocated > 0 ? Math.min((spent / allocated) * 100, 100) : 0;

  const barColor =
    pctUsed >= 100 ? 'bg-clay' :
    pctUsed >= 80  ? 'bg-warning' :
                     'bg-signal';

  const remainingColor = remaining >= 0 ? 'text-signal' : 'text-clay';

  return (
    <div className="py-4">
      <div className="flex items-start justify-between gap-4 mb-2.5">
        <div>
          <p className="text-sm font-semibold text-[var(--color-text-primary)]">{item.category}</p>
          <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
            ₹{spent.toLocaleString('en-IN', { minimumFractionDigits: 2 })} of ₹{allocated.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </p>
        </div>
        <div className="text-right shrink-0">
          <p className={`text-sm font-semibold ${remainingColor}`}>
            {remaining >= 0
              ? `₹${remaining.toLocaleString('en-IN', { minimumFractionDigits: 2 })} left`
              : `₹${Math.abs(remaining).toLocaleString('en-IN', { minimumFractionDigits: 2 })} over`}
          </p>
          <p className="text-xs text-[var(--color-text-muted)] mt-0.5">{pctUsed.toFixed(0)}% used</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full h-1.5 bg-[var(--color-surface-3)] rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${barColor}`}
          style={{ width: `${pctUsed}%` }}
        />
      </div>
    </div>
  );
};

export default BudgetCategoryItem;
