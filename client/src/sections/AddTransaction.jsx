import React, { useState } from "react";
import { useAppContext } from "../contexts/AppProvider";
import toast from "react-hot-toast";

const EXPENSE_TYPES = [
  "Food & Dining", "Transportation", "Shopping",
  "Entertainment", "Bills & Utilities", "Healthcare", "Travel", "Other",
];
const INCOME_TYPES = [
  "Salary", "Freelance", "Investment", "Business", "Gift", "Other",
];

const inputClass = `
  w-full px-3 py-2.5 rounded-xl text-sm
  bg-[var(--color-surface-2)] border border-[var(--color-border)]
  text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)]
  focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent
  disabled:opacity-50
`;

const labelClass = "block text-xs font-medium text-[var(--color-text-secondary)] mb-1.5";

function AddTransaction() {
  const { addTransaction, getBudgetUsage } = useAppContext();

  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("Expense");
  const [isRecurring, setIsRecurring] = useState(false);
  const [frequency, setFrequency] = useState("monthly");
  const [loading, setLoading] = useState(false);

  const isIncome = type === "Income";

  const handleSubmit = async () => {
    if (!category || !amount || !type) {
      toast.error("Please select a type, category and enter an amount.");
      return;
    }
    setLoading(true);
    try {
      await addTransaction({
        category,
        amount: Number(amount),
        type,
        description,
        isRecurring,
        frequency: isRecurring ? frequency : null,
      });
      await getBudgetUsage();
      setCategory(""); setAmount(""); setDescription("");
      setIsRecurring(false); setFrequency("monthly");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-[var(--color-text-primary)]">Add Transaction</h1>
        <p className="text-sm text-[var(--color-text-muted)] mt-0.5">Record income or an expense</p>
      </div>

      {/* Type Toggle */}
      <div className="flex gap-1 p-1 bg-[var(--color-surface-3)] rounded-xl w-fit mb-6">
        {["Expense", "Income"].map((t) => (
          <button
            key={t}
            onClick={() => { setType(t); setCategory(""); }}
            className={`
              px-5 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer
              ${type === t
                ? t === "Income"
                  ? "bg-signal text-white shadow-sm"
                  : "bg-clay text-white shadow-sm"
                : "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
              }
            `}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Form Card */}
      <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Amount */}
          <div>
            <label className={labelClass}>Amount</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-[var(--color-text-muted)]">₹</span>
              <input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className={`${inputClass} pl-7`}
                disabled={loading}
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className={labelClass}>Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={`${inputClass} cursor-pointer`}
              disabled={loading}
            >
              <option value="">Select category…</option>
              {(isIncome ? INCOME_TYPES : EXPENSE_TYPES).map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className={labelClass}>Description <span className="text-[var(--color-text-muted)] font-normal">(optional)</span></label>
            <input
              type="text"
              placeholder="e.g. Grocery run"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={inputClass}
              disabled={loading}
            />
          </div>

          {/* Recurring */}
          <div>
            <label className={labelClass}>Recurring</label>
            <div className="flex items-center gap-4 h-10">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <div
                  onClick={() => !loading && setIsRecurring(p => !p)}
                  className={`
                    relative w-9 h-5 rounded-full transition-colors cursor-pointer
                    ${isRecurring ? 'bg-accent' : 'bg-[var(--color-border-strong)]'}
                  `}
                >
                  <span className={`
                    absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform
                    ${isRecurring ? 'translate-x-4' : 'translate-x-0.5'}
                  `} />
                </div>
                <span className="text-xs font-medium text-[var(--color-text-secondary)]">
                  {isRecurring ? 'Yes' : 'No'}
                </span>
              </label>

              {isRecurring && (
                <select
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  className="text-xs px-2 py-1.5 rounded-lg bg-[var(--color-surface-2)] border border-[var(--color-border)] text-[var(--color-text-secondary)] focus:outline-none cursor-pointer"
                  disabled={loading}
                >
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              )}
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="mt-6 pt-5 border-t border-[var(--color-border)] flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`
              px-6 py-2.5 rounded-xl text-sm font-semibold text-white
              disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors
              ${isIncome ? 'bg-signal hover:bg-signal-dark' : 'bg-clay hover:bg-clay-dark'}
            `}
          >
            {loading ? 'Saving…' : isIncome ? '+ Add Income' : '+ Add Expense'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddTransaction;
