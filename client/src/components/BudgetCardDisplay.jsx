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
        if (percentage < 50) return 'bg-green-500';
        if (percentage < 75) return 'bg-yellow-500';
        return 'bg-red-500';
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
        } catch (error) {
            return null;
        }
    }

    const handleDelete = async () => {
        try {
            await deleteBudget(item.id);
            await getBudgets();
            await getBudgetUsage();
        } catch (error) {
            return null
        }
    }

    return (
        <div className='bg-gray-50 flex flex-col px-5 py-4 rounded-xl'>
            <div className='flex flex-col md:flex-row justify-between items-start md:items-center w-full'>
                <div>
                    <p className='font-semibold text-xl'>{item.category}</p>
                    <p className='text-sm text-black/70'>Monthly Budget</p>
                </div>

                <div className='flex items-center justify-between gap-4 mt-3 md:mt-0'>
                    {isEditing ? (
                        <input
                            type='number'
                            value={editedAmount}
                            onChange={(e) => setEditedAmount(e.target.value)}
                            className='border border-gray-300 rounded-md px-2 py-1 w-28'
                        />
                    ) : (
                        <span className='text-lg font-bold'>Rs {item.amount.toFixed(2)}</span>
                    )}
                    <div className='flex gap-2'>
                        {isEditing ? (
                            <button
                                className='hover:bg-green-50 text-green-600 p-1 rounded-md border border-gray-200 hover:border-green-400'
                                onClick={handleSave}
                            >
                                <Save size={20} />
                            </button>
                        ) : (
                            <button
                                className='hover:bg-blue-50 text-blue-500 p-1 rounded-md border border-gray-200 hover:border-blue-300'
                                onClick={() => setIsEditing(true)}
                            >
                                <SquarePen size={20} />
                            </button>
                        )}
                        <button
                            className='hover:bg-red-50 text-red-500 p-1 rounded-md border border-gray-200 hover:border-red-300'
                            onClick={handleDelete}
                        >
                            <X size={20} />
                        </button>
                    </div>
                </div>
            </div>
            <div className='mt-4'>
                <div className='flex justify-between items-center mb-1'>
                    <span className='text-sm text-gray-600'>Spent: Rs {spentAmount.toFixed(2)}</span>
                    <span className='text-sm text-gray-600'>Remaining: Rs {(budgetAmount - spentAmount).toFixed(2)}</span>
                </div>
                <div className='w-full bg-gray-200 rounded-full h-2.5'>
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
