import React, { useState, useEffect } from 'react';
import { ArrowDownUp, Download } from 'lucide-react';
import { useAppContext } from '../contexts/AppProvider';
import TransactionCard from '../components/TransactionCard';
import Papa from 'papaparse';
import toast from 'react-hot-toast';

const inputClass = `
  w-full px-3 py-2.5 rounded-xl text-sm
  bg-[var(--color-surface-2)] border border-[var(--color-border)]
  text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)]
  focus:outline-none focus:ring-2 focus:ring-accent/30
`;

function Transactions() {
  const { transactions, search, setSearch } = useAppContext();
  const [typeFilter, setTypeFilter] = useState('All');
  const [sortBy, setSortBy] = useState('Date');
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    let temp = [...transactions];
    if (typeFilter !== 'All') temp = temp.filter(t => t.type.toLowerCase() === typeFilter.toLowerCase());
    if (search) temp = temp.filter(t => (t.description || '').toLowerCase().includes(search.toLowerCase()));
    if (sortBy === 'Date') temp.sort((a, b) => new Date(b.date) - new Date(a.date));
    else if (sortBy === 'Amount') temp.sort((a, b) => b.amount - a.amount);
    setFiltered(temp);
  }, [search, typeFilter, sortBy, transactions]);

  const handleExportCSV = () => {
    if (filtered.length === 0) { toast.error('No transactions to export'); return; }
    const dataToExport = filtered.map(t => ({
      Date: new Date(t.date).toLocaleString(),
      Type: t.type, Category: t.category,
      Amount: t.amount, Description: t.description || '',
      Recurring: t.isRecurring ? 'Yes' : 'No', Frequency: t.frequency || '',
    }));
    const csv = Papa.unparse(dataToExport);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `transactions_${new Date().toISOString().slice(0, 10)}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('CSV exported successfully!');
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-[var(--color-text-primary)]">Transactions</h1>
        <p className="text-sm text-[var(--color-text-muted)] mt-0.5">Search and review your full history</p>
      </div>

      {/* Filter Bar */}
      <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-5 mb-4 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <ArrowDownUp size={14} className="text-[var(--color-text-muted)]" />
          <h2 className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">Filters</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <input
            type="text"
            placeholder="Search by description…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={inputClass}
          />
          <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className={`${inputClass} cursor-pointer`}>
            <option value="All">All types</option>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className={`${inputClass} cursor-pointer`}>
            <option value="Date">Sort by date</option>
            <option value="Amount">Sort by amount</option>
          </select>
        </div>
      </div>

      {/* Transaction List */}
      <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm font-semibold text-[var(--color-text-primary)]">History</h2>
            <p className="text-xs text-[var(--color-text-muted)]">{filtered.length} transaction{filtered.length !== 1 ? 's' : ''}</p>
          </div>
          <button
            onClick={handleExportCSV}
            className="
              flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold
              bg-[var(--color-surface-2)] border border-[var(--color-border)]
              text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]
              hover:bg-[var(--color-surface-3)] cursor-pointer transition-colors
            "
          >
            <Download size={13} /> Export CSV
          </button>
        </div>

        <div className="flex flex-col divide-y divide-[var(--color-border)]">
          {filtered.length === 0 ? (
            <p className="text-sm text-center text-[var(--color-text-muted)] py-12">No transactions found.</p>
          ) : (
            filtered.map((item) => (
              <TransactionCard item={item} key={item._id || item.id} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Transactions;
