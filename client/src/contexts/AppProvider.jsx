import React, { createContext, useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const AppContext = createContext();

// ✅ Backend URL from .env MUST end with /api/
let backendUrl = import.meta.env.VITE_BACKEND_URL;
if (import.meta.env.DEV && (!backendUrl || backendUrl.includes("onrender.com"))) {
  backendUrl = "http://localhost:5001/api";
}
axios.defaults.baseURL = backendUrl;
console.log("axios.defaults.baseURL configured to:", axios.defaults.baseURL);
axios.defaults.withCredentials = true;

const defaultExpenseCategories = [
  "Food & Dining",
  "Transportation",
  "Shopping",
  "Entertainment",
  "Bills & Utilities",
  "Healthcare",
  "Travel",
  "Other",
];

function AppProvider({ children }) {
  const [authLoading, setAuthLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState("");
  const [search, setSearch] = useState("");
  const [budgets, setBudgets] = useState([]);
  const [statistic, setStatistic] = useState({
    balance: 0,
    income: 0,
    expense: 0,
    savingRate: 0,
    categoryBreakdown: [],
  });
  const [yearData, setYearData] = useState([]);
  const [budgetUsage, setBudgetUsage] = useState({
    report: [],
    total: {
      totalBudget: 0,
      totalSpent: 0,
      remaining: 0,
      percentUsed: 0,
    },
  });
  const [transactions, setTransactions] = useState([]);

  const [expenseCategory, setExpenseCategory] = useState(defaultExpenseCategories);
  const navigate = useNavigate();

  // ---------- Auth ----------
  const register = async (formData) => {
    try {
      const { data } = await axios.post("auth/register", formData);
      setUser(data);
      toast.success("Registered successfully");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  const login = async (formData) => {
    try {
      const { data } = await axios.post("auth/login", formData);
      setUser(data);
      toast.success("Logged in successfully");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  const logout = async () => {
    try {
      const { data } = await axios.post("auth/logout");
      setUser(null);
      toast.success(data?.message);
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message);
    }
  };

  const loadUser = async () => {
    try {
      const res = await axios.get("auth/me");
      setUser(res.data);
      // If user is logged in and on a public auth page, send them to dashboard
      const authPages = ["/login", "/register", "/"];
      if (authPages.includes(window.location.pathname)) {
        navigate("/dashboard");
      }
    } catch {
      setUser(null);
      // Only redirect to landing page if on a protected route
      const publicPaths = ["/", "/login", "/register", "/forgot-password"];
      if (!publicPaths.includes(window.location.pathname)) {
        navigate("/");
      }
    } finally {
      setAuthLoading(false);
    }
  };

  // ---------- Transactions ----------
  const addTransaction = async (transaction) => {
    try {
      await axios.post("transactions", transaction);
      await fetchMonthlySummary();
      await getTransactions();
      toast.success("Transaction added");
    } catch {
      toast.error("Add transaction failed");
    }
  };

  const getTransactions = async () => {
    try {
      const { data } = await axios.get("transactions");
      setTransactions(data);
    } catch {
      return [];
    }
  };

  const deleteTransaction = async (id) => {
    try {
      await axios.delete(`transactions/${id}`);
      toast.success("Transaction deleted");
    } catch {
      toast.error("Delete transaction failed");
    }
  };

  const fetchMonthlySummary = async (dateParams) => {
    try {
      const now = new Date();
      const year = dateParams?.year || now.getFullYear();
      const month = dateParams?.month || (now.getMonth() + 1);
      const { data } = await axios.get(`transactions/summary/${year}/${month}`);
      setStatistic(data);
    } catch {
      return null;
    }
  };

  const fetchSummary = async () => {
    try {
      const { data } = await axios.get("transactions/monthly-summary");
      setYearData(data);
    } catch {
      return null;
    }
  };

  // ---------- Budgets ----------
  const addBudget = async (budget) => {
    try {
      const payload = {
        ...budget,
        amount: Number(budget.amount)
      };
      await axios.post("budgets", payload);
      toast.success("Budget added");
    } catch {
      toast.error("Add budget failed");
    }
  };

  const getBudgets = async () => {
    try {
      const { data } = await axios.get("budgets");
      setBudgets(data || []);
      const used = data.map((i) => i.category);
      const available = defaultExpenseCategories.filter((cat) => !used.includes(cat));
      setExpenseCategory(available);
    } catch {
      return null;
    }
  };

  const updateBudget = async (id, updates) => {
    try {
      const payload = {
        ...updates,
        amount: Number(updates.amount)
      };
      await axios.put(`budgets/${id}`, payload);
      await getBudgets();
      toast.success("Budget updated");
    } catch {
      toast.error("Update budget failed");
    }
  };

  const deleteBudget = async (id) => {
    try {
      await axios.delete(`budgets/${id}`);
      await getBudgets();
      toast.success("Budget deleted");
    } catch {
      toast.error("Delete budget failed");
    }
  };

  const getBudgetUsage = async () => {
    try {
      const { data } = await axios.get("budgets/status");
      setBudgetUsage(data);
    } catch {
      return null;
    }
  };

  // ---------- App Loading ----------
  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      await getBudgets();
      await fetchMonthlySummary();
      await fetchSummary();
      await getBudgetUsage();
      await getTransactions();
      setLoading(false);
    };
    fetchData();
  }, [user]);

  // Show nothing (or a minimal splash) while auth state is being determined
  if (authLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0F172A',
        color: '#64748B',
        fontSize: '13px',
        fontFamily: '"Inter", system-ui, sans-serif',
        letterSpacing: '0.025em',
      }}>
        <span>Loading…</span>
      </div>
    );
  }

  return (
    <AppContext.Provider
      value={{
        user,
        navigate,
        yearData,
        setUser,
        register,
        login,
        loading,
        logout,
        statistic,
        addTransaction,
        getTransactions,
        deleteTransaction,
        fetchMonthlySummary,
        addBudget,
        budgets,
        expenseCategory,
        getBudgets,
        updateBudget,
        deleteBudget,
        budgetUsage,
        getBudgetUsage,
        transactions,
        search,
        setSearch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;
export const useAppContext = () => useContext(AppContext);
