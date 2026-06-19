import React from 'react'

function MoneyCard({ title, icon, amount=0, style, textColor = "", isPrice=true }) {
    return (
        <div className='w-full py-6 px-5 border border-gray-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 space-y-1 shadow-sm'>
            <div className='flex items-center justify-between gap-4 text-sm font-semibold text-gray-700 dark:text-gray-300'>
                <span>{title}</span>
                <span className={`${style} text-xl`}>{icon}</span>
            </div>
            {
                isPrice ? 
                 <span className={`text-2xl font-bold ${textColor || "text-gray-900 dark:text-white"}`}>Rs.{Number(amount || 0).toFixed(2)}</span>
                 :
                  <span className={`text-2xl font-bold ${textColor || "text-gray-900 dark:text-white"}`}>{Number(amount || 0).toFixed(2)}%</span>
            }
          
        </div>
    )
}

export default MoneyCard