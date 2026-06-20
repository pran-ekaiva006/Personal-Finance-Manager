import React, { useState, useEffect } from 'react';
import { useAppContext } from '../contexts/AppProvider';
import { useLocation, Link } from 'react-router-dom';
import { Moon, Sun, Eye, EyeOff, Sparkles, CheckCircle2 } from 'lucide-react';
import { useDarkMode } from '../hooks/useDarkMode';

function Login() {
  const { login, register } = useAppContext();
  const location = useLocation();
  const { dark, toggle } = useDarkMode();

  const [state, setState] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (location.state?.mode === 'sign-up' || location.state?.mode === 'signUp') {
      setState('sign-up');
    } else {
      setState('login');
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (state === 'sign-up') {
        await register({ name, email, password });
        setState('login');
      } else {
        await login({ email, password });
      }
    } catch {
      setError('Invalid credentials. Please verify your entries.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-[var(--color-surface-2)] selection:bg-accent/20 selection:text-accent transition-colors duration-300">
      
      {/* Container Box */}
      <div className="
        w-full max-w-5xl rounded-[32px] overflow-hidden
        border border-[var(--color-border-strong)] bg-[var(--color-surface)]
        shadow-[0_24px_80px_-15px_rgba(0,0,0,0.12)]
        dark:shadow-[0_24px_80px_-15px_rgba(0,0,0,0.5)]
        transition-all duration-300
        grid grid-cols-1 lg:grid-cols-12
      ">
        
        {/* ── Left Pane: Auth Form ─────────────────────────── */}
        <div className="col-span-1 lg:col-span-7 p-8 sm:p-12 md:p-16 flex flex-col justify-between min-h-[580px]">
          
          {/* Logo & Header */}
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-8.5 h-8.5 rounded-xl bg-accent/10 flex items-center justify-center transition-all duration-300 group-hover:scale-105">
                <img src="./logo.png" alt="Logo" className="w-5.5 h-5.5 object-contain" />
              </div>
              <span className="text-sm font-bold text-[var(--color-text-primary)] tracking-tight">
                CashFlowX
              </span>
            </Link>

            {/* Dark Mode Switcher */}
            <button
              onClick={toggle}
              aria-label={dark ? 'Light mode' : 'Dark mode'}
              className="w-9 h-9 flex items-center justify-center rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-2)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-all cursor-pointer hover:scale-102"
            >
              {dark ? <Sun size={15} /> : <Moon size={15} />}
            </button>
          </div>

          {/* Form Content Wrapper */}
          <div className="my-auto py-8 max-w-sm w-full mx-auto">
            <div className="mb-8">
              <h1 className="text-2xl font-extrabold tracking-tight text-[var(--color-text-primary)]">
                {state === 'sign-up' ? 'Create Account' : 'Hey, Welcome Back!'}
              </h1>
              <p className="text-xs text-[var(--color-text-muted)] font-medium mt-1.5">
                {state === 'sign-up'
                  ? 'Sign up to construct your secure finance dashboard.'
                  : 'Please sign in here to access your account.'}
              </p>
            </div>

            {error && (
              <div className="mb-5 px-4 py-3 rounded-xl bg-clay/5 border border-clay/20 text-xs font-semibold text-clay">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {state === 'sign-up' && (
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-secondary)] mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="
                      w-full px-3.5 py-3 rounded-xl text-xs font-medium
                      bg-[var(--color-surface-2)] border border-[var(--color-border)]
                      text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)]
                      focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent
                      transition-all
                    "
                  />
                </div>
              )}

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-secondary)] mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="
                    w-full px-3.5 py-3 rounded-xl text-xs font-medium
                    bg-[var(--color-surface-2)] border border-[var(--color-border)]
                    text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)]
                    focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent
                    transition-all
                  "
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">
                    Password
                  </label>
                  {state === 'login' && (
                    <Link
                      to="/forgot-password"
                      className="text-[10px] text-accent hover:text-accent-dark font-bold uppercase tracking-wider"
                    >
                      Forgot password?
                    </Link>
                  )}
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    autoComplete={state === 'sign-up' ? 'new-password' : 'current-password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="
                      w-full pl-3.5 pr-10 py-3 rounded-xl text-xs font-medium
                      bg-[var(--color-surface-2)] border border-[var(--color-border)]
                      text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)]
                      focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent
                      transition-all
                    "
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="
                  w-full py-3.5 rounded-xl text-xs font-bold text-white
                  bg-accent hover:bg-accent-dark hover:shadow-lg hover:shadow-accent/15
                  disabled:opacity-50 disabled:cursor-not-allowed
                  transition-all cursor-pointer active:scale-98 mt-3
                "
              >
                {loading ? 'Processing secure login…' : state === 'sign-up' ? 'Create Account' : 'Sign In'}
              </button>
            </form>
          </div>

          {/* Toggle state info */}
          <div className="text-center text-xs font-medium text-[var(--color-text-muted)]">
            {state === 'sign-up' ? (
              <>
                Already have an account?{' '}
                <button 
                  onClick={() => setState('login')} 
                  className="text-accent font-bold hover:underline cursor-pointer"
                >
                  Sign In
                </button>
              </>
            ) : (
              <>
                Don't have an account?{' '}
                <button 
                  onClick={() => setState('sign-up')} 
                  className="text-accent font-bold hover:underline cursor-pointer"
                >
                  Create one
                </button>
              </>
            )}
          </div>
        </div>

        {/* ── Right Pane: Behance Gitso Illustration ────── */}
        <div className="
          col-span-1 lg:col-span-5 bg-[#FAF2E8] p-8 
          relative hidden lg:flex flex-col justify-between items-center 
          overflow-hidden min-h-[580px] select-none border-l border-stone-200
        ">
          {/* Decorative squiggly SVG at back */}
          <div className="absolute top-[10%] left-[10%] w-[350px] h-[350px] opacity-15 pointer-events-none text-stone-400">
            <svg viewBox="0 0 100 100" className="w-full h-full stroke-current" fill="none" strokeWidth="1.5">
              <path d="M 10 50 C 30 10, 70 90, 90 50" />
            </svg>
          </div>

          {/* Top pill toggle */}
          <div className="w-full flex justify-end z-20">
            <button
              onClick={() => setState(state === 'login' ? 'sign-up' : 'login')}
              className="
                px-4.5 py-2 rounded-full border border-stone-300/80 bg-white/70 
                hover:bg-white text-[10px] font-bold text-stone-700 
                transition-all shadow-xs hover:shadow-sm cursor-pointer hover:scale-102
              "
            >
              {state === 'login' ? 'Register' : 'Login'}
            </button>
          </div>

          {/* Center visual: CSS 3D Receipt & Credit Card layout */}
          <div className="relative my-auto flex flex-col items-center justify-center w-full">
            
            {/* SVG Leaves background details */}
            <div className="absolute left-[8%] bottom-[5%] w-12 h-20 text-indigo-400/40 rotate-[-12deg]">
              <svg viewBox="0 0 50 80" className="w-full h-full fill-current">
                <path d="M 25 80 Q 25 40, 10 20 Q 25 15, 25 0 Q 25 15, 40 20 Q 25 40, 25 80 Z" />
              </svg>
            </div>
            
            {/* Wavy Receipts & Credit Cards Container */}
            <div className="relative z-10 flex flex-col items-center">
              
              {/* Credit Card (floats, angled) */}
              <div className="
                w-64 h-38 rounded-2xl p-5 text-left text-white
                bg-gradient-to-br from-accent to-indigo-700
                shadow-[0_20px_45px_rgba(79,70,229,0.35)]
                border border-white/10
                rotate-[-10deg] translate-y-3 translate-x-[-15px]
                transition-transform duration-700 hover:rotate-[-7deg] hover:scale-103
                flex flex-col justify-between
              ">
                <div className="flex justify-between items-start">
                  {/* Card Chip */}
                  <div className="w-9 h-7.5 rounded-lg bg-amber-300/85 border border-amber-400/90 shadow-sm relative overflow-hidden">
                    <div className="absolute inset-x-2.5 top-0 bottom-0 border-x border-stone-800/20" />
                    <div className="absolute inset-y-2.5 left-0 right-0 border-y border-stone-800/20" />
                  </div>
                  <span className="text-[10px] font-bold tracking-widest opacity-80 uppercase">Platinum</span>
                </div>
                
                <div>
                  <p className="font-mono text-sm tracking-widest text-white/90 mb-2">••••  ••••  ••••  9016</p>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-[7px] text-white/60 uppercase block">Cardholder</span>
                      <span className="text-[9px] font-bold tracking-wide uppercase font-mono">CashFlowX Member</span>
                    </div>
                    <div className="flex -space-x-2">
                      <div className="w-5 h-5 rounded-full bg-red-500/80" />
                      <div className="w-5 h-5 rounded-full bg-amber-400/80" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Receipt Roll rolling underneath */}
              <div className="
                w-46 bg-white border border-stone-200/80 shadow-lg p-4 rounded-b-xl
                flex flex-col gap-2 relative z-20
                rotate-[6deg] translate-y-[-24px] translate-x-[25px]
                transition-transform duration-700 hover:rotate-[4deg]
              ">
                {/* Wavy header border receipt style */}
                <div className="absolute top-0 inset-x-0 h-1 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-stone-300 via-stone-200 to-transparent" />
                
                <div className="flex items-center gap-1.5 text-signal text-[9px] font-bold">
                  <CheckCircle2 size={11} />
                  <span>Transaction Synced</span>
                </div>

                <div className="space-y-1.5 py-1.5 border-y border-dashed border-stone-200 text-[8px] font-mono text-stone-500">
                  <div className="flex justify-between">
                    <span>Groceries</span>
                    <span>₹2,450.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Subscriptions</span>
                    <span>₹899.00</span>
                  </div>
                </div>

                <div className="flex justify-between text-[10px] font-bold text-stone-800 font-mono">
                  <span>Total Saved</span>
                  <span className="text-signal">₹14,250</span>
                </div>
              </div>

              {/* Floating 3D Gold Coin */}
              <div className="
                absolute right-[-15px] top-[15%] z-30
                w-10 h-10 rounded-full bg-gradient-to-br from-amber-300 via-amber-400 to-amber-500
                border border-amber-500/50 shadow-md
                flex items-center justify-center font-bold text-amber-900 text-xs
                rotate-[15deg] select-none
                animate-bounce duration-1000
              ">
                ₹
              </div>

            </div>

          </div>

          {/* Bottom text citation */}
          <div className="text-center max-w-xs z-10">
            <p className="text-[10px] italic font-serif text-[#7E7363] leading-relaxed">
              "Conscious accounting naturally steers spending habits towards growth."
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;
