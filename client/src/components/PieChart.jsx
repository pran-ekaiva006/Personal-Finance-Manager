import React from 'react';
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const COLORS = ['#1F7A4D', '#C4622D', '#D97706', '#3B82F6', '#0D9488', '#8B5CF6', '#F59E0B'];

export default function ExpensePieChart({ data }) {

  return (
    <div style={{ width: '100%', height: 400 }}>
      {
        (Array.isArray(data) && data.length > 0) ? (
          <ResponsiveContainer>
            <PieChart>
              <Pie
                dataKey="value"
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `Rs ${value.toFixed(2)}`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-gray-500 dark:text-gray-400" style={{ textAlign: 'center', marginTop: 150 }}>No data to display</p>
        )
      }
    </div>
  );
}
