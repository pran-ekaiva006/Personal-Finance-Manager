import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../contexts/AppProvider';
import { 
  ArrowRight, Sun, Moon, Github, Check, Shield, Zap, 
  BarChart3, PieChart, ArrowUpRight, Lock, FileSpreadsheet,
  TrendingUp, Sparkles, AlertTriangle
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
    <div className="min-h-screen flex flex-col bg-[var(--color-surface)] text-[var(--color-text-primary)] antialiased font-sans selection:bg-accent/20 selection:text-accent">

      {/* ── Header ──────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-surface)]/80 backdrop-blur-md transition-all duration-300">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:bg-accent/20">
              <img src="./logo.png" alt="CashFlowX Logo" className="w-5 h-5 object-contain" />
            </div>
            <span className="text-base font-bold tracking-tight text-[var(--color-text-primary)] group-hover:text-accent transition-colors">
              CashFlowX
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold tracking-wide text-[var(--color-text-muted)]">
            <a href="#features" className="hover:text-[var(--color-text-primary)] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-accent after:transition-all hover:after:w-full">Features</a>
            <a href="#how" className="hover:text-[var(--color-text-primary)] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-accent after:transition-all hover:after:w-full">How it works</a>
            <a 
              href="https://github.com/pran-ekaiva006/Personal-Finance-Manager" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-1 hover:text-[var(--color-text-primary)] transition-colors"
            >
              GitHub <ArrowUpRight size={13} className="opacity-60" />
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={toggle}
              aria-label={dark ? 'Light mode' : 'Dark mode'}
              className="w-9 h-9 flex items-center justify-center rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-2)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-border-strong)] transition-all cursor-pointer shadow-sm hover:scale-102"
            >
              {dark ? <Sun size={15} /> : <Moon size={15} />}
            </button>
            
            <Link 
              to="/login" 
              className="hidden sm:flex h-9 px-4 items-center text-xs font-semibold text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
            >
              Sign in
            </Link>

            <Link
              to="/login"
              state={{ mode: 'sign-up' }}
              className="h-9 px-4 flex items-center text-xs font-bold bg-accent text-white rounded-xl hover:bg-accent-dark hover:shadow-lg hover:shadow-accent/15 transition-all duration-200 cursor-pointer active:scale-98"
            >
              Get started
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">

        {/* ── Hero Section ────────────────────────────────── */}
        <section className="relative overflow-hidden pt-20 sm:pt-28 pb-12">
          {/* Accent glow elements */}
          <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[70vw] h-[400px] rounded-full opacity-[0.08] blur-[130px] pointer-events-none bg-accent" />
          <div className="absolute top-[20%] left-[10%] w-[300px] h-[300px] rounded-full opacity-[0.04] blur-[100px] pointer-events-none bg-indigo-500" />
          
          <div className="relative max-w-6xl mx-auto px-6 text-center">
            {/* Elegant Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[var(--color-border-strong)] bg-[var(--color-surface-2)] text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-secondary)] mb-6 shadow-sm">
              <Sparkles size={11} className="text-accent" />
              <span>100% Free & Open Source</span>
            </div>

            <h1 className="text-[40px] sm:text-[60px] md:text-[76px] font-extrabold tracking-[-0.04em] leading-[1.02] mb-6 max-w-4xl mx-auto text-[var(--color-text-primary)]">
              Your money.<br />
              <span className="bg-gradient-to-r from-accent to-indigo-400 bg-clip-text text-transparent">
                Crisp & clear.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-[var(--color-text-muted)] max-w-lg mx-auto mb-10 leading-relaxed font-medium">
              Track every rupee, construct budget guardrails, and visualize your financial trend without connecting bank accounts. Pure privacy, absolute clarity.
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-16">
              <Link
                to="/login"
                state={{ mode: 'sign-up' }}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-xs font-bold bg-accent text-white hover:bg-accent-dark transition-all shadow-md shadow-accent/25 hover:scale-102 hover:shadow-lg active:scale-98 cursor-pointer"
              >
                Create free account <ArrowRight size={14} />
              </Link>
              <button
                onClick={handleTryDemo}
                disabled={demoLoading}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-xs font-semibold border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-2)] hover:border-[var(--color-border-strong)] transition-all disabled:opacity-50 cursor-pointer shadow-sm hover:scale-102 active:scale-98"
              >
                {demoLoading ? 'Launching demo…' : 'Try live demo'}
              </button>
            </div>
          </div>

          {/* ── Browser Mockup Screenshot ──────────────────── */}
          <div className="relative max-w-5xl mx-auto px-6 pb-20">
            {/* Ambient shadow/glow behind the mockup */}
            <div className="absolute inset-x-20 top-10 bottom-24 bg-accent/5 rounded-3xl blur-3xl -z-10 pointer-events-none" />

            <div className="
              relative rounded-2xl overflow-hidden
              border border-[var(--color-border-strong)] bg-[var(--color-surface)]
              shadow-[0_24px_80px_-15px_rgba(0,0,0,0.18)]
              dark:shadow-[0_24px_80px_-15px_rgba(0,0,0,0.6)]
              transition-all duration-300
            ">
              {/* Browser Window Header Chrome */}
              <div className="h-10 bg-[var(--color-surface-2)] border-b border-[var(--color-border)] px-4 flex items-center justify-between select-none">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-clay opacity-80" />
                  <div className="w-3 h-3 rounded-full bg-warning opacity-80" />
                  <div className="w-3 h-3 rounded-full bg-signal opacity-80" />
                </div>
                <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-md px-16 py-0.5 text-[10px] text-[var(--color-text-muted)] font-medium font-mono truncate max-w-xs">
                  cashflowx.app/dashboard
                </div>
                <div className="w-12" /> {/* spacer */}
              </div>

              {/* Responsive Image display */}
              <div className="relative">
                <img
                  src={dark ? './dashboard-dark.png' : './dashboard-light.png'}
                  alt="CashFlowX Real Dashboard overview displaying balance summary, monthly stats, and expense analytics"
                  className="w-full h-auto block"
                  loading="eager"
                  onError={(e) => {
                    // Fallback placeholder with helpful warning if user hasn't saved screenshots yet
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                
                {/* Fallback Display if screenshots are not yet created by the user */}
                <div className="hidden absolute inset-0 bg-[var(--color-surface-2)] flex-col items-center justify-center p-12 text-center" style={{ minHeight: '360px' }}>
                  <AlertTriangle size={36} className="text-warning mb-3" />
                  <h3 className="text-sm font-bold mb-1 text-[var(--color-text-primary)]">Ready for your real dashboard screenshot</h3>
                  <p className="text-xs text-[var(--color-text-muted)] max-w-md">
                    Please take a screenshot of your logged-in dashboard and save it to the public directory as <strong>public/dashboard-dark.png</strong> (and light mode as <strong>public/dashboard-light.png</strong>) to render your authentic application UI here.
                  </p>
                </div>

                {/* Smooth bottom overlay shadow fade */}
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[var(--color-surface)] to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </section>

        {/* ── Technology Strip ───────────────────────────── */}
        <section className="border-y border-[var(--color-border)] bg-[var(--color-surface-2)]">
          <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <span className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-wider">
              Built on modern stack
            </span>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2.5 text-xs font-semibold text-[var(--color-text-muted)]">
              {['React', 'PostgreSQL', 'Express', 'Sequelize', 'Tailwind v4', 'Recharts'].map(tech => (
                <div key={tech} className="flex items-center gap-2 hover:text-[var(--color-text-primary)] transition-colors cursor-default">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                  <span>{tech}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Bento Grid Features ─────────────────────────── */}
        <section id="features" className="max-w-6xl mx-auto px-6 py-24">
          <div className="text-center md:text-left mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-accent/15 bg-accent/5 text-[10px] font-bold uppercase tracking-wider text-accent mb-4">
              <Zap size={11} />
              <span>Core Features</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              Designed for financial awareness
            </h2>
            <p className="text-sm text-[var(--color-text-muted)] max-w-xl leading-relaxed">
              No endless notification spam, no buggy integrations. Just clean, highly robust interfaces to help you manage your funds mindfully.
            </p>
          </div>

          {/* Bento Box Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Box 1 (Col Span 2): Interactive Trend Showcase */}
            <div className="md:col-span-2 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 shadow-sm flex flex-col justify-between overflow-hidden relative group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
              <div>
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-6">
                  <BarChart3 size={20} />
                </div>
                <h3 className="text-lg font-bold mb-2">Trend Analysis</h3>
                <p className="text-xs text-[var(--color-text-muted)] max-w-sm mb-6 leading-relaxed">
                  Automatically tracks income versus spending balances across 12 months with smooth line charts so you understand seasonal expenses instantly.
                </p>
              </div>

              {/* Inline SVG Chart Mockup */}
              <div className="w-full h-32 pt-2 border-t border-[var(--color-border)] relative">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 400 100" preserveAspectRatio="none">
                  {/* Grid Lines */}
                  <line x1="0" y1="20" x2="400" y2="20" stroke="var(--color-border)" strokeDasharray="3 3" strokeWidth="1" />
                  <line x1="0" y1="60" x2="400" y2="60" stroke="var(--color-border)" strokeDasharray="3 3" strokeWidth="1" />
                  
                  {/* Income Line (Emerald) */}
                  <path 
                    d="M0,80 Q50,40 100,50 T200,20 T300,30 T400,10" 
                    fill="none" 
                    stroke="var(--color-signal)" 
                    strokeWidth="3" 
                    className="transition-all duration-500 group-hover:stroke-[4px]"
                  />
                  {/* Expense Line (Red/Clay) */}
                  <path 
                    d="M0,90 Q50,70 100,80 T200,60 T300,85 T400,45" 
                    fill="none" 
                    stroke="var(--color-clay)" 
                    strokeWidth="2.5" 
                    strokeDasharray="2"
                    className="transition-all duration-500 group-hover:stroke-[3px]"
                  />
                </svg>
                <div className="absolute top-2 right-2 flex gap-4 text-[9px] font-mono text-[var(--color-text-muted)]">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-0.5 bg-signal inline-block" /> Income
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-0.5 bg-clay inline-block" /> Expenses
                  </span>
                </div>
              </div>
            </div>

            {/* Box 2 (Col Span 1): Zero Bank Sync */}
            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 shadow-sm flex flex-col justify-between group">
              <div>
                <div className="w-10 h-10 rounded-xl bg-signal/10 flex items-center justify-center text-signal mb-6">
                  <Lock size={18} />
                </div>
                <h3 className="text-lg font-bold mb-2">Absolute Privacy</h3>
                <p className="text-xs text-[var(--color-text-muted)] leading-relaxed mb-6">
                  We believe personal finance data is strictly private. Since we have no automatic bank credentials linking, your account passwords and transaction feeds are completely secure from third-party server leaks.
                </p>
              </div>
              <div className="border-t border-[var(--color-border)] pt-4 flex items-center justify-between text-xs font-semibold text-[var(--color-text-secondary)]">
                <span>Self-hosted or hosted</span>
                <span className="text-[10px] bg-signal/10 text-signal px-2 py-0.5 rounded-full font-mono font-bold">Secure</span>
              </div>
            </div>

            {/* Box 3 (Col Span 1): Category limits */}
            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 shadow-sm flex flex-col justify-between group">
              <div>
                <div className="w-10 h-10 rounded-xl bg-warning/10 flex items-center justify-center text-warning mb-6">
                  <PieChart size={18} />
                </div>
                <h3 className="text-lg font-bold mb-2">Category Limits</h3>
                <p className="text-xs text-[var(--color-text-muted)] leading-relaxed mb-6">
                  Define distinct spending limits for Groceries, Leisure, Rent, and Utilities. Instantly identify category overspending with visual warnings.
                </p>
              </div>
              
              {/* Category mini-item preview */}
              <div className="space-y-3.5 border-t border-[var(--color-border)] pt-5">
                <div>
                  <div className="flex justify-between text-[10px] font-bold text-[var(--color-text-secondary)] mb-1">
                    <span>Dining Out</span>
                    <span className="text-clay">105% (Limit exceeded)</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-[var(--color-surface-3)] overflow-hidden">
                    <div className="h-full bg-clay rounded-full" style={{ width: '100%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[10px] font-bold text-[var(--color-text-secondary)] mb-1">
                    <span>Groceries</span>
                    <span className="text-signal">68%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-[var(--color-surface-3)] overflow-hidden">
                    <div className="h-full bg-signal rounded-full" style={{ width: '68%' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Box 4 (Col Span 2): Data Sovereignty */}
            <div className="md:col-span-2 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 shadow-sm flex flex-col justify-between overflow-hidden relative group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
              <div>
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 mb-6">
                  <FileSpreadsheet size={18} />
                </div>
                <h3 className="text-lg font-bold mb-2">Export Anywhere</h3>
                <p className="text-xs text-[var(--color-text-muted)] max-w-md mb-6 leading-relaxed">
                  Your budget data is yours. Export transaction histories cleanly into spreadsheet-ready CSV tables in one single click, with no platform lock-in.
                </p>
              </div>

              {/* Table Data Preview */}
              <div className="border-t border-[var(--color-border)] pt-4 overflow-hidden select-none">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[var(--color-border)] text-[9px] font-bold text-[var(--color-text-muted)] tracking-wider uppercase">
                      <th className="pb-2">Date</th>
                      <th className="pb-2">Category</th>
                      <th className="pb-2">Details</th>
                      <th className="pb-2 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="text-[10px] font-medium text-[var(--color-text-secondary)]">
                    <tr className="border-b border-[var(--color-border)]/50">
                      <td className="py-2.5">20 Jun 2026</td>
                      <td className="py-2.5"><span className="px-1.5 py-0.5 rounded bg-[var(--color-surface-3)] text-[9px] font-semibold text-[var(--color-text-secondary)]">Groceries</span></td>
                      <td className="py-2.5 text-[var(--color-text-muted)]">Weekly shopping</td>
                      <td className="py-2.5 text-right font-semibold text-clay">-₹2,450</td>
                    </tr>
                    <tr>
                      <td className="py-2.5">18 Jun 2026</td>
                      <td className="py-2.5"><span className="px-1.5 py-0.5 rounded bg-signal/10 text-[9px] font-semibold text-signal">Freelance</span></td>
                      <td className="py-2.5 text-[var(--color-text-muted)]">Landing UI client payment</td>
                      <td className="py-2.5 text-right font-semibold text-signal">+₹45,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </section>

        {/* ── Mindfulness Segment (Why Manual Tracking) ────── */}
        <section className="border-t border-[var(--color-border)] bg-[var(--color-surface-2)]">
          <div className="max-w-6xl mx-auto px-6 py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-indigo-500/15 bg-indigo-500/5 text-[10px] font-bold uppercase tracking-wider text-indigo-500 mb-4">
                  <TrendingUp size={11} />
                  <span>The Manual Mindset</span>
                </div>
                <h2 className="text-3xl font-extrabold tracking-tight mb-5 leading-tight text-[var(--color-text-primary)]">
                  Connecting bank accounts makes you passive
                </h2>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-6">
                  Automated sync applications let you swipe cards blindly and show reports weeks later. By manually logging expenses, you trigger active feedback during checkout, leading to healthier financial choices naturally.
                </p>

                <div className="space-y-4">
                  {[
                    'Instant logging via standard mobile web interface',
                    'Zero latency, no waiting for bank API updates',
                    'Maintains absolute control over transactional tags',
                    'Prevents security exposures to aggregators'
                  ].map((benefit) => (
                    <div key={benefit} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-signal/15 flex items-center justify-center shrink-0">
                        <Check size={12} className="text-signal" />
                      </div>
                      <span className="text-xs font-semibold text-[var(--color-text-secondary)]">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Graphic container */}
              <div className="
                rounded-2xl border border-[var(--color-border-strong)] bg-[var(--color-surface)] p-8
                shadow-[0_8px_30px_rgb(0,0,0,0.03)]
                flex flex-col gap-6 relative overflow-hidden
              ">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-2xl" />
                <h3 className="text-sm font-bold text-[var(--color-text-primary)]">Conscious Spending Framework</h3>
                
                <div className="flex gap-4 items-stretch">
                  <div className="w-1 bg-accent/25 rounded" />
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-xs font-bold text-[var(--color-text-primary)] mb-1">01. Log the Purchase</h4>
                      <p className="text-[11px] text-[var(--color-text-muted)] leading-relaxed">
                        Spend 3 seconds logging details immediately after buying. This anchors the financial reality of the trade.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[var(--color-text-primary)] mb-1">02. Inspect the Limits</h4>
                      <p className="text-[11px] text-[var(--color-text-muted)] leading-relaxed">
                        Instantly see where your remaining monthly budget pool stands for the category.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[var(--color-text-primary)] mb-1">03. Correct Next Action</h4>
                      <p className="text-[11px] text-[var(--color-text-muted)] leading-relaxed">
                        Adjust spending pace dynamically before you reach budget exhaustion.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── How It Works ───────────────────────────────── */}
        <section id="how" className="border-t border-[var(--color-border)]">
          <div className="max-w-6xl mx-auto px-6 py-24">
            <div className="text-center mb-16">
              <span className="text-[10px] font-bold text-accent uppercase tracking-wider">Workflow</span>
              <h2 className="text-3xl font-extrabold tracking-tight mt-2">
                Get started in 3 simple steps
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  num: '01',
                  title: 'Create Account',
                  desc: 'Sign up securely in 30 seconds. Absolutely no complex bank API configurations required.'
                },
                {
                  num: '02',
                  title: 'Input Monthly Budgets',
                  desc: 'Define custom thresholds for categories like Housing, Subscriptions, and Grocery lists.'
                },
                {
                  num: '03',
                  title: 'Log & Track',
                  desc: 'Input daily transactions manually. View analytics updates instantly inside your interactive overview.'
                }
              ].map(({ num, title, desc }) => (
                <div key={num} className="group flex flex-col justify-between p-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-border-strong)] transition-all shadow-sm">
                  <div>
                    <span className="font-mono text-3xl font-extrabold text-accent/20 group-hover:text-accent/40 transition-colors block mb-4">
                      {num}
                    </span>
                    <h3 className="text-sm font-bold text-[var(--color-text-primary)] mb-2">{title}</h3>
                    <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Final Glassmorphic CTA Box ──────────────────── */}
        <section className="border-t border-[var(--color-border)] relative overflow-hidden bg-[var(--color-surface-2)]">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-5xl mx-auto px-6 py-24">
            <div className="
              relative rounded-3xl overflow-hidden border border-[var(--color-border-strong)] bg-[var(--color-surface)] px-8 py-16 text-center shadow-xl
              dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)]
            ">
              <h2 className="text-3xl font-extrabold tracking-tight mb-4">
                Take control of your spending today
              </h2>
              <p className="text-sm text-[var(--color-text-muted)] mb-8 max-w-md mx-auto leading-relaxed">
                Join the demo or register for a free account. No credit cards, no spam. Just honest, deliberate budgeting tools.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-sm mx-auto">
                <Link
                  to="/login"
                  state={{ mode: 'sign-up' }}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-xs font-bold bg-accent text-white hover:bg-accent-dark transition-all hover:scale-102 active:scale-98 shadow-sm"
                >
                  Register free account <ArrowRight size={14} />
                </Link>
                <button
                  onClick={handleTryDemo}
                  disabled={demoLoading}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-xs font-semibold border border-[var(--color-border)] bg-[var(--color-surface-2)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-3)] transition-all hover:scale-102 active:scale-98 shadow-sm"
                >
                  {demoLoading ? 'Launching…' : 'Try live demo'}
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ─────────────────────────────────────── */}
      <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-muted)] text-xs transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src="./logo.png" alt="CashFlowX Logo" className="w-5 h-5 opacity-40 object-contain" />
            <p>© {new Date().getFullYear()} CashFlowX. Open source financial stewardship.</p>
          </div>
          <div className="flex items-center gap-6">
            <a 
              href="https://github.com/pran-ekaiva006/Personal-Finance-Manager" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-1 hover:text-[var(--color-text-primary)] transition-colors"
            >
              <Github size={14} /> Source
            </a>
            <a 
              href="https://linkedin.com/in/pranjal-kumar-verma" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-[var(--color-text-primary)] transition-colors"
            >
              Built by Pranjal
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
