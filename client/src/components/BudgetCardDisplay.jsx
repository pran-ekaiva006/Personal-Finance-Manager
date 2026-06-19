import React, { useState } from 'react';
import { SquarePen, X, Save } from 'lucide-react';
import { useAppContext } from '../contexts/AppProvider';

function BudgetCardDisplay({ item }) {
    const { updateBudget, deleteBudget, getBudgetUsage, getBudgets, budgetUsage } = useAppContext();
    const [isEditing, setIsEditing] = useState(false);
    const [editedAmount, setEditedAmount] = useState(item.amount);

    // Find the specific report for this budget's category
    const usageData = budgetUsage.report.find(b => b.category === item.category);
    const spentAmount = usageData ? usageData.spent : 0;
    const budgetAmount = item.amount;
    const progress = budgetAmount > 0 ? (spentAmount / budgetAmount) * 100 : 0;

    const getProgressBarColor = (percentage) => {
        if (percentage < 50) return 'bg-signal';
        if (percentage < 75) return 'bg-warning';
        return 'bg-clay';
    };

    const handleSave = async () => {
        try {
            await updateBudget(
                item.id,
                {
                    category: item.category,
                    amount: editedAmount
                }
            );
            await getBudgetUsage();
            setIsEditing(false);
        } catch {
            return null;
        }
    }

    const handleDelete = async () => {
        try {
            await deleteBudget(item.id);
            await getBudgets();
            await getBudgetUsage();
        } catch {
            return null
        }
    }

    return (
        <div className='bg-gray-50 dark:bg-slate-900/60 border border-transparent dark:border-slate-800/80 flex flex-col px-5 py-4 rounded-xl'>
            <div className='flex flex-col md:flex-row justify-between items-start md:items-center w-full'>
                <div>
                    <p className='font-semibold text-xl text-gray-900 dark:text-white'>{item.category}</p>
                    <p className='text-sm text-gray-500 dark:text-gray-400'>Monthly Budget</p>
                </div>
 
                <div className='flex items-center justify-between gap-4 mt-3 md:mt-0'>
                    {isEditing ? (
                        <input
                            type='number'
                            value={editedAmount}
                            onChange={(e) => setEditedAmount(e.target.value)}
                            className='border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white rounded-md px-2 py-1 w-28'
                        />
                    ) : (
                        <span className='text-lg font-bold text-gray-900 dark:text-white'>Rs {item.amount.toFixed(2)}</span>
                    )}
                    <div className='flex gap-2'>
                        {isEditing ? (
                            <button
                                className='hover:bg-green-50 dark:hover:bg-green-950/20 text-signal p-1 rounded-md border border-gray-200 dark:border-slate-800 hover:border-green-400'
                                onClick={handleSave}
                            >
                                <Save size={20} />
                            </button>
                        ) : (
                            <button
                                className='hover:bg-blue-50 dark:hover:bg-blue-950/20 text-blue-500 p-1 rounded-md border border-gray-200 dark:border-slate-800 hover:border-blue-300'
                                onClick={() => setIsEditing(true)}
                            >
                                <SquarePen size={20} />
                            </button>
                        )}
                        <button
                            className='hover:bg-red-50 dark:hover:bg-red-950/20 text-clay p-1 rounded-md border border-gray-200 dark:border-slate-800 hover:border-red-300'
                            onClick={handleDelete}
                        >
                            <X size={20} />
                        </button>
                    </div>
                </div>
            </div>
            <div className='mt-4'>
                <div className='flex justify-between items-center mb-1'>
                    <span className='text-sm text-gray-600 dark:text-gray-400'>Spent: Rs {spentAmount.toFixed(2)}</span>
                    <span className='text-sm text-gray-600 dark:text-gray-400'>Remaining: Rs {(budgetAmount - spentAmount).toFixed(2)}</span>
                </div>
                <div className='w-full bg-gray-200 dark:bg-slate-800 rounded-full h-2.5'>
                    <div
                        className={`${getProgressBarColor(progress)} h-2.5 rounded-full`}
                        style={{ width: `${Math.min(progress, 100)}%` }}
                    ></div>
                </div>
            </div>
        </div>
    );
}

export default BudgetCardDisplay;
