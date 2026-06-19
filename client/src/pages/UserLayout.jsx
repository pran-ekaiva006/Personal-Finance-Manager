import { useEffect, useRef, useState } from "react";
import {
  Menu, X, Home, History, BadgeDollarSign, Goal, UserCircle, SlidersVertical, Search, Sun, Moon
} from "lucide-react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useAppContext } from "../contexts/AppProvider";
import SkeletonLoader from "../components/SkeletonLoader";

export default function UserLayout() {
  const { setSearch, logout, navigate, user, loading } = useAppContext();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const sidebarRef = useRef(null);
  const toggleRef = useRef(null);
  const userDropdownRef = useRef(null);

  const handleLogout = async () => {
    try {
      await logout();
    } catch {
      return null;
    }
  }

  const menuItems = [
    { name: "Dashboard", icon: <Home size={20} />, href: "/dashboard" },
    { name: "Add Transactions", icon: <BadgeDollarSign size={20} />, href: "/add-transactions" },
    { name: "Transactions", icon: <History size={20} />, href: "/transactions" },
    { name: "Set Budgets", icon: <SlidersVertical size={20} />, href: "/set-budgets" },
    { name: "Budgets", icon: <Goal size={20} />, href: "/budgets" },
  ];

  useEffect(() => {
    const handleClickOutside = (e) => {
      const isMobile = window.innerWidth < 768;

      if (isMobile && isOpen &&
        !sidebarRef.current?.contains(e.target) &&
        !toggleRef.current?.contains(e.target)
      ) {
        setIsOpen(false);
      }

      if (showUserDropdown && !userDropdownRef.current?.contains(e.target)) {
        setShowUserDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, showUserDropdown]);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`fixed md:static z-40 top-0 left-0 h-full w-64 bg-white dark:bg-slate-950 border-r border-gray-300 dark:border-slate-900 
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="flex items-center justify-between px-5 py-8">
          <span
            onClick={() => navigate("/dashboard")}
            className="text-xl text-signal font-bold flex items-center gap-2 cursor-pointer"
          >
            <img src="./logo.png" alt="" className="size-8" /> CashFlowX
          </span>
          <button
            ref={toggleRef}
            className="md:hidden text-gray-700 dark:text-gray-300"
            onClick={() => setIsOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        <nav className="px-5 space-y-4">
          {menuItems.map(({ name, icon, href }) => (
            <Link
              key={href}
              to={href}
              className={`flex items-center gap-3 py-3 px-2.5 font-semibold rounded-lg border transition-all
              ${location.pathname === href
                  ? "bg-signal/10 dark:bg-signal/20 text-signal border-signal/20 dark:border-signal/30"
                  : "border-transparent text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-900"
                }`}
            >
              {icon} <span>{name}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white dark:bg-slate-950 border-b border-gray-200 dark:border-slate-900 px-4 py-4 flex items-center justify-between gap-4">
          <button
            ref={toggleRef}
            className="md:hidden text-gray-800 dark:text-gray-250"
            onClick={() => setIsOpen(true)}
          >
            <Menu size={24} />
          </button>

          <div className="flex items-center justify-between md:w-full gap-4">
            {/* Desktop Search */}
            <div className="hidden md:flex items-center border pl-3 gap-2 bg-white dark:bg-slate-900 border-gray-300 dark:border-slate-800 h-[46px] rounded-md w-full max-w-md">
              <Search size={16} className="text-gray-400" />
              <input
                type="text"
                placeholder="Search transactions..."
                className="w-full h-full text-sm text-gray-600 dark:text-gray-200 bg-transparent outline-none"
                onChange={(e) => {
                  setSearch(e.target.value);
                  navigate("/transactions");
                }}
              />
            </div>

            {/* Actions group */}
            <div className="flex items-center gap-3">
              {/* Mobile Search Icon */}
              <button
                className="md:hidden p-2 rounded-lg border border-gray-300 dark:border-slate-800 text-gray-600 dark:text-gray-300 cursor-pointer"
                onClick={() => setMobileSearchOpen((prev) => !prev)}
                aria-label="Toggle search"
              >
                <Search size={20} />
              </button>

              {/* Dark Mode Toggle */}
              <button
                onClick={() => setDarkMode(prev => !prev)}
                className="p-2 rounded-lg border border-gray-300 dark:border-slate-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-900 transition-colors cursor-pointer"
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              {/* User Dropdown */}
              <div className="relative" ref={userDropdownRef}>
                <button onClick={() => setShowUserDropdown(prev => !prev)} className="cursor-pointer flex items-center">
                  <UserCircle size={30} className="text-gray-700 dark:text-gray-300" />
                </button>

                {showUserDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-800 p-4 z-50 shadow-lg">
                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2 truncate">{user.email}</p>
                    <button
                      className="text-clay cursor-pointer bg-red-50/50 dark:bg-red-950/20 border w-full px-3 py-2 rounded border-clay/30 text-sm font-medium hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Mobile Search Overlay */}
        {mobileSearchOpen && (
          <div className="md:hidden px-4 py-3 bg-white dark:bg-slate-950 border-b border-gray-200 dark:border-slate-900">
            <div className="flex items-center gap-2 border border-gray-300 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-md px-3 h-[42px]">
              <Search size={16} className="text-gray-400 shrink-0" />
              <input
                type="text"
                autoFocus
                placeholder="Search transactions..."
                className="w-full text-sm text-gray-600 dark:text-gray-200 bg-transparent outline-none"
                onChange={(e) => {
                  setSearch(e.target.value);
                  navigate("/transactions");
                }}
              />
              <button
                onClick={() => setMobileSearchOpen(false)}
                className="text-gray-400"
                aria-label="Close search"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        )}

        {/* Scrollable Page Content */}
        <main className="p-6 bg-gray-50 dark:bg-slate-950/40 text-gray-900 dark:text-gray-100 flex-1 overflow-y-auto">
          {loading ? <SkeletonLoader /> : <Outlet />}
        </main>
      </div>
    </div>
  );
}
