import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../contexts/AppProvider';
import {
  ArrowRight, Sun, Moon, Github, TrendingUp, PieChart,
  Wallet, Shield, Zap, Clock
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useDarkMode } from '../hooks/useDarkMode';

function LandingPage() {
  const { user, login, navigate } = useAppContext();
  const { dark, toggle } = useDarkMode();
  const [demoLoading, setDemoLoading] = useState(false);

  useEffect(() => {
    if (user) navigate('/dashboard');
  }, [user, navigate]);

  const handleTryDemo = async () => {
    if (demoLoading) return;
    setDemoLoading(true);
    const toastId = toast.loading('Signing in to demo…');
    try {
      await login({ email: 'demo@cashflowx.app', password: 'demoPassword123' });
      toast.success('Welcome to the demo!', { id: toastId });
    } catch {
      toast.error('Demo login failed. Please try again.', { id: toastId });
    } finally {
      setDemoLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-surface-2)] text-[var(--color-text-primary)]">

      {/* ── Header ──────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-surface)]/80 backdrop-blur-lg">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <img src="./logo.png" alt="CashFlowX" className="w-7 h-7" />
            <span className="text-sm font-bold tracking-tight text-[var(--color-text-primary)]">
              CashFlowX
            </span>
          </Link>

          <div className="flex items-center gap-1.5">
            <button
              onClick={toggle}
              aria-label={dark ? 'Light mode' : 'Dark mode'}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-3)] border border-transparent hover:border-[var(--color-border)] cursor-pointer transition-all"
            >
              {dark ? <Sun size={15} /> : <Moon size={15} />}
            </button>
            <Link to="/login" className="h-8 px-3 flex items-center text-xs font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors">
              Sign in
            </Link>
            <Link
              to="/login"
              state={{ mode: 'sign-up' }}
              className="h-8 px-4 flex items-center text-xs font-semibold bg-accent text-white rounded-lg hover:bg-accent-dark transition-colors"
            >
              Get started
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">

        {/* ── Hero ────────────────────────────────────────── */}
        <section className="relative overflow-hidden">
          {/* Subtle gradient glow behind hero — works in both modes */}
          <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full opacity-20 dark:opacity-15 blur-[120px] pointer-events-none bg-accent" />

          <div className="relative max-w-6xl mx-auto px-6 pt-20 sm:pt-28 pb-16 text-center">
            {/* Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/8 dark:bg-accent/12 border border-accent/15 dark:border-accent/20 text-[11px] font-semibold text-accent tracking-wide uppercase mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              Open-source finance tracker
            </div>

            {/* Headline */}
            <h1 className="text-[40px] sm:text-[52px] md:text-[64px] font-extrabold tracking-tight leading-[1.05] mb-5 max-w-4xl mx-auto">
              Your finances,{' '}
              <span className="text-accent">crystal clear.</span>
            </h1>

            {/* Sub */}
            <p className="text-base sm:text-lg text-[var(--color-text-muted)] max-w-xl mx-auto mb-10 leading-relaxed">
              Track every rupee, set budgets that stick, and see exactly where your money goes — with charts that actually make sense.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16">
              <Link
                to="/login"
                state={{ mode: 'sign-up' }}
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-accent text-white hover:bg-accent-dark transition-colors shadow-lg shadow-accent/20"
              >
                Start for free <ArrowRight size={16} />
              </Link>
              <button
                onClick={handleTryDemo}
                disabled={demoLoading}
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-3)] transition-colors disabled:opacity-50 cursor-pointer"
              >
                {demoLoading ? 'Loading demo…' : 'Try live demo'}
              </button>
            </div>

            {/* ── Product Preview ─────────────────────────── */}
            <div className="max-w-4xl mx-auto">
              <div className="
                bg-[var(--color-surface)] border border-[var(--color-border)]
                rounded-2xl shadow-2xl shadow-black/8 dark:shadow-black/30
                overflow-hidden
              ">
                {/* Window chrome */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--color-border)] bg-[var(--color-surface-2)]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-border-strong)]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-border-strong)]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-border-strong)]" />
                  <span className="ml-3 text-[10px] text-[var(--color-text-muted)] font-mono">cashflowx.app/dashboard</span>
                </div>

                {/* Mock dashboard content */}
                <div className="p-4 sm:p-6">
                  {/* Balance row */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                    <div className="bg-[var(--color-surface-2)] rounded-xl p-4 border border-[var(--color-border)]">
                      <p className="text-[10px] font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Balance</p>
                      <p className="text-xl sm:text-2xl font-bold text-signal">₹4,52,300</p>
                      <p className="text-[10px] text-signal mt-0.5">↑ 12% from last month</p>
                    </div>
                    <div className="bg-[var(--color-surface-2)] rounded-xl p-4 border border-[var(--color-border)]">
                      <p className="text-[10px] font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Income</p>
                      <p className="text-xl sm:text-2xl font-bold text-[var(--color-text-primary)]">₹85,000</p>
                      <p className="text-[10px] text-[var(--color-text-muted)] mt-0.5">June 2026</p>
                    </div>
                    <div className="bg-[var(--color-surface-2)] rounded-xl p-4 border border-[var(--color-border)]">
                      <p className="text-[10px] font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Expenses</p>
                      <p className="text-xl sm:text-2xl font-bold text-clay">₹32,700</p>
                      <p className="text-[10px] text-[var(--color-text-muted)] mt-0.5">38% of income</p>
                    </div>
                  </div>

                  {/* Chart + budgets */}
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                    {/* Chart area */}
                    <div className="md:col-span-3 bg-[var(--color-surface-2)] rounded-xl p-4 border border-[var(--color-border)]">
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-xs font-semibold text-[var(--color-text-primary)]">Spending trend</p>
                        <span className="text-[9px] px-2 py-0.5 rounded-md bg-[var(--color-surface-3)] text-[var(--color-text-muted)] font-medium">6 months</span>
                      </div>
                      <svg className="w-full" viewBox="0 0 400 120" fill="none">
                        {/* Grid */}
                        <line x1="0" y1="30" x2="400" y2="30" stroke="var(--color-border)" strokeDasharray="4" />
                        <line x1="0" y1="60" x2="400" y2="60" stroke="var(--color-border)" strokeDasharray="4" />
                        <line x1="0" y1="90" x2="400" y2="90" stroke="var(--color-border)" strokeDasharray="4" />
                        {/* Income line */}
                        <path d="M 0 80 C 40 70, 80 50, 120 55 S 200 35, 260 30 S 340 20, 400 15" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" />
                        {/* Expense line */}
                        <path d="M 0 95 C 40 90, 80 85, 120 88 S 200 75, 260 70 S 340 65, 400 60" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
                        {/* Area fill for income */}
                        <path d="M 0 80 C 40 70, 80 50, 120 55 S 200 35, 260 30 S 340 20, 400 15 L 400 120 L 0 120 Z" fill="url(#incomeGrad)" />
                        <defs>
                          <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#10B981" stopOpacity="0.15" />
                            <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="flex justify-between text-[9px] text-[var(--color-text-muted)] mt-1 px-1">
                        <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
                      </div>
                    </div>

                    {/* Budget bars */}
                    <div className="md:col-span-2 bg-[var(--color-surface-2)] rounded-xl p-4 border border-[var(--color-border)]">
                      <p className="text-xs font-semibold text-[var(--color-text-primary)] mb-3">Budgets</p>
                      {[
                        { cat: 'Food & Dining', used: 62, color: 'bg-signal' },
                        { cat: 'Shopping', used: 45, color: 'bg-accent' },
                        { cat: 'Bills', used: 88, color: 'bg-warning' },
                        { cat: 'Travel', used: 25, color: 'bg-accent' },
                      ].map(({ cat, used, color }) => (
                        <div key={cat} className="mb-2.5 last:mb-0">
                          <div className="flex items-center justify-between text-[10px] mb-1">
                            <span className="text-[var(--color-text-secondary)] font-medium">{cat}</span>
                            <span className="text-[var(--color-text-muted)]">{used}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-[var(--color-surface-3)] rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${color}`} style={{ width: `${used}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Metrics strip ──────────────────────────────── */}
        <section className="border-y border-[var(--color-border)] bg-[var(--color-surface)]">
          <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '30s', label: 'Setup time', icon: <Zap size={16} /> },
              { number: '100%', label: 'Free & open-source', icon: <Github size={16} /> },
              { number: '₹0', label: 'Cost, forever', icon: <Wallet size={16} /> },
              { number: '24/7', label: 'Your data, your control', icon: <Shield size={16} /> },
            ].map(({ number, label, icon }) => (
              <div key={label} className="text-center">
                <div className="w-9 h-9 rounded-xl bg-[var(--color-surface-3)] flex items-center justify-center mx-auto mb-2.5 text-[var(--color-text-muted)]">
                  {icon}
                </div>
                <p className="text-xl sm:text-2xl font-bold text-[var(--color-text-primary)]">{number}</p>
                <p className="text-xs text-[var(--color-text-muted)] mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Features ───────────────────────────────────── */}
        <section className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center mb-14">
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--color-text-primary)] mb-3">
              Everything you need to manage money
            </h2>
            <p className="text-sm text-[var(--color-text-muted)] max-w-md mx-auto">
              Simple tools that give you clarity on every financial decision.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                icon: <Wallet size={20} />,
                title: 'Track transactions',
                desc: 'Log income and expenses with categories. See your complete financial history in one place.',
                accent: 'bg-emerald-50 dark:bg-emerald-950/20 text-signal',
              },
              {
                icon: <PieChart size={20} />,
                title: 'Set monthly budgets',
                desc: 'Create spending limits for food, transport, shopping, and more. Know exactly when you\'re close to the line.',
                accent: 'bg-indigo-50 dark:bg-indigo-950/20 text-accent',
              },
              {
                icon: <TrendingUp size={20} />,
                title: 'Visualise trends',
                desc: 'Interactive charts show your income vs expenses over time. Spot patterns and improve your savings rate.',
                accent: 'bg-amber-50 dark:bg-amber-950/20 text-warning',
              },
            ].map(({ icon, title, desc, accent }) => (
              <div
                key={title}
                className="
                  bg-[var(--color-surface)] border border-[var(--color-border)]
                  rounded-2xl p-6 hover:border-[var(--color-border-strong)]
                  transition-all group
                "
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${accent}`}>
                  {icon}
                </div>
                <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-2">{title}</h3>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── How it works ───────────────────────────────── */}
        <section className="border-t border-[var(--color-border)] bg-[var(--color-surface)]">
          <div className="max-w-6xl mx-auto px-6 py-20">
            <div className="text-center mb-14">
              <h2 className="text-2xl sm:text-3xl font-bold text-[var(--color-text-primary)] mb-3">
                Up and running in 3 steps
              </h2>
              <p className="text-sm text-[var(--color-text-muted)] max-w-md mx-auto">
                No configuration, no bank linking. Just sign up and start.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {[
                { step: '01', title: 'Create your account', desc: 'Sign up with email in under 30 seconds. No credit card, no bank credentials needed.' },
                { step: '02', title: 'Add your first transaction', desc: 'Log an income or expense, pick a category, and you\'re tracking. Takes 5 seconds.' },
                { step: '03', title: 'Watch your dashboard come alive', desc: 'Charts, budget bars, and savings rate update automatically as you add data.' },
              ].map(({ step, title, desc }) => (
                <div key={step}>
                  <span className="text-3xl font-bold text-[var(--color-border-strong)] dark:text-[var(--color-surface-3)] mb-3 block font-serif-display">{step}</span>
                  <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-2">{title}</h3>
                  <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Final CTA ──────────────────────────────────── */}
        <section className="border-t border-[var(--color-border)]">
          <div className="max-w-6xl mx-auto px-6 py-24 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--color-text-primary)] mb-3">
              Take control of your money
            </h2>
            <p className="text-sm text-[var(--color-text-muted)] mb-8 max-w-sm mx-auto">
              Join and start tracking — it takes less than a minute.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/login"
                state={{ mode: 'sign-up' }}
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-accent text-white hover:bg-accent-dark transition-colors shadow-lg shadow-accent/20"
              >
                Create free account <ArrowRight size={15} />
              </Link>
              <button
                onClick={handleTryDemo}
                disabled={demoLoading}
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-3)] transition-colors disabled:opacity-50 cursor-pointer"
              >
                {demoLoading ? 'Loading…' : 'Try demo first'}
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ─────────────────────────────────────── */}
      <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <img src="./logo.png" alt="" className="w-4 h-4 opacity-50" />
            <p className="text-xs text-[var(--color-text-muted)]">
              © {new Date().getFullYear()} CashFlowX
            </p>
          </div>
          <div className="flex items-center gap-5">
            <a href="https://github.com/pran-ekaiva006/Personal-Finance-Manager" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors">
              <Github size={13} /> Source
            </a>
            <a href="https://linkedin.com/in/pranjal-kumar-verma" target="_blank" rel="noopener noreferrer" className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors">
              Built by Pranjal
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
