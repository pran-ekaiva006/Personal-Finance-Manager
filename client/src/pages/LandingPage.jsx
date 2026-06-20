import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../contexts/AppProvider';
import { ArrowRight, Sun, Moon, Github, TrendingUp, ShieldCheck, BarChart3 } from 'lucide-react';
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

      {/* ── Header ─────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-surface)]/80 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img src="./logo.png" alt="CashFlowX" className="w-6 h-6" />
            <span className="text-sm font-bold tracking-tight text-[var(--color-text-primary)]">
              CashFlowX
            </span>
          </div>

          {/* Nav */}
          <div className="flex items-center gap-2">
            {/* Dark mode toggle */}
            <button
              onClick={toggle}
              aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
              className="
                w-8 h-8 flex items-center justify-center rounded-lg
                text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]
                hover:bg-[var(--color-surface-3)]
                border border-[var(--color-border)]
                cursor-pointer transition-colors
              "
            >
              {dark ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            <Link
              to="/login"
              className="
                h-8 px-3 flex items-center text-xs font-medium
                text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]
                transition-colors rounded-lg hover:bg-[var(--color-surface-3)]
              "
            >
              Sign in
            </Link>

            <Link
              to="/login"
              state={{ mode: 'sign-up' }}
              className="
                h-8 px-3.5 flex items-center text-xs font-semibold
                bg-[var(--color-text-primary)] text-[var(--color-surface)]
                rounded-lg hover:opacity-90 transition-opacity
              "
            >
              Get started
            </Link>
          </div>
        </div>
      </header>

      {/* ── Hero ───────────────────────────────────────── */}
      <main className="flex-1">
        <section className="max-w-5xl mx-auto px-6 pt-24 pb-20 text-center">

          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-[10px] font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-signal inline-block" />
            Personal Finance
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-[56px] font-bold tracking-tight text-[var(--color-text-primary)] leading-[1.1] mb-5 max-w-3xl mx-auto">
            Know exactly where<br />
            <span className="text-[var(--color-text-muted)]">your money goes.</span>
          </h1>

          {/* Sub-headline */}
          <p className="text-base text-[var(--color-text-muted)] max-w-lg mx-auto mb-10 leading-relaxed">
            Track income and expenses, set monthly budgets, and visualise your financial health — all in one clean dashboard.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16">
            <Link
              to="/login"
              state={{ mode: 'sign-up' }}
              className="
                flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold
                bg-[var(--color-text-primary)] text-[var(--color-surface)]
                hover:opacity-90 transition-opacity
              "
            >
              Start for free <ArrowRight size={15} />
            </Link>
            <button
              onClick={handleTryDemo}
              disabled={demoLoading}
              className="
                flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium
                border border-[var(--color-border)] bg-[var(--color-surface)]
                text-[var(--color-text-secondary)]
                hover:bg-[var(--color-surface-3)] transition-colors
                disabled:opacity-50 cursor-pointer
              "
            >
              {demoLoading ? 'Loading demo…' : 'Try live demo'}
            </button>
          </div>

          {/* Stats strip */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
            {[
              { value: 'Free', label: 'No credit card' },
              { value: '100%', label: 'Open source' },
              { value: 'Real-time', label: 'Budget tracking' },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="text-sm font-bold text-[var(--color-text-primary)]">{value}</p>
                <p className="text-xs text-[var(--color-text-muted)] mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Feature List ──────────────────────────────── */}
        <section className="border-t border-[var(--color-border)] bg-[var(--color-surface)]">
          <div className="max-w-5xl mx-auto px-6 py-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

              <div className="space-y-3">
                <div className="w-9 h-9 rounded-xl bg-[var(--color-surface-3)] flex items-center justify-center">
                  <BarChart3 size={18} className="text-[var(--color-text-secondary)]" />
                </div>
                <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">
                  Visual dashboard
                </h3>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                  See income vs expenses on a monthly chart. Understand trends at a glance without digging through spreadsheets.
                </p>
              </div>

              <div className="space-y-3">
                <div className="w-9 h-9 rounded-xl bg-[var(--color-surface-3)] flex items-center justify-center">
                  <ShieldCheck size={18} className="text-[var(--color-text-secondary)]" />
                </div>
                <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">
                  Budget limits
                </h3>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                  Set monthly spending limits per category. Get a clear view of what's left before you overspend.
                </p>
              </div>

              <div className="space-y-3">
                <div className="w-9 h-9 rounded-xl bg-[var(--color-surface-3)] flex items-center justify-center">
                  <TrendingUp size={18} className="text-[var(--color-text-secondary)]" />
                </div>
                <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">
                  Savings rate
                </h3>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                  Track your savings rate every month. Build better habits by knowing exactly how much you're keeping.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* ── CTA Strip ──────────────────────────────────── */}
        <section className="border-t border-[var(--color-border)]">
          <div className="max-w-5xl mx-auto px-6 py-20 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--color-text-primary)] mb-3">
              Start tracking today
            </h2>
            <p className="text-sm text-[var(--color-text-muted)] mb-8 max-w-sm mx-auto">
              Free to use, no setup required. Sign up and add your first transaction in under a minute.
            </p>
            <Link
              to="/login"
              state={{ mode: 'sign-up' }}
              className="
                inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold
                bg-[var(--color-text-primary)] text-[var(--color-surface)]
                hover:opacity-90 transition-opacity
              "
            >
              Create free account <ArrowRight size={15} />
            </Link>
          </div>
        </section>
      </main>

      {/* ── Footer ─────────────────────────────────────── */}
      <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="max-w-5xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[var(--color-text-muted)]">
            © {new Date().getFullYear()} CashFlowX. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <a
              href="https://github.com/pran-ekaiva006/Personal-Finance-Manager"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
            >
              <Github size={14} /> GitHub
            </a>
            <a
              href="https://linkedin.com/in/pranjal-kumar-verma"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
            >
              Portfolio
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
