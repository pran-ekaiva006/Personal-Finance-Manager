import React, { useState } from 'react'
import MoneyCard from '../components/MoneyCard'
import SimpleLineChart from '../components/SimpleLineChart'
import PieChart from '../components/PieChart'
import { useAppContext } from '../contexts/AppProvider'

function Dashboard() {
  const { statistic, yearData, navigate } = useAppContext();

  const isEmpty = statistic.income === 0 && statistic.expense === 0;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Your financial overview at a glance</p>
      </div>

      {isEmpty ? (
        <div className="flex items-center justify-center py-20">
          <div className="bg-white rounded-xl border border-gray-200 p-10 text-center max-w-md w-full">
            <div className="text-5xl mb-4">📊</div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">No transactions yet</h2>
            <p className="text-sm text-gray-500 mb-6">
              Start tracking your finances by recording your first income or expense.
            </p>
            <button
              onClick={() => navigate('/add-transactions')}
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all"
            >
              Add your first transaction
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
            <div className='grid xl:grid-cols-2 grid-cols-1 gap-4'>
              <MoneyCard title={"Total Balance"} amount={statistic.balance}
                icon={"$"} style={"text-green-600"} textColor={statistic.balance >= 0 ? "text-green-500" : "text-red-500"} />
              <MoneyCard title={"Monthly Income"} amount={statistic.income} icon={"+"} style={"text-blue-500"} />
            </div>
            
            <div className='grid xl:grid-cols-2 grid-cols-1 gap-4'>
              <MoneyCard title={"Monthly Expenses"} amount={statistic.expense} icon={"-"} style={"text-red-600"} textColor="text-red-600" />
              <MoneyCard title={"Savings Rate"} isPrice={false}
              amount={statistic.savingRate + "%"} textColor={statistic.savingRate >= 0 ? "text-green-500" : "text-red-500"}
                icon={"%"} color={""} style={"text-black"} />
            </div>
          </div>

          <div className='grid grid-cols-1 xl:grid-cols-2 mt-4 gap-4'>
            <div className='bg-white rounded-xl p-6 border border-gray-200'>
              <h3 className='font-semibold text-2xl'>Income vs Expenses</h3>
              <div className='mt-12'>
                <SimpleLineChart data={yearData} />
              </div>
            </div>
            <div className='bg-white rounded-xl p-6 border border-gray-200'>
              <h3 className='font-semibold text-2xl'>Expense Categories</h3>
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