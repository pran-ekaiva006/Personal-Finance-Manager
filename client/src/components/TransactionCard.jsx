import React from 'react'
import { CalendarDays } from 'lucide-react';

function TransactionCard({ item }) {
  const isExpense = item.type === 'Expense';

  return (
    <div className="flex justify-between items-center py-3.5 gap-4">
      {/* Left */}
      <div className="flex items-center gap-3 min-w-0">
        {/* Type dot */}
        <div className={`w-2 h-2 rounded-full shrink-0 ${isExpense ? 'bg-clay' : 'bg-signal'}`} />
        <div className="min-w-0">
          <p className="text-sm font-medium text-[var(--color-text-primary)] truncate">
            {item.description || 'No description'}
          </p>
          <div className="flex items-center gap-3 mt-0.5">
            <span className="text-xs text-[var(--color-text-muted)]">{item.category}</span>
            <span className="text-[10px] text-[var(--color-text-muted)] flex items-center gap-1">
              <CalendarDays size={10} />
              {new Date(item.date).toLocaleDateString('en-IN', {
                day: '2-digit', month: 'short', year: 'numeric'
              })}
            </span>
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="text-right shrink-0">
        <p className={`text-sm font-semibold ${isExpense ? 'text-clay' : 'text-signal'}`}>
          {isExpense ? '−' : '+'}₹{parseFloat(item.amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
        </p>
        {item.isRecurring && (
          <span className="text-[10px] text-[var(--color-text-muted)]">↻ {item.frequency}</span>
        )}
      </div>
    </div>
  );
}

export default TransactionCard;