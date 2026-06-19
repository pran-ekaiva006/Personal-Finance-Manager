import User from "../models/User.js";
import Transaction from "../models/Transaction.js";
import Budget from "../models/Budget.js";

export const seedDemo = async () => {
  try {
    const demoEmail = "demo@cashflowx.app";
    const demoUser = await User.findOne({ where: { email: demoEmail } });

    if (demoUser) {
      console.log("ℹ️ Demo user already exists, skipping seeding.");
      return;
    }

    const demoPassword = process.env.DEMO_PASSWORD || "demoPassword123";
    console.log("🌱 Seeding demo user...");

    const user = await User.create({
      name: "Demo User",
      email: demoEmail,
      password: demoPassword
    });

    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();

    const dateAtDay = (day, offsetMonth = 0) => {
      let targetMonth = currentMonth + offsetMonth;
      let targetYear = currentYear;
      if (targetMonth < 0) {
        targetMonth += 12;
        targetYear -= 1;
      }
      return new Date(targetYear, targetMonth, day, 12, 0, 0);
    };

    // Sample Transactions (Incomes and Expenses spread across current and previous month)
    const sampleTransactions = [
      // Current Month Incomes
      { type: "Income", category: "Salary", amount: 6500.00, description: "Monthly paycheck", date: dateAtDay(1) },
      { type: "Income", category: "Freelance", amount: 1250.00, description: "Website design project", date: dateAtDay(12) },
      { type: "Income", category: "Investments", amount: 320.00, description: "Stock dividends", date: dateAtDay(20) },

      // Current Month Expenses
      { type: "Expense", category: "Bills & Utilities", amount: 145.00, description: "Electricity & Gas bill", date: dateAtDay(2) },
      { type: "Expense", category: "Bills & Utilities", amount: 79.99, description: "High-speed Internet", date: dateAtDay(3) },
      { type: "Expense", category: "Food & Dining", amount: 125.50, description: "Weekly Groceries", date: dateAtDay(4) },
      { type: "Expense", category: "Food & Dining", amount: 56.20, description: "Dinner with colleagues", date: dateAtDay(7) },
      { type: "Expense", category: "Transportation", amount: 45.00, description: "Fuel fill-up", date: dateAtDay(8) },
      { type: "Expense", category: "Shopping", amount: 189.99, description: "Ergonomic keyboard", date: dateAtDay(10) },
      { type: "Expense", category: "Entertainment", amount: 14.99, description: "Netflix subscription", date: dateAtDay(14) },
      { type: "Expense", category: "Entertainment", amount: 85.00, description: "Concert tickets", date: dateAtDay(16) },
      { type: "Expense", category: "Food & Dining", amount: 110.00, description: "Weekend Groceries", date: dateAtDay(18) },
      { type: "Expense", category: "Transportation", amount: 35.00, description: "Train fare", date: dateAtDay(21) },
      { type: "Expense", category: "Healthcare", amount: 60.00, description: "Monthly prescription", date: dateAtDay(22) },
      { type: "Expense", category: "Travel", amount: 350.00, description: "Flight booking to visit family", date: dateAtDay(24) },
      { type: "Expense", category: "Other", amount: 30.00, description: "Dry cleaning", date: dateAtDay(25) },

      // Previous Month Incomes
      { type: "Income", category: "Salary", amount: 6500.00, description: "Monthly paycheck", date: dateAtDay(1, -1) },
      { type: "Income", category: "Freelance", amount: 950.00, description: "Consulting gig", date: dateAtDay(15, -1) },

      // Previous Month Expenses
      { type: "Expense", category: "Bills & Utilities", amount: 135.00, description: "Electricity & Gas bill", date: dateAtDay(2, -1) },
      { type: "Expense", category: "Bills & Utilities", amount: 79.99, description: "High-speed Internet", date: dateAtDay(3, -1) },
      { type: "Expense", category: "Food & Dining", amount: 480.00, description: "Groceries and dining out", date: dateAtDay(10, -1) },
      { type: "Expense", category: "Transportation", amount: 95.00, description: "Fuel & public transport", date: dateAtDay(12, -1) },
      { type: "Expense", category: "Shopping", amount: 310.00, description: "New desk lamp & office supplies", date: dateAtDay(18, -1) },
      { type: "Expense", category: "Entertainment", amount: 45.00, description: "Movie night & streaming services", date: dateAtDay(20, -1) }
    ];

    for (const t of sampleTransactions) {
      await Transaction.create({ ...t, UserId: user.id });
    }

    // Sample Budgets
    const sampleBudgets = [
      { category: "Food & Dining", amount: 500.00 },
      { category: "Transportation", amount: 150.00 },
      { category: "Shopping", amount: 300.00 },
      { category: "Entertainment", amount: 200.00 },
      { category: "Bills & Utilities", amount: 250.00 },
      { category: "Travel", amount: 500.00 },
      { category: "Healthcare", amount: 100.00 }
    ];

    for (const b of sampleBudgets) {
      await Budget.create({ ...b, UserId: user.id });
    }

    console.log("✅ Seeding completed successfully!");
  } catch (err) {
    console.error("❌ Seeding failed:", err);
  }
};
