import { useEffect, useRef, useState } from "react";
import {
  Menu, X, Home, History, BadgeDollarSign, Goal,
  UserCircle, SlidersVertical, Search, Sun, Moon
} from "lucide-react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useAppContext } from "../contexts/AppProvider";
import SkeletonLoader from "../components/SkeletonLoader";
import { useDarkMode } from "../hooks/useDarkMode";

export default function UserLayout() {
  const { setSearch, logout, navigate, user, loading } = useAppContext();
  const location = useLocation();
  const { dark, toggle } = useDarkMode();

  const [isOpen, setIsOpen] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const sidebarRef = useRef(null);
  const toggleRef = useRef(null);
  const userDropdownRef = useRef(null);

  const handleLogout = async () => {
    try { await logout(); } catch { return null; }
  };

  const menuItems = [
    { name: "Dashboard",        icon: <Home size={18} />,           href: "/dashboard" },
    { name: "Add Transaction",  icon: <BadgeDollarSign size={18} />, href: "/add-transactions" },
    { name: "Transactions",     icon: <History size={18} />,         href: "/transactions" },
    { name: "Set Budgets",      icon: <SlidersVertical size={18} />, href: "/set-budgets" },
    { name: "Budgets",          icon: <Goal size={18} />,            href: "/budgets" },
  ];

  useEffect(() => {
    const handleClickOutside = (e) => {
      const isMobile = window.innerWidth < 768;
      if (isMobile && isOpen &&
        !sidebarRef.current?.contains(e.target) &&
        !toggleRef.current?.contains(e.target)
      ) { setIsOpen(false); }
      if (showUserDropdown && !userDropdownRef.current?.contains(e.target)) {
        setShowUserDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, showUserDropdown]);

  // Close sidebar on route change (mobile)
  useEffect(() => { setIsOpen(false); }, [location.pathname]);

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--color-surface-2)]">

      {/* ── Sidebar ─────────────────────────────────────── */}
      <aside
        ref={sidebarRef}
        className={`
          fixed md:static z-40 top-0 left-0 h-full w-60 flex flex-col
          bg-[var(--color-surface)] border-r border-[var(--color-border)]
          transform transition-transform duration-250 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
        `}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-[var(--color-border)]">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2.5 cursor-pointer"
          >
            <img src="./logo.png" alt="" className="w-7 h-7" />
            <span className="text-base font-bold text-[var(--color-text-primary)] tracking-tight">
              CashFlowX
            </span>
          </button>
          <button
            className="md:hidden text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
            onClick={() => setIsOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {menuItems.map(({ name, icon, href }) => {
            const active = location.pathname === href;
            return (
              <Link
                key={href}
                to={href}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                  transition-colors duration-150
                  ${active
                    ? "bg-[var(--color-surface-3)] text-[var(--color-text-primary)]"
                    : "text-[var(--color-text-muted)] hover:bg-[var(--color-surface-2)] hover:text-[var(--color-text-primary)]"
                  }
                `}
              >
                <span className={active ? "text-signal" : ""}>{icon}</span>
                {name}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="px-3 py-4 border-t border-[var(--color-border)]">
          <p className="text-[10px] font-medium text-[var(--color-text-muted)] px-3 mb-1 uppercase tracking-wider">
            Account
          </p>
          <button
            onClick={handleLogout}
            className="w-full text-left px-3 py-2.5 text-sm font-medium text-clay hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-colors"
          >
            Sign out
          </button>
        </div>
      </aside>

      {/* ── Main ────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col h-full min-w-0">

        {/* Header */}
        <header className="
          sticky top-0 z-30 h-14 flex items-center gap-4 px-4
          bg-[var(--color-surface)] border-b border-[var(--color-border)]
        ">
          {/* Hamburger */}
          <button
            ref={toggleRef}
            className="md:hidden p-1.5 rounded-md text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-2)]"
            onClick={() => setIsOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-sm items-center gap-2 h-8 px-3 rounded-lg bg-[var(--color-surface-2)] border border-[var(--color-border)]">
            <Search size={14} className="text-[var(--color-text-muted)] shrink-0" />
            <input
              type="text"
              placeholder="Search transactions…"
              className="flex-1 text-xs bg-transparent outline-none text-[var(--color-text-secondary)] placeholder:text-[var(--color-text-muted)]"
              onChange={(e) => {
                setSearch(e.target.value);
                navigate("/transactions");
              }}
            />
          </div>

          <div className="ml-auto flex items-center gap-2">
            {/* Mobile Search */}
            <button
              className="md:hidden p-1.5 rounded-md text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-2)]"
              onClick={() => setMobileSearchOpen(p => !p)}
              aria-label="Search"
            >
              <Search size={18} />
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggle}
              aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
              className="
                relative inline-flex items-center gap-1.5 h-8 px-2.5 rounded-lg
                text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]
                bg-[var(--color-surface-2)] hover:bg-[var(--color-surface-3)]
                border border-[var(--color-border)] text-xs font-medium
                cursor-pointer
              "
            >
              {dark ? <Sun size={15} /> : <Moon size={15} />}
              <span className="hidden sm:inline">{dark ? "Light" : "Dark"}</span>
            </button>

            {/* User Menu */}
            <div className="relative" ref={userDropdownRef}>
              <button
                onClick={() => setShowUserDropdown(p => !p)}
                className="
                  flex items-center gap-2 h-8 px-2.5 rounded-lg
                  bg-[var(--color-surface-2)] hover:bg-[var(--color-surface-3)]
                  border border-[var(--color-border)]
                  text-[var(--color-text-secondary)] text-xs font-medium cursor-pointer
                "
              >
                <UserCircle size={16} />
                <span className="hidden sm:inline max-w-[120px] truncate">
                  {user?.name || user?.email?.split('@')[0] || 'Account'}
                </span>
              </button>

              {showUserDropdown && (
                <div className="
                  absolute right-0 top-10 w-52
                  bg-[var(--color-surface)] border border-[var(--color-border)]
                  rounded-xl shadow-lg shadow-black/10 dark:shadow-black/30
                  p-1 z-50
                ">
                  <div className="px-3 py-2 border-b border-[var(--color-border)] mb-1">
                    <p className="text-xs font-semibold text-[var(--color-text-primary)] truncate">
                      {user?.name}
                    </p>
                    <p className="text-[11px] text-[var(--color-text-muted)] truncate">
                      {user?.email}
                    </p>
                  </div>
                  <button
                    className="
                      w-full text-left px-3 py-2 rounded-lg text-xs font-medium
                      text-clay hover:bg-red-50 dark:hover:bg-red-950/20
                      transition-colors cursor-pointer
                    "
                    onClick={handleLogout}
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Mobile Search Bar */}
        {mobileSearchOpen && (
          <div className="md:hidden px-4 py-2.5 bg-[var(--color-surface)] border-b border-[var(--color-border)]">
            <div className="flex items-center gap-2 h-9 px-3 rounded-lg bg-[var(--color-surface-2)] border border-[var(--color-border)]">
              <Search size={14} className="text-[var(--color-text-muted)] shrink-0" />
              <input
                type="text"
                autoFocus
                placeholder="Search transactions…"
                className="flex-1 text-xs bg-transparent outline-none text-[var(--color-text-secondary)] placeholder:text-[var(--color-text-muted)]"
                onChange={(e) => {
                  setSearch(e.target.value);
                  navigate("/transactions");
                }}
              />
              <button onClick={() => setMobileSearchOpen(false)} className="text-[var(--color-text-muted)]">
                <X size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-[var(--color-surface-2)]">
          {loading ? <SkeletonLoader /> : <Outlet />}
        </main>
      </div>
    </div>
  );
}
