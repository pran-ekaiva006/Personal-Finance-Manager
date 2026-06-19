import React, { useState } from 'react'
import MoneyCard from '../components/MoneyCard'
import SimpleLineChart from '../components/SimpleLineChart'
import PieChart from '../components/PieChart'
import { useAppContext } from '../contexts/AppProvider'

function Dashboard() {
  const { statistic, yearData, navigate } = useAppContext();

  const isEmpty = statistic.income === 0 && statistic.expense === 0;
  const currentMonthName = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Your financial overview at a glance</p>
      </div>

      {isEmpty ? (
        <div className="flex items-center justify-center py-20">
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 p-10 text-center max-w-md w-full shadow-sm">
            <div className="text-5xl mb-4">📊</div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No transactions yet</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              Start tracking your finances by recording your first income or expense.
            </p>
            <button
              onClick={() => navigate('/add-transactions')}
              className="px-6 py-3 bg-signal text-white font-semibold rounded-lg hover:bg-opacity-95 transition-all cursor-pointer"
            >
              Add your first transaction
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Total Balance Hero Section */}
          <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-6 md:p-8 mb-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
              <div>
                <p className="text-xs md:text-sm font-semibold tracking-wider text-muted uppercase">Total Balance</p>
                <h2 className={`text-5xl md:text-6xl font-black font-serif-display mt-2 ${
                  statistic.balance >= 0 ? 'text-signal' : 'text-clay'
                }`}>
                  Rs.{Number(statistic.balance || 0).toFixed(2)}
                </h2>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-xs md:text-sm font-bold tracking-widest text-muted uppercase [font-variant:all-small-caps]">
                  {currentMonthName}
                </span>
              </div>
            </div>
          </div>

          {/* Other Three Cards in 3-column layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <MoneyCard 
              title={"Monthly Income"} 
              amount={statistic.income} 
              icon={"+"} 
              style={"text-signal"} 
              textColor="text-signal" 
            />
            <MoneyCard 
              title={"Monthly Expenses"} 
              amount={statistic.expense} 
              icon={"-"} 
              style={"text-clay"} 
              textColor="text-clay" 
            />
            <MoneyCard 
              title={"Savings Rate"} 
              isPrice={false}
              amount={statistic.savingRate} 
              icon={"%"} 
              style={"text-gray-900 dark:text-white"} 
              textColor={statistic.savingRate >= 0 ? "text-signal" : "text-clay"} 
            />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-gray-200 dark:border-slate-800">
              <h3 className="font-semibold text-2xl text-gray-900 dark:text-white">Income vs Expenses</h3>
              <div className="mt-12">
                <SimpleLineChart data={yearData} />
              </div>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-gray-200 dark:border-slate-800">
              <h3 className="font-semibold text-2xl text-gray-900 dark:text-white">Expense Categories</h3>
              <div>
                <PieChart data={statistic?.categoryBreakdown} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Dashboard