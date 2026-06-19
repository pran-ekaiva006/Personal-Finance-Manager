import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../contexts/AppProvider';
import { ArrowRight, CheckCircle, Github, ExternalLink, Sparkles, TrendingUp, SlidersVertical, BadgeDollarSign } from 'lucide-react';
import toast from 'react-hot-toast';

function LandingPage() {
  const { user, login, navigate } = useAppContext();
  const [demoLoading, setDemoLoading] = useState(false);

  // If user is already logged in, automatically redirect to dashboard
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleTryDemo = async () => {
    if (demoLoading) return;
    setDemoLoading(true);
    const toastId = toast.loading('Logging in to Demo Account...');
    try {
      // Use the seeded credentials
      await login({
        email: 'demo@cashflowx.app',
        password: 'demoPassword123',
      });
      toast.success('Welcome to the Demo Account!', { id: toastId });
    } catch {
      toast.error('Failed to log in to demo account. Please try again.', { id: toastId });
    } finally {
      setDemoLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans relative overflow-hidden flex flex-col justify-between">
      {/* Decorative Blur Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-green-500/10 blur-[150px] pointer-events-none"></div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-950/70 backdrop-blur-md border-b border-slate-900 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img src="./logo.png" alt="Logo" className="w-9 h-9" />
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
              CashFlowX
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="text-sm font-semibold text-slate-300 hover:text-white transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/login"
              state={{ mode: 'sign-up' }}
              className="px-4 py-2 text-sm font-semibold rounded-lg bg-slate-800 text-white border border-slate-700 hover:bg-slate-700 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="max-w-6xl mx-auto px-6 pt-16 pb-12 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400 mb-6">
            <Sparkles size={14} /> Redesigning Personal Finance Management
          </div>

          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-6 max-w-4xl mx-auto leading-tight">
            See where your{' '}
            <span className="bg-gradient-to-r from-blue-400 via-emerald-400 to-green-400 bg-clip-text text-transparent">
              money actually goes
            </span>
          </h1>

          <p className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Gain full clarity on your spending habits, manage monthly budgets effortlessly, and grow your savings with CashFlowX's visual manager.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              to="/login"
              state={{ mode: 'sign-up' }}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-green-500 text-white font-bold hover:shadow-[0_0_30px_rgba(59,130,246,0.35)] transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              Get Started <ArrowRight size={18} />
            </Link>
            <button
              onClick={handleTryDemo}
              disabled={demoLoading}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900/80 text-white font-semibold border border-slate-800 hover:bg-slate-800 hover:border-slate-700 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {demoLoading ? 'Seeding Demo...' : 'Try Live Demo'}
            </button>
          </div>

          {/* Premium CSS Interactive Mockup of Dashboard */}
          <div className="max-w-4xl mx-auto bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-800/80 p-4 md:p-6 shadow-2xl relative overflow-hidden group hover:border-slate-700/80 transition-all duration-300">
            {/* Window bar */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800/80">
              <div className="flex gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/60"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-500/60"></span>
                <span className="w-3 h-3 rounded-full bg-green-500/60"></span>
              </div>
              <div className="text-xs text-slate-500 font-mono">demo.cashflowx.app/dashboard</div>
              <div className="w-10"></div>
            </div>

            {/* Mock Dashboard Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
              {/* Left Column: Cards */}
              <div className="md:col-span-2 space-y-4">
                {/* Balance & Monthly Income/Expenses */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-slate-950/80 border border-slate-800/60 rounded-xl p-4">
                    <div className="text-xs font-semibold text-slate-400">Total Balance</div>
                    <div className="text-2xl font-black text-green-400 mt-1">$5,670.00</div>
                    <div className="text-[10px] text-slate-500 mt-2">↑ 8.2% from last month</div>
                  </div>
                  <div className="bg-slate-950/80 border border-slate-800/60 rounded-xl p-4">
                    <div className="text-xs font-semibold text-slate-400">Monthly Expenses</div>
                    <div className="text-2xl font-black text-red-400 mt-1">$2,080.00</div>
                    <div className="text-[10px] text-slate-500 mt-2">72% of budget used</div>
                  </div>
                </div>

                {/* Styled CSS Chart Mockup */}
                <div className="bg-slate-950/80 border border-slate-800/60 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-xs font-semibold text-slate-300">Income vs Expense Trend</div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">Monthly</span>
                  </div>
                  {/* SVG Mockup Chart */}
                  <div className="h-32 w-full flex items-end">
                    <svg className="w-full h-full" viewBox="0 0 300 100" preserveAspectRatio="none">
                      {/* Grid lines */}
                      <line x1="0" y1="20" x2="300" y2="20" stroke="#1e293b" strokeDasharray="2" />
                      <line x1="0" y1="50" x2="300" y2="50" stroke="#1e293b" strokeDasharray="2" />
                      <line x1="0" y1="80" x2="300" y2="80" stroke="#1e293b" strokeDasharray="2" />
                      
                      {/* Income Path */}
                      <path d="M 0 80 Q 50 30 100 40 T 200 20 T 300 10" fill="none" stroke="#3b82f6" strokeWidth="2.5" />
                      {/* Expense Path */}
                      <path d="M 0 90 Q 50 70 100 80 T 200 60 T 300 50" fill="none" stroke="#ef4444" strokeWidth="2.5" />
                    </svg>
                  </div>
                  <div className="flex justify-between text-[9px] text-slate-500 mt-2">
                    <span>Jan</span><span>Mar</span><span>May</span><span>Jul</span><span>Sep</span><span>Nov</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Budgets & Transactions */}
              <div className="space-y-4">
                {/* Budget Limit Items */}
                <div className="bg-slate-950/80 border border-slate-800/60 rounded-xl p-4 space-y-3">
                  <div className="text-xs font-semibold text-slate-300">Monthly Budget Limits</div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-medium text-slate-400">
                      <span>Food & Dining</span>
                      <span>$291.70 / $500</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded-full" style={{ width: '58%' }}></div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-medium text-slate-400">
                      <span>Shopping</span>
                      <span>$189.99 / $300</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-yellow-500 h-full rounded-full" style={{ width: '63%' }}></div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-medium text-slate-400">
                      <span>Travel</span>
                      <span>$350.00 / $500</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-red-500/80 h-full rounded-full" style={{ width: '70%' }}></div>
                    </div>
                  </div>
                </div>

                {/* Mini Recent Transactions */}
                <div className="bg-slate-950/80 border border-slate-800/60 rounded-xl p-4 space-y-3.5">
                  <div className="text-xs font-semibold text-slate-300">Recent Activity</div>
                  
                  <div className="flex items-center justify-between text-[10px]">
                    <div>
                      <div className="font-bold text-slate-300">Salary Check</div>
                      <div className="text-slate-500 text-[8px]">Today</div>
                    </div>
                    <span className="font-bold text-emerald-400">+$6,500.00</span>
                  </div>

                  <div className="flex items-center justify-between text-[10px]">
                    <div>
                      <div className="font-bold text-slate-300">Flight Ticket</div>
                      <div className="text-slate-500 text-[8px]">Yesterday</div>
                    </div>
                    <span className="font-bold text-red-400">-$350.00</span>
                  </div>

                  <div className="flex items-center justify-between text-[10px]">
                    <div>
                      <div className="font-bold text-slate-300">Supermarket</div>
                      <div className="text-slate-500 text-[8px]">June 18</div>
                    </div>
                    <span className="font-bold text-red-400">-$125.50</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="border-t border-slate-900 bg-slate-950/40 py-20 relative z-10">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">How CashFlowX Works</h2>
            <p className="text-slate-400 max-w-xl mx-auto mb-16 text-sm md:text-base">
              Take three simple steps to organize your financial life and build long-term savings.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-8 hover:border-slate-700/80 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-lg mb-6 mx-auto">
                  <BadgeDollarSign size={24} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">1. Add Transactions</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Log your daily income or expenses. Categorize each item to see precisely where your funds are allocated.
                </p>
              </div>

              {/* Step 2 */}
              <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-8 hover:border-slate-700/80 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-lg mb-6 mx-auto">
                  <SlidersVertical size={24} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">2. Set Budgets</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Establish monthly budget limits for categories like Food, Utilities, or Shopping to prevent overspending.
                </p>
              </div>

              {/* Step 3 */}
              <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-8 hover:border-slate-700/80 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 flex items-center justify-center font-bold text-lg mb-6 mx-auto">
                  <TrendingUp size={24} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">3. Track Progress</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Monitor your spending trends over time with clean visual charts. Check your budget usage rate to build healthy savings.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-8 px-6 bg-slate-950 relative z-10 text-xs md:text-sm text-slate-500">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            &copy; {new Date().getFullYear()} CashFlowX. Formerly Personal Finance Manager. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://github.com/pran-ekaiva006/Personal-Finance-Manager"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Github size={16} /> GitHub <ExternalLink size={12} />
            </a>
            <a
              href="https://linkedin.com/in/pranjal-kumar-verma"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              Portfolio <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
