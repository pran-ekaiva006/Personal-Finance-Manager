import React from 'react'
import { TrendingUp, TrendingDown, Percent } from 'lucide-react'

const TYPE_CONFIG = {
  income: {
    label: 'income',
    iconBg: 'bg-emerald-50 dark:bg-emerald-950/30',
    iconColor: 'text-signal',
    valueColor: 'text-signal',
    Icon: TrendingUp,
  },
  expense: {
    label: 'expense',
    iconBg: 'bg-red-50 dark:bg-red-950/30',
    iconColor: 'text-clay',
    valueColor: 'text-clay',
    Icon: TrendingDown,
  },
  savings: {
    label: 'savings',
    iconBg: 'bg-[var(--color-surface-3)]',
    iconColor: 'text-[var(--color-text-muted)]',
    valueColor: 'text-[var(--color-text-primary)]',
    Icon: Percent,
  },
};

function MoneyCard({ title, amount = 0, type = 'income', isPrice = true }) {
  const config = TYPE_CONFIG[type] || TYPE_CONFIG.income;
  const { Icon, iconBg, iconColor, valueColor } = config;

  const formattedValue = isPrice
    ? `₹${Number(amount || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}`
    : `${Number(amount || 0).toFixed(1)}%`;

  return (
    <div className="
      bg-[var(--color-surface)] border border-[var(--color-border)]
      rounded-2xl p-5 shadow-sm
    ">
      <div className="flex items-start justify-between gap-3 mb-3">
        <p className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wide">
          {title}
        </p>
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${iconBg}`}>
          <Icon size={15} className={iconColor} />
        </div>
      </div>
      <p className={`text-2xl font-bold ${valueColor}`}>
        {formattedValue}
      </p>
    </div>
  );
}

export default MoneyCard;