import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Moon, Sun } from 'lucide-react';
import { useDarkMode } from '../hooks/useDarkMode';

// TODO: Wire up actual password reset email sending via a backend endpoint
// (e.g. POST /api/auth/forgot-password). For now this is a UI stub.

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { dark, toggle } = useDarkMode();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);
    setSubmitted(true);
    toast.success('If an account exists, a reset link has been sent.');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-surface-2)]">

      {/* Top bar */}
      <header className="flex items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2.5">
          <img src="./logo.png" alt="Logo" className="w-7 h-7" />
          <span className="text-sm font-bold text-[var(--color-text-primary)] tracking-tight">
            CashFlowX
          </span>
        </Link>
        <button
          onClick={toggle}
          aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
          className="
            flex items-center gap-1.5 h-8 px-3 rounded-lg text-xs font-medium
            text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]
            bg-[var(--color-surface)] hover:bg-[var(--color-surface-3)]
            border border-[var(--color-border)] cursor-pointer
          "
        >
          {dark ? <Sun size={14} /> : <Moon size={14} />}
          <span>{dark ? 'Light' : 'Dark'}</span>
        </button>
      </header>

      {/* Main */}
      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm">
          <div className="
            bg-[var(--color-surface)] border border-[var(--color-border)]
            rounded-2xl p-8 shadow-sm
          ">
            <div className="mb-6">
              <h1 className="text-xl font-bold text-[var(--color-text-primary)]">Reset password</h1>
              <p className="text-sm text-[var(--color-text-muted)] mt-1">
                Enter your email and we'll send you a reset link.
              </p>
            </div>

            {submitted ? (
              <div>
                <div className="px-4 py-3 rounded-xl bg-signal/10 border border-signal/20 mb-5">
                  <p className="text-sm text-[var(--color-text-secondary)]">
                    If an account with that email exists, a password reset link has been sent. Please check your inbox.
                  </p>
                </div>
                <Link
                  to="/login"
                  className="text-sm font-semibold text-accent hover:text-accent-dark"
                >
                  ← Back to sign in
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1.5">
                    Email address
                  </label>
                  <input
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="
                      w-full px-3 py-2.5 rounded-xl text-sm
                      bg-[var(--color-surface-2)] border border-[var(--color-border)]
                      text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)]
                      focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent
                    "
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="
                    w-full py-2.5 rounded-xl text-sm font-semibold text-white
                    bg-accent hover:bg-accent-dark
                    disabled:opacity-50 disabled:cursor-not-allowed
                    transition-colors cursor-pointer
                  "
                >
                  {loading ? 'Sending…' : 'Send reset link'}
                </button>

                <div className="text-center">
                  <Link to="/login" className="text-xs font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]">
                    ← Back to sign in
                  </Link>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default ForgotPassword;
