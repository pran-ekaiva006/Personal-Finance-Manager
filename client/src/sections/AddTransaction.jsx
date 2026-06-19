import React, { useState } from "react";
import { useAppContext } from "../contexts/AppProvider";
import toast from "react-hot-toast";

function AddTransaction() {
  // Access functions from the app's context
  const { addTransaction, getBudgetUsage } = useAppContext();

  // Local state for form inputs
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("Expense");
  const [isRecurring, setIsRecurring] = useState(false);
  const [frequency, setFrequency] = useState("monthly");
  const [loading, setLoading] = useState(false); // Used to disable UI during submission

  // Predefined category options
  const expenseTypes = [
    "Food & Dining",
    "Transportation",
    "Shopping",
    "Entertainment",
    "Bills & Utilities",
    "Healthcare",
    "Travel",
    "Other",
  ];

  const incomeTypes = [
    "Salary",
    "Freelance",
    "Investment",
    "Business",
    "Gift",
    "Other",
  ];

  // Handle form submission
  const handleSubmit = async () => {
    // Validate required fields
    if (!category || !amount || !type) {
      toast.error("Please select a type, category and enter an amount.");
      return;
    }

    setLoading(true); // Disable UI elements

    try {
      // Save transaction using context method
      await addTransaction({
        category,
        amount: Number(amount),
        type,
        description,
        isRecurring,
        frequency: isRecurring ? frequency : null
      });

      // Refresh budget data
      await getBudgetUsage();

      // Reset form fields
      setCategory("");
      setAmount("");
      setDescription("");
      setIsRecurring(false);
      setFrequency("monthly");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Re-enable UI elements
    }
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Add Transaction</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Record income or an expense</p>
      </div>

      {/* Card container */}
      <div className="rounded-xl bg-white dark:bg-slate-900 py-6 px-6 border border-gray-200 dark:border-slate-800 shadow-sm">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          <span className="text-signal">+</span> Add Transactions
        </h1>

        {/* Form grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Transaction Type Selector */}
          <div>
            <label
              htmlFor="type"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2.5"
            >
              Type
            </label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="pl-3 py-2.5 border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-850 text-gray-900 dark:text-white w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-signal cursor-pointer"
              disabled={loading}
            >
              {["Expense", "Income"].map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* Amount Input */}
          <div>
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2.5"
            >
              Amount
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
                Rs
              </span>
              <input
                id="amount"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-10 pr-3 py-2.5 border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-850 text-gray-900 dark:text-white w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-signal"
                disabled={loading}
              />
            </div>
          </div>

          {/* Category Selector */}
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2.5"
            >
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="pl-3 py-2.5 border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-850 text-gray-900 dark:text-white w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-signal cursor-pointer"
              disabled={loading}
            >
              <option value="">Select category...</option>
              {(type === "Expense" ? expenseTypes : incomeTypes).map(
                (item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                )
              )}
            </select>
          </div>

          {/* Description Input */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2.5"
            >
              Description
            </label>
            <input
              id="description"
              type="text"
              placeholder="Transaction description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="px-3 py-2.5 border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-850 text-gray-900 dark:text-white w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-signal"
              disabled={loading}
            />
          </div>
        </div>

        {/* Recurring Settings & Action Row */}
        <div className="mt-6 pt-6 border-t border-gray-150 dark:border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            {/* Checkbox */}
            <div className="flex items-center gap-2">
              <input
                id="isRecurring"
                type="checkbox"
                checked={isRecurring}
                onChange={(e) => setIsRecurring(e.target.checked)}
                className="w-4.5 h-4.5 text-signal border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-850 rounded focus:ring-signal focus:ring-2 cursor-pointer"
                disabled={loading}
              />
              <label
                htmlFor="isRecurring"
                className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer"
              >
                Make this recurring
              </label>
            </div>

            {/* Frequency selector (conditional) */}
            {isRecurring && (
              <div className="flex items-center gap-3">
                <label
                  htmlFor="frequency"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Frequency
                </label>
                <select
                  id="frequency"
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  className="pl-3 pr-8 py-2 border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-850 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-signal text-sm cursor-pointer"
                  disabled={loading}
                >
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="w-full md:w-auto">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`w-full md:w-auto px-8 py-3 rounded-xl text-white font-semibold transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
                type === "Income"
                  ? "bg-signal hover:bg-opacity-95"
                  : "bg-clay hover:bg-opacity-95"
              }`}
            >
              {loading
                ? "Loading..."
                : `+ ${type === "Income" ? "Add Income" : "Add Expense"}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddTransaction;
