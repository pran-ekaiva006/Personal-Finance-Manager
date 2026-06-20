import React, { useState, useEffect } from 'react'
import MoneyCard from '../components/MoneyCard'
import SimpleLineChart from '../components/SimpleLineChart'
import PieChart from '../components/PieChart'
import { useAppContext } from '../contexts/AppProvider'

const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December'
];

function Dashboard() {
  const { statistic, yearData, navigate, fetchMonthlySummary } = useAppContext();

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    fetchMonthlySummary({ year: selectedYear, month: selectedMonth });
  }, [selectedMonth, selectedYear]);

  const isEmpty = statistic.income === 0 && statistic.expense === 0;
  const displayMonthName = MONTHS[selectedMonth - 1] + ' ' + selectedYear;

  const selectClass = `
    px-2.5 py-1.5 rounded-lg text-xs font-medium
    bg-[var(--color-surface-2)] border border-[var(--color-border)]
    text-[var(--color-text-secondary)]
    focus:outline-none focus:ring-2 focus:ring-accent/30
    cursor-pointer
  `;

  return (
    <div>
      {/* Page Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-[var(--color-text-primary)]">Dashboard</h1>
          <p className="text-sm text-[var(--color-text-muted)] mt-0.5">Your financial overview at a glance</p>
        </div>

        {/* Period picker */}
        <div className="flex items-center gap-2">
          <select value={selectedMonth} onChange={(e) => setSelectedMonth(Number(e.target.value))} className={selectClass}>
            {MONTHS.map((m, i) => (
              <option key={i + 1} value={i + 1}>{m}</option>
            ))}
          </select>
          <select value={selectedYear} onChange={(e) => setSelectedYear(Number(e.target.value))} className={selectClass}>
            {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - 2 + i).map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
      </div>

      {isEmpty ? (
        <div className="flex items-center justify-center py-24">
          <div className="
            bg-[var(--color-surface)] border border-[var(--color-border)]
            rounded-2xl p-10 text-center max-w-sm w-full shadow-sm
          ">
            <div className="w-12 h-12 rounded-2xl bg-[var(--color-surface-3)] flex items-center justify-center mx-auto mb-4 text-2xl">
              📊
            </div>
            <h2 className="text-base font-semibold text-[var(--color-text-primary)] mb-1">No transactions yet</h2>
            <p className="text-sm text-[var(--color-text-muted)] mb-5">
              Start by recording your first income or expense.
            </p>
            <button
              onClick={() => navigate('/add-transactions')}
              className="
                px-5 py-2 rounded-lg text-sm font-semibold text-white
                bg-accent hover:bg-accent-dark transition-colors cursor-pointer
              "
            >
              Add first transaction
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Balance Hero */}
          <div className="
            bg-[var(--color-surface)] border border-[var(--color-border)]
            rounded-2xl p-6 mb-4 shadow-sm
          ">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
              <div>
                <p className="text-xs font-semibold tracking-widest text-[var(--color-text-muted)] uppercase mb-1">
                  Total Balance
                </p>
                <p className={`text-4xl md:text-5xl font-bold font-serif-display ${
                  statistic.balance >= 0 ? 'text-signal' : 'text-clay'
                }`}>
                  ₹{Number(statistic.balance || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </p>
              </div>
              <span className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider pb-1">
                {displayMonthName}
              </span>
            </div>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <MoneyCard
              title="Monthly Income"
              amount={statistic.income}
              type="income"
            />
            <MoneyCard
              title="Monthly Expenses"
              amount={statistic.expense}
              type="expense"
            />
            <MoneyCard
              title="Savings Rate"
              amount={statistic.savingRate}
              type="savings"
              isPrice={false}
            />
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-6 shadow-sm">
              <h2 className="text-sm font-semibold text-[var(--color-text-primary)] mb-1">Income vs Expenses</h2>
              <p className="text-xs text-[var(--color-text-muted)] mb-4">12-month trend</p>
              <SimpleLineChart data={yearData} />
            </div>
            <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-6 shadow-sm">
              <h2 className="text-sm font-semibold text-[var(--color-text-primary)] mb-1">Expense Breakdown</h2>
              <p className="text-xs text-[var(--color-text-muted)] mb-4">By category this month</p>
              <PieChart data={statistic?.categoryBreakdown} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;