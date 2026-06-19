import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';


function IncomeExpenseChart({data}) {

  return (
    <div style={{ width: '100%', height: 400 }}>
      {
        data ? (
          <ResponsiveContainer width={"100%"} height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" textAnchor="end" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line strokeWidth={3} type="monotone" dataKey="income" stroke="#1F7A4D" activeDot={{ r: 8 }} />
              <Line strokeWidth={3} type="monotone" dataKey="expense" stroke="#C4622D" />
            </LineChart>
          </ResponsiveContainer>
        )
          :
          (
            <p style={{ textAlign: 'center', marginTop: 150 }}>An error has occurred. </p>
          )
      }

    </div>

  );
}

export default IncomeExpenseChart;
