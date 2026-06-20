import React, { useState, useEffect } from 'react';
import { useAppContext } from '../contexts/AppProvider';
import { useLocation, Link } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';
import { useDarkMode } from '../hooks/useDarkMode';

function Login() {
  const { login, register, navigate } = useAppContext();
  const location = useLocation();
  const { dark, toggle } = useDarkMode();

  const [state, setState] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
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

          {/* Card */}
          <div className="
            bg-[var(--color-surface)] border border-[var(--color-border)]
            rounded-2xl p-8 shadow-sm
          ">
            {/* Heading */}
            <div className="mb-6">
              <h1 className="text-xl font-bold text-[var(--color-text-primary)]">
                {state === 'sign-up' ? 'Create your account' : 'Welcome back'}
              </h1>
              <p className="text-sm text-[var(--color-text-muted)] mt-1">
                {state === 'sign-up'
                  ? 'Start tracking your finances today.'
                  : 'Sign in to continue to CashFlowX.'}
              </p>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-4 px-3 py-2 rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30">
                <p className="text-xs font-medium text-clay">{error}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {state === 'sign-up' && (
                <div>
                  <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1.5">
                    Full name
                  </label>
                  <input
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Alex Johnson"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="
                      w-full px-3 py-2.5 rounded-xl text-sm
                      bg-[var(--color-surface-2)] border border-[var(--color-border)]
                      text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)]
                      focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent
                    "
                  />
                </div>
              )}

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

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-medium text-[var(--color-text-secondary)]">
                    Password
                  </label>
                  {state === 'login' && (
                    <Link
                      to="/forgot-password"
                      className="text-xs text-accent hover:text-accent-dark font-medium"
                    >
                      Forgot password?
                    </Link>
                  )}
                </div>
                <input
                  type="password"
                  required
                  autoComplete={state === 'sign-up' ? 'new-password' : 'current-password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                  transition-colors cursor-pointer mt-2
                "
              >
                {loading
                  ? 'Please wait…'
                  : state === 'sign-up' ? 'Create account' : 'Sign in'}
              </button>
            </form>

            {/* Toggle mode */}
            <p className="text-center text-xs text-[var(--color-text-muted)] mt-5">
              {state === 'sign-up' ? (
                <>Already have an account?{' '}
                  <button onClick={() => setState('login')} className="text-accent font-semibold hover:underline cursor-pointer">
                    Sign in
                  </button>
                </>
              ) : (
                <>Don't have an account?{' '}
                  <button onClick={() => setState('sign-up')} className="text-accent font-semibold hover:underline cursor-pointer">
                    Create one
                  </button>
                </>
              )}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Login;
