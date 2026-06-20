import React from 'react';
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer, Cell } from 'recharts';

// Professional, harmonious color palette
const COLORS = [
  '#10B981', '#6366F1', '#F59E0B', '#EF4444',
  '#0EA5E9', '#8B5CF6', '#14B8A6', '#F97316',
];

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-3 shadow-lg text-xs">
      <p className="font-semibold text-[var(--color-text-primary)]">{payload[0].name}</p>
      <p className="text-[var(--color-text-muted)] mt-0.5">
        ₹{Number(payload[0].value).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
      </p>
    </div>
  );
};

export default function ExpensePieChart({ data }) {
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-56">
        <p className="text-sm text-[var(--color-text-muted)]">No expense data this month</p>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie
          dataKey="value"
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={80}
          paddingAngle={2}
          label={false}
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} strokeWidth={0} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend
          wrapperStyle={{ fontSize: 11, paddingTop: 8 }}
          formatter={(v) => <span style={{ color: 'var(--color-text-secondary)' }}>{v}</span>}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
