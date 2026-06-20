import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Moon, Sun, KeyRound, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useDarkMode } from '../hooks/useDarkMode';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { dark, toggle } = useDarkMode();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    // Simulate API delay
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setSubmitted(true);
    toast.success('Security link has been dispatched.');
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
        
        {/* ── Left Pane: Forgot Form ────────────────────────── */}
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
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-4">
                <KeyRound size={20} />
              </div>
              <h1 className="text-2xl font-extrabold tracking-tight text-[var(--color-text-primary)]">
                Reset Password
              </h1>
              <p className="text-xs text-[var(--color-text-muted)] font-medium mt-1.5">
                Enter your email address below, and we will send you a secure link to reset your account password.
              </p>
            </div>

            {submitted ? (
              <div className="space-y-6">
                <div className="px-4 py-3.5 rounded-xl bg-signal/5 border border-signal/20 text-xs font-semibold text-[var(--color-text-secondary)] leading-relaxed">
                  If an account is associated with <strong className="text-[var(--color-text-primary)]">{email}</strong>, a password reset link will arrive shortly. Please verify your spam folder if it doesn't appear.
                </div>
                <Link
                  to="/login"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:text-accent-dark transition-colors uppercase tracking-wider"
                >
                  <ArrowLeft size={13} /> Back to Sign In
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-secondary)] mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@example.com"
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

                <button
                  type="submit"
                  disabled={loading}
                  className="
                    w-full py-3.5 rounded-xl text-xs font-bold text-white
                    bg-accent hover:bg-accent-dark hover:shadow-lg hover:shadow-accent/15
                    disabled:opacity-50 disabled:cursor-not-allowed
                    transition-all cursor-pointer active:scale-98
                  "
                >
                  {loading ? 'Sending link…' : 'Send Reset Link'}
                </button>

                <div className="text-center pt-2">
                  <Link 
                    to="/login" 
                    className="text-[10px] font-bold text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] uppercase tracking-wider transition-colors"
                  >
                    Cancel & Return to Login
                  </Link>
                </div>
              </form>
            )}
          </div>

          <div className="h-6" /> {/* Spacer */}
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

          {/* Top pill login navigation button */}
          <div className="w-full flex justify-end z-20">
            <Link
              to="/login"
              className="
                px-4.5 py-2 rounded-full border border-stone-300/80 bg-white/70 
                hover:bg-white text-[10px] font-bold text-stone-700 
                transition-all shadow-xs hover:shadow-sm cursor-pointer hover:scale-102
              "
            >
              Sign In
            </Link>
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
                <div className="absolute top-0 inset-x-0 h-1 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-stone-300 via-stone-200 to-transparent" />
                
                <div className="flex items-center gap-1.5 text-signal text-[9px] font-bold">
                  <CheckCircle2 size={11} />
                  <span>Security Active</span>
                </div>

                <div className="space-y-1.5 py-1.5 border-y border-dashed border-stone-200 text-[8px] font-mono text-stone-500">
                  <div className="flex justify-between">
                    <span>Token Dispatch</span>
                    <span>SUCCESS</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Reset Protocol</span>
                    <span>AES-256</span>
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

export default ForgotPassword;
