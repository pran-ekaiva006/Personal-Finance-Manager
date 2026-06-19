import React from "react";

const BudgetCategoryItem = ({ item }) => {
  const getPercentageColor = () => {
    if (100 - item.percentLeft > 100) return "text-clay";
    if (100 - item.percentLeft >= 90) return "text-warning";
    return "text-signal";
  };

  return (
    <div className="px-4 py-5 border border-gray-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 shadow-sm">
      <div className="flex items-center mb-1 justify-between gap-4 space-y-2">
        <div>
          <div>
            <div className="font-semibold text-lg text-gray-900 dark:text-white">{item.category}</div>
            <div className="text-gray-600 dark:text-gray-400">
              Rs.{item.spent.toFixed(2)} of Rs.{item.allocated.toFixed(2)}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end">
          <div className={`${getPercentageColor()} font-semibold`}>
            {item.percentLeft}%
          </div>
          <div className="text-sm">
            {item.remaining >= 0 ? (
              <span className="text-signal font-semibold">Rs.{item.remaining.toFixed(2)} left</span>
            ) : (
              <span className="text-clay font-semibold">
                Over budget by Rs.{Math.abs(item.remaining).toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="w-full h-2 bg-gray-200 dark:bg-slate-800 rounded mb-1">
        <div
          className="h-full bg-slate-900 dark:bg-slate-400 rounded"
          style={{ width: `${100 - parseFloat(item.percentLeft)}%` }}
        />
      </div>
    </div>
  );
};

export default BudgetCategoryItem;
