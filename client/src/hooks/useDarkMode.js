import { useState, useEffect } from 'react';

/**
 * useDarkMode — global dark mode hook.
 * Reads/writes to localStorage and syncs the `dark` class on <html>.
 * Single source of truth — import this hook anywhere you need the toggle.
 */
export function useDarkMode() {
  const [dark, setDark] = useState(() => {
    // Server-safe initial read
    if (typeof window === 'undefined') return false;
    const stored = localStorage.getItem('theme');
    if (stored) return stored === 'dark';
    // Respect OS preference as default
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [dark]);

  const toggle = () => setDark(prev => !prev);

  return { dark, toggle, setDark };
}
