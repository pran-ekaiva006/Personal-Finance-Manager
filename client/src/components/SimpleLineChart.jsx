import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-3 shadow-lg text-xs">
      <p className="font-semibold text-[var(--color-text-primary)] mb-1.5">{label}</p>
      {payload.map(p => (
        <p key={p.dataKey} style={{ color: p.color }} className="font-medium">
          {p.dataKey.charAt(0).toUpperCase() + p.dataKey.slice(1)}: ₹{Number(p.value).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
        </p>
      ))}
    </div>
  );
};

function IncomeExpenseChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-56">
        <p className="text-sm text-[var(--color-text-muted)]">No data available</p>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
        <XAxis
          dataKey="month"
          tick={{ fontSize: 10, fill: 'var(--color-text-muted)' }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 10, fill: 'var(--color-text-muted)' }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => `₹${v >= 1000 ? (v / 1000).toFixed(0) + 'k' : v}`}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          wrapperStyle={{ fontSize: 11, paddingTop: 12 }}
          formatter={(v) => <span style={{ color: 'var(--color-text-secondary)' }}>{v}</span>}
        />
        <Line
          type="monotone" dataKey="income" stroke="#10B981"
          strokeWidth={2} dot={false} activeDot={{ r: 5, strokeWidth: 0 }}
        />
        <Line
          type="monotone" dataKey="expense" stroke="#EF4444"
          strokeWidth={2} dot={false} activeDot={{ r: 5, strokeWidth: 0 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default IncomeExpenseChart;
