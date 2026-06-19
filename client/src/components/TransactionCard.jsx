import React from 'react'
import {CalendarDays } from 'lucide-react';
function TransactionCard({item}) {
    return (
        <div
            className="flex justify-between items-center bg-gray-50 dark:bg-slate-900/60 border border-transparent dark:border-slate-800/80 px-4 py-4 rounded-xl shadow-sm"
        >
            <div>
                <h4 className="font-bold text-lg text-gray-900 dark:text-white">{item.description || 'No Description'}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">{item.category}</p>
                <div className="flex items-center text-sm text-gray-400 dark:text-gray-500 mt-1">
                    <CalendarDays size={14} className="mr-1" />
                    {new Date(item.date).toLocaleString()}
                </div>
            </div>

            <div className="text-right">
                <p
                    className={`font-bold text-xl
                        ${item.type === 'Expense' ? 'text-clay' : 'text-signal'
                        }`}
                >
                    Rs.{parseFloat(item.amount).toFixed(2)}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{item.type}</p>
            </div>
        </div>
    )
}

export default TransactionCard