import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../contexts/AppProvider';
import { 
  ArrowRight, Sun, Moon, Check, Shield, Zap, 
  BarChart3, PieChart, Lock, FileSpreadsheet,
  TrendingUp, Sparkles, Layout, Wallet, ArrowUpRight
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
    const toastId = toast.loading('Connecting to secure demo environment…');
    try {
      await login({ email: 'demo@cashflowx.app', password: 'demoPassword123' });
      toast.success('Welcome to CashFlowX!', { id: toastId });
    } catch {
      toast.error('Demo authentication failed.', { id: toastId });
    } finally {
      setDemoLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-surface-2)] text-[var(--color-text-primary)] antialiased font-sans transition-colors duration-300">

      {/* ── Header ──────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-surface)]/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8.5 h-8.5 rounded-xl bg-accent/10 flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:bg-accent/20">
              <img src="./logo.png" alt="CashFlowX Logo" className="w-5.5 h-5.5 object-contain" />
            </div>
            <span className="text-base font-bold tracking-tight text-[var(--color-text-primary)]">
              CashFlowX
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-[11px] font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
            <a href="#features" className="hover:text-[var(--color-text-primary)] transition-colors">Features</a>
            <a href="#how" className="hover:text-[var(--color-text-primary)] transition-colors">Workflow</a>
            <a href="#security" className="hover:text-[var(--color-text-primary)] transition-colors">Security</a>
            <span className="text-[var(--color-border-strong)]">|</span>
            <span className="text-[9px] bg-accent/10 text-accent font-bold px-2 py-0.5 rounded-full uppercase">v2.4 Stable</span>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={toggle}
              aria-label={dark ? 'Light mode' : 'Dark mode'}
              className="w-9 h-9 flex items-center justify-center rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-border-strong)] transition-all cursor-pointer shadow-sm hover:scale-102 active:scale-98"
            >
              {dark ? <Sun size={15} /> : <Moon size={15} />}
            </button>
            
            <Link 
              to="/login" 
              className="hidden sm:flex h-9 px-4 items-center text-xs font-bold text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
            >
              Sign in
            </Link>

            <Link
              to="/login"
              state={{ mode: 'sign-up' }}
              className="h-9 px-4 flex items-center text-xs font-bold bg-accent text-white rounded-xl hover:bg-accent-dark hover:shadow-md hover:shadow-accent/15 transition-all duration-200 cursor-pointer active:scale-98"
            >
              Get started
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">

        {/* ── Hero Section ────────────────────────────────── */}
        <section className="relative pt-24 sm:pt-32 pb-16">
          {/* Subtle warm glow background matching the Gitso inspiration style */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90vw] h-[400px] rounded-full opacity-[0.06] blur-[120px] pointer-events-none bg-accent" />
          <div className="absolute top-[20%] left-[15%] w-[250px] h-[250px] rounded-full opacity-[0.03] blur-[90px] pointer-events-none bg-indigo-500" />
          
          <div className="relative max-w-6xl mx-auto px-6 text-center">
            {/* Minimal Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[var(--color-border-strong)] bg-[var(--color-surface)] text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-secondary)] mb-6 shadow-sm">
              <Sparkles size={11} className="text-accent" />
              <span>Private Personal Finance Ecosystem</span>
            </div>

            {/* Resolved text-clipping line height bug */}
            <h1 className="text-[38px] sm:text-[56px] md:text-[72px] font-extrabold tracking-[-0.04em] leading-[1.12] mb-6 max-w-4xl mx-auto text-[var(--color-text-primary)]">
              Your money.<br />
              <span className="bg-gradient-to-r from-accent to-indigo-500 bg-clip-text text-transparent">
                In absolute clarity.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-[var(--color-text-muted)] max-w-lg mx-auto mb-10 leading-relaxed font-medium">
              A private workspace to track funds, monitor budgets, and gain precise financial insights. Zero bank-sync connections, zero data tracking.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-16">
              <Link
                to="/login"
                state={{ mode: 'sign-up' }}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-xs font-bold bg-accent text-white hover:bg-accent-dark transition-all shadow-md shadow-accent/20 hover:scale-102 hover:shadow-lg active:scale-98 cursor-pointer"
              >
                Create secure account <ArrowRight size={14} />
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

          {/* ── High-Fidelity CSS Mock Dashboard Preview ────── */}
          <div className="relative max-w-5xl mx-auto px-6 pb-20">
            <div className="absolute inset-x-20 top-10 bottom-24 bg-accent/5 rounded-3xl blur-3xl -z-10 pointer-events-none" />

            <div className="
              relative rounded-2xl overflow-hidden
              border border-[var(--color-border-strong)] bg-[var(--color-surface)]
              shadow-[0_24px_80px_-15px_rgba(0,0,0,0.12)]
              dark:shadow-[0_24px_80px_-15px_rgba(0,0,0,0.5)]
              transition-all duration-300
            ">
              {/* Mock Browser Title Bar */}
              <div className="h-11 bg-[var(--color-surface-2)] border-b border-[var(--color-border)] px-4 flex items-center justify-between select-none">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-clay opacity-85" />
                  <div className="w-3 h-3 rounded-full bg-warning opacity-85" />
                  <div className="w-3 h-3 rounded-full bg-signal opacity-85" />
                </div>
                <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-md px-14 py-0.5 text-[9px] text-[var(--color-text-muted)] font-bold tracking-wide font-mono truncate max-w-xs">
                  cashflowx.app/dashboard
                </div>
                <div className="w-12" />
              </div>

              {/* Mock Dashboard Body (Fully interactive HTML/CSS matching the app layout) */}
              <div className="p-4 sm:p-6 bg-[var(--color-surface-2)] grid grid-cols-1 md:grid-cols-4 gap-4 text-left select-none">
                
                {/* Sidebar Mock */}
                <div className="hidden md:flex flex-col gap-5 border-r border-[var(--color-border)] pr-4">
                  <div className="flex items-center gap-2 px-1 py-2">
                    <div className="w-6 h-6 rounded-lg bg-accent/15 flex items-center justify-center">
                      <img src="./logo.png" alt="" className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold">CashFlowX</span>
                  </div>
                  
                  <div className="space-y-1">
                    {[
                      { label: 'Overview', icon: Layout, active: true },
                      { label: 'Transactions', icon: FileSpreadsheet, active: false },
                      { label: 'Budgets', icon: Wallet, active: false },
                    ].map((item) => (
                      <div 
                        key={item.label} 
                        className={`flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
                          item.active 
                            ? 'bg-accent/10 text-accent' 
                            : 'text-[var(--color-text-muted)] hover:bg-[var(--color-surface)]'
                        }`}
                      >
                        <item.icon size={12} />
                        <span>{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Main Dashboard Canvas Mock */}
                <div className="md:col-span-3 space-y-4">
                  {/* Top Stats Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    
                    {/* Balance */}
                    <div className="p-4 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl shadow-xs">
                      <span className="text-[8px] font-bold uppercase tracking-wider text-[var(--color-text-muted)]">Total Balance</span>
                      <p className="text-xl font-bold text-signal mt-1 font-serif-display">₹4,52,300.00</p>
                    </div>

                    {/* Income */}
                    <div className="p-4 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl shadow-xs">
                      <span className="text-[8px] font-bold uppercase tracking-wider text-[var(--color-text-muted)]">Monthly Income</span>
                      <p className="text-xl font-bold text-[var(--color-text-primary)] mt-1 font-serif-display">₹85,000.00</p>
                    </div>

                    {/* Expenses */}
                    <div className="p-4 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl shadow-xs">
                      <span className="text-[8px] font-bold uppercase tracking-wider text-[var(--color-text-muted)]">Monthly Expenses</span>
                      <p className="text-xl font-bold text-clay mt-1 font-serif-display">₹32,700.00</p>
                    </div>

                  </div>

                  {/* Main Grid: Graph + Budgets */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    
                    {/* SVG Line Graph */}
                    <div className="p-4 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl shadow-xs">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">Cashflow Trend</span>
                        <span className="text-[8px] font-mono text-[var(--color-text-muted)]">Last 6 Months</span>
                      </div>
                      <div className="h-28 w-full pt-1">
                        <svg className="w-full h-full" viewBox="0 0 200 80" preserveAspectRatio="none">
                          <path d="M0,70 L40,55 L80,60 L120,40 L160,35 L200,25" fill="none" stroke="var(--color-signal)" strokeWidth="2.5" />
                          <path d="M0,75 L40,65 L80,50 L120,55 L160,45 L200,48" fill="none" stroke="var(--color-clay)" strokeWidth="2" strokeDasharray="2" />
                          <line x1="0" y1="78" x2="200" y2="78" stroke="var(--color-border)" strokeWidth="1" />
                        </svg>
                      </div>
                    </div>

                    {/* Category Budgets */}
                    <div className="p-4 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl shadow-xs space-y-3">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-[var(--color-text-secondary)] block">Budgets Overview</span>
                      
                      <div className="space-y-2">
                        <div>
                          <div className="flex justify-between text-[8px] font-bold text-[var(--color-text-secondary)] mb-1">
                            <span>Groceries</span>
                            <span>83%</span>
                          </div>
                          <div className="w-full h-1.5 rounded-full bg-[var(--color-surface-2)] overflow-hidden">
                            <div className="h-full bg-signal rounded-full" style={{ width: '83%' }} />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-[8px] font-bold text-[var(--color-text-secondary)] mb-1">
                            <span>Dining Out</span>
                            <span className="text-clay">164%</span>
                          </div>
                          <div className="w-full h-1.5 rounded-full bg-[var(--color-surface-2)] overflow-hidden">
                            <div className="h-full bg-clay rounded-full" style={{ width: '100%' }} />
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* ── Features Bento Grid ─────────────────────────── */}
        <section id="features" className="max-w-6xl mx-auto px-6 py-24 border-t border-[var(--color-border)]">
          <div className="text-center md:text-left mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-accent/15 bg-accent/5 text-[10px] font-bold uppercase tracking-wider text-accent mb-4">
              <Zap size={11} />
              <span>Engineered Features</span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight mb-4">
              Designed for financial awareness
            </h2>
            <p className="text-sm text-[var(--color-text-muted)] max-w-xl leading-relaxed">
              Clean, structural layouts that emphasize conscious bookkeeping. Zero automated notifications, zero credential linking.
            </p>
          </div>

          {/* Bento Box Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Trend Analysis */}
            <div className="md:col-span-2 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 shadow-sm flex flex-col justify-between overflow-hidden relative group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
              <div>
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-6">
                  <BarChart3 size={20} />
                </div>
                <h3 className="text-base font-bold mb-2">Trend Analysis</h3>
                <p className="text-xs text-[var(--color-text-muted)] max-w-sm mb-6 leading-relaxed">
                  Automatically overlay income and expenses trends on clean charts to identify seasonal spending patterns instantly.
                </p>
              </div>

              {/* Inline SVG Chart */}
              <div className="w-full h-24 pt-2 border-t border-[var(--color-border)] relative">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 400 100" preserveAspectRatio="none">
                  <path d="M0,80 Q50,40 100,50 T200,20 T300,30 T400,10" fill="none" stroke="var(--color-signal)" strokeWidth="3" />
                  <path d="M0,90 Q50,70 100,80 T200,60 T300,85 T400,45" fill="none" stroke="var(--color-clay)" strokeWidth="2" strokeDasharray="2" />
                </svg>
              </div>
            </div>

            {/* Privacy */}
            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 shadow-sm flex flex-col justify-between group">
              <div>
                <div className="w-10 h-10 rounded-xl bg-signal/10 flex items-center justify-center text-signal mb-6">
                  <Lock size={18} />
                </div>
                <h3 className="text-base font-bold mb-2">Absolute Privacy</h3>
                <p className="text-xs text-[var(--color-text-muted)] leading-relaxed mb-6">
                  CashFlowX is entirely disconnected from banking credentials. No credential leaks, no bank feeds breaking, and complete data safety.
                </p>
              </div>
              <div className="border-t border-[var(--color-border)] pt-4 flex items-center justify-between text-xs font-bold text-[var(--color-text-secondary)]">
                <span>Self-hosted capable</span>
                <span className="text-[9px] bg-signal/15 text-signal px-2 py-0.5 rounded-full font-mono">Secure</span>
              </div>
            </div>

            {/* Budgets */}
            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 shadow-sm flex flex-col justify-between group">
              <div>
                <div className="w-10 h-10 rounded-xl bg-warning/10 flex items-center justify-center text-warning mb-6">
                  <PieChart size={18} />
                </div>
                <h3 className="text-base font-bold mb-2">Category Limits</h3>
                <p className="text-xs text-[var(--color-text-muted)] leading-relaxed mb-6">
                  Set limits for rent, groceries, and dining. Receive prompt alerts if category thresholds are crossed.
                </p>
              </div>
              
              <div className="space-y-2 border-t border-[var(--color-border)] pt-5">
                <div>
                  <div className="flex justify-between text-[9px] font-bold text-[var(--color-text-secondary)] mb-1">
                    <span>Leisure</span>
                    <span className="text-clay">164% Limit</span>
                  </div>
                  <div className="w-full h-1 bg-[var(--color-surface-2)] rounded-full overflow-hidden">
                    <div className="h-full bg-clay" style={{ width: '100%' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* CSV Portability */}
            <div className="md:col-span-2 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 shadow-sm flex flex-col justify-between overflow-hidden relative group">
              <div>
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 mb-6">
                  <FileSpreadsheet size={18} />
                </div>
                <h3 className="text-base font-bold mb-2">Export Anywhere</h3>
                <p className="text-xs text-[var(--color-text-muted)] max-w-md mb-6 leading-relaxed">
                  Your data is entirely your own. Export transaction logs into universal CSV spreadsheets instantly. Zero platform lock-in.
                </p>
              </div>

              <div className="border-t border-[var(--color-border)] pt-4 overflow-hidden">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-[var(--color-border)] text-[9px] font-bold text-[var(--color-text-muted)] uppercase tracking-wider">
                      <th className="pb-1.5">Date</th>
                      <th className="pb-1.5">Category</th>
                      <th className="pb-1.5 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="text-[10px] font-semibold text-[var(--color-text-secondary)]">
                    <tr className="border-b border-[var(--color-border)]/40">
                      <td className="py-2">20 Jun 2026</td>
                      <td className="py-2"><span className="px-1.5 py-0.5 rounded bg-[var(--color-surface-3)] text-[9px] font-bold">Utilities</span></td>
                      <td className="py-2 text-right font-bold text-clay">-₹4,200</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </section>

        {/* ── Security Architecture Section ───────────────── */}
        <section id="security" className="border-t border-[var(--color-border)] bg-[var(--color-surface-2)]">
          <div className="max-w-6xl mx-auto px-6 py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-indigo-500/15 bg-indigo-500/5 text-[10px] font-bold uppercase tracking-wider text-indigo-500 mb-4">
                  <Shield size={11} />
                  <span>Security Framework</span>
                </div>
                <h2 className="text-3xl font-extrabold tracking-tight mb-5 leading-tight text-[var(--color-text-primary)]">
                  Your financials are secure & private
                </h2>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-6">
                  CashFlowX is built using standalone database schemas, secure cookie tokens, and strict local environment setups. No bank screen scraping, no credential storage, and no background tracking processes.
                </p>

                <div className="space-y-4">
                  {[
                    'Locally encrypted session token protocols',
                    'Zero background scraping trackers or processes',
                    'Complete manual record-keeping control',
                    'No broker data aggregation or sharing'
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

              {/* Security Details Container */}
              <div className="
                rounded-2xl border border-[var(--color-border-strong)] bg-[var(--color-surface)] p-8
                shadow-[0_8px_30px_rgb(0,0,0,0.02)]
                flex flex-col gap-6 relative overflow-hidden
              ">
                <h3 className="text-sm font-bold text-[var(--color-text-primary)]">Compliance & Design</h3>
                
                <div className="flex gap-4 items-stretch">
                  <div className="w-1 bg-accent/25 rounded" />
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-xs font-bold text-[var(--color-text-primary)] mb-1">Deliberate Accounting</h4>
                      <p className="text-[11px] text-[var(--color-text-muted)] leading-relaxed">
                        Manually entering transactions prompts active awareness of daily budgets, cultivating better spending decisions naturally.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[var(--color-text-primary)] mb-1">Zero Integration Failure</h4>
                      <p className="text-[11px] text-[var(--color-text-muted)] leading-relaxed">
                        Never worry about bank API syncs breaking or locking your accounts. Your workspace is always accessible.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Workflow Steps ─────────────────────────────── */}
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
                  desc: 'Sign up securely in 30 seconds. No complex bank APIs required.'
                },
                {
                  num: '02',
                  title: 'Set Budget Caps',
                  desc: 'Define custom spending bounds for your selected monthly categories.'
                },
                {
                  num: '03',
                  title: 'Log & Analyze',
                  desc: 'Log transactions manually and monitor real-time graph updates.'
                }
              ].map(({ num, title, desc }) => (
                <div key={num} className="group flex flex-col justify-between p-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-border-strong)] transition-all shadow-sm">
                  <div>
                    <span className="font-mono text-3xl font-extrabold text-accent/20 group-hover:text-accent/35 transition-colors block mb-4">
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

        {/* ── Secure Register CTA ─────────────────────────── */}
        <section className="border-t border-[var(--color-border)] relative overflow-hidden bg-[var(--color-surface-2)]">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-5xl mx-auto px-6 py-24">
            <div className="
              relative rounded-3xl overflow-hidden border border-[var(--color-border-strong)] bg-[var(--color-surface)] px-8 py-16 text-center shadow-xl
              dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)]
            ">
              <h2 className="text-3xl font-extrabold tracking-tight mb-4 text-[var(--color-text-primary)]">
                Take control of your spending today
              </h2>
              <p className="text-sm text-[var(--color-text-muted)] mb-8 max-w-md mx-auto leading-relaxed">
                Connect to a demo account or sign up to establish your personal workspace.
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

      {/* ── Clean Corporate Footer ─────────────────────────── */}
      <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-muted)] text-[11px] transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <img src="./logo.png" alt="CashFlowX Logo" className="w-5 h-5 object-contain" />
              <span className="font-bold text-xs text-[var(--color-text-primary)]">CashFlowX</span>
            </div>
            <p className="max-w-xs leading-relaxed text-[var(--color-text-muted)] mb-4">
              Secure, manual, and private accounting designed to guide daily spending habits.
            </p>
            <p>© {new Date().getFullYear()} CashFlowX Inc. All rights reserved.</p>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-wider text-[var(--color-text-primary)] mb-3">Product</h4>
            <ul className="space-y-2">
              <li><a href="#features" className="hover:text-[var(--color-text-primary)] transition-colors">Features</a></li>
              <li><a href="#how" className="hover:text-[var(--color-text-primary)] transition-colors">Workflow</a></li>
              <li><a href="#security" className="hover:text-[var(--color-text-primary)] transition-colors">Security Details</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-wider text-[var(--color-text-primary)] mb-3">Legal</h4>
            <ul className="space-y-2">
              <li><span className="cursor-default hover:text-[var(--color-text-primary)] transition-colors">Privacy Policy</span></li>
              <li><span className="cursor-default hover:text-[var(--color-text-primary)] transition-colors">Terms of Service</span></li>
              <li><span className="cursor-default hover:text-[var(--color-text-primary)] transition-colors">Security Overview</span></li>
            </ul>
          </div>

        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
