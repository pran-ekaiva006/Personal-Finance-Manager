import React, { useState, useEffect } from 'react';
import { ArrowDownUp, Download } from 'lucide-react';
import { useAppContext } from '../contexts/AppProvider';
import TransactionCard from '../components/TransactionCard';
import Papa from 'papaparse';
import toast from 'react-hot-toast';

function TransactionHistory() {
  const { transactions, search, setSearch } = useAppContext();
  const [typeFilter, setTypeFilter] = useState('All');
  const [sortBy, setSortBy] = useState('Date');
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    let temp = [...transactions];

    // Filter by type
    if (typeFilter !== 'All') {
      temp = temp.filter((t) => t.type.toLowerCase() === typeFilter.toLowerCase());
    }

    // Search by description
    if (search) {
      temp = temp.filter((t) =>
        (t.description || '').toLowerCase().includes(search.toLowerCase())
      );
    }

    // Sort
    if (sortBy === 'Date') {
      temp.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortBy === 'Amount') {
      temp.sort((a, b) => b.amount - a.amount);
    }

    setFiltered(temp);
  }, [search, typeFilter, sortBy, transactions]);

  const handleExportCSV = () => {
    if (filtered.length === 0) {
      toast.error("No transactions to export");
      return;
    }

    // Format fields for clear CSV structure
    const dataToExport = filtered.map(t => ({
      Date: new Date(t.date).toLocaleString(),
      Type: t.type,
      Category: t.category,
      Amount: t.amount,
      Description: t.description || '',
      Recurring: t.isRecurring ? 'Yes' : 'No',
      Frequency: t.frequency || ''
    }));

    const csv = Papa.unparse(dataToExport);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `transactions_${new Date().toISOString().slice(0, 10)}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("CSV file downloaded successfully!");
  };

  return (
    <div className="w-full">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Transactions</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Search and review your full history</p>
        </div>
      </div>

      <div className="rounded-xl bg-white dark:bg-slate-900 p-6 border border-gray-200 dark:border-slate-800 mb-10 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <ArrowDownUp className="text-signal" size={20} /> Filter Transactions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Search transactions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white rounded-xl px-4 py-2.5 w-full focus:outline-none focus:ring-2 focus:ring-signal"
          />

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white rounded-xl px-4 py-2.5 w-full focus:outline-none focus:ring-2 focus:ring-signal cursor-pointer"
          >
            <option value="All">All Types</option>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white rounded-xl px-4 py-2.5 w-full focus:outline-none focus:ring-2 focus:ring-signal cursor-pointer"
          >
            <option value="Date">Date</option>
            <option value="Amount">Amount</option>
          </select>
        </div>
      </div>

      <div className="rounded-xl bg-white dark:bg-slate-900 p-6 border border-gray-200 dark:border-slate-800 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Transaction History
          </h3>
          <button
            onClick={handleExportCSV}
            className="px-4 py-2 text-sm font-semibold rounded-lg bg-signal text-white hover:bg-opacity-95 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <Download size={16} /> Export CSV
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {filtered.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400">No transactions found.</p>
          ) : (
            filtered.map((item) => (
              <TransactionCard item={item} key={item.id} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default TransactionHistory;
