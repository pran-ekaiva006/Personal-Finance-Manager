# 💰 Personal-Finance-Manager

![README](/client/public/logo.png)

<h1 align="center">Personal Finance Manager</h1>

<p align="center">
  <a href="https://github.com/pran-ekaiva006/Personal-Finance-Manager">
    <img src="https://img.shields.io/badge/GitHub-Repo-blue?logo=github" alt="GitHub Repo">
  </a>
  
  <a href="https://personal-finance-manager1.onrender.com" target="_blank">
    <img src="https://img.shields.io/badge/Live-Demo-brightgreen?logo=render&logoColor=white" alt="Live Demo on Render">
  </a>
  
  <a href="https://github.com/pran-ekaiva006/Personal-Finance-Manager/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-yellow" alt="License">
  </a>
</p>

---

### 📋 Table of Contents

- [🎯 About The Project](#about-the-project)
- [✨ Features](#features)
- [🛠️ Tech Stack](#tech-stack)
- [🎪 Demo](#demo)
- [🚀 Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Setup](#environment-setup)
  - [Running the Application](#running-the-application)
- [📂 Folder Structure](#folder-structure)
- [🔌 API Endpoints](#api-endpoints)
- [📊 Database Schema](#database-schema)
- [🎨 Features Showcase](#features-showcase)
- [🔐 Security](#security)
- [🤝 Contributing](#contributing)
- [📜 License](#license)

---

### **About The Project**

**Personal Finance Manager** (formerly CashFlowX) is a full-stack web application designed to help users efficiently **track income, expenses, and budgets**.  
It offers **real-time visual insights** and **secure authentication** through a clean, modern, and responsive dashboard.

Built with **React (Vite)** on the frontend and **Node.js + Express** on the backend, the application stores data in a **PostgreSQL database powered by Supabase**, ensuring reliability and scalability.  

Both the **frontend and backend are deployed on Render**, making the app easily accessible online.

**Why This Project?**
- 📈 Get complete control over your finances
- 💡 Make informed financial decisions with data-driven insights
- 🎯 Stay on track with your budget goals
- 📱 Access your financial data anywhere, anytime

---

### **Features**

#### Core Functionality
- 🔐 **Secure Authentication** - User registration and login with JWT tokens
- 💰 **Transaction Management** - Add, edit, and delete income/expense transactions
- 🎯 **Budget Planning** - Set and manage monthly budgets by category
- 📊 **Visual Analytics** - Interactive Pie and Line charts using Recharts
- 📆 **Transaction History** - Searchable and filterable transaction records
- 💡 **Dashboard Insights** - Real-time balance, income, and expense summaries

#### Technical Features
- ⚡ **Fast Performance** - Built with Vite for lightning-fast development
- 📱 **Fully Responsive** - Mobile-first design with Tailwind CSS
- 🔒 **Secure** - Password hashing, JWT authentication, and CORS protection
- ☁️ **Cloud Deployed** - Hosted on Render (Frontend + Backend)
- 🗄️ **Reliable Database** - PostgreSQL with Supabase for data persistence
- 🎨 **Modern UI** - Clean and intuitive user interface

---

## **Tech Stack**

<p>
  <img alt="React" src="https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB"/>
  <img alt="Vite" src="https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white"/>
  <img alt="TailwindCSS" src="https://img.shields.io/badge/TailwindCSS-38B2AC?logo=tailwind-css&logoColor=white"/>
  <img alt="React Router" src="https://img.shields.io/badge/React_Router-CA4245?logo=react-router&logoColor=white"/>
  <img alt="Recharts" src="https://img.shields.io/badge/Recharts-FF6384?logo=chart.js&logoColor=white"/>
</p>

<p>
  <img alt="Node.js" src="https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white"/>
  <img alt="Express.js" src="https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=white"/>
  <img alt="PostgreSQL" src="https://img.shields.io/badge/PostgreSQL-316192?logo=postgresql&logoColor=white"/>
  <img alt="Sequelize" src="https://img.shields.io/badge/Sequelize-52B0E7?logo=sequelize&logoColor=white"/>
  <img alt="JWT" src="https://img.shields.io/badge/JWT-000000?logo=json-web-tokens&logoColor=white"/>
</p>

<p>
  <img alt="Supabase" src="https://img.shields.io/badge/Supabase-3ECF8E?logo=supabase&logoColor=black"/>
  <img alt="Render" src="https://img.shields.io/badge/Render-46E3B7?logo=render&logoColor=black"/>
  <img alt="VS Code" src="https://img.shields.io/badge/VS%20Code-007ACC?logo=visual-studio-code&logoColor=white"/>
</p>

---

## **Demo**

Check out the live project here:  
👉 [**Personal Finance Manager Live Demo**](https://personal-finance-manager1.onrender.com)

GitHub Repository:  
🔗 [**Personal Finance Manager Repo**](https://github.com/pran-ekaiva006/Personal-Finance-Manager)

---

## **🚀 Getting Started**

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** - [Download here](https://git-scm.com/)
- **PostgreSQL Database** or **Supabase Account** - [Get Supabase](https://supabase.com/)

### Installation

#### 1️⃣ Clone the Repository

```bash
git clone https://github.com/pran-ekaiva006/Personal-Finance-Manager.git
cd Personal-Finance-Manager
```

#### 2️⃣ Install Backend Dependencies

```bash
cd server
npm install
```

#### 3️⃣ Install Frontend Dependencies

```bash
cd ../client
npm install
```

### Environment Setup

#### Backend Environment Variables

Create a `.env` file in the `server` directory:

```bash
cd server
touch .env  # For Mac/Linux
# OR
New-Item .env  # For Windows PowerShell
```

Add the following to `server/.env`:

```env
PORT=5001
PG_URI=your_postgresql_connection_string
JWT_SECRET=your_super_secret_jwt_key_here
NODE_ENV=development
```

**For Supabase Database:**
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project → Settings → Database
3. Copy the **Connection String (URI)**
4. Format: `postgresql://postgres.[ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres`

#### Frontend Environment Variables

Create a `.env` file in the `client` directory:

```bash
cd client
touch .env  # For Mac/Linux
# OR
New-Item .env  # For Windows PowerShell
```

Add the following to `client/.env`:

```env
VITE_BACKEND_URL=http://localhost:5001
```

### Running the Application

#### Start Backend Server

```bash
cd server
npm start
# OR for development with auto-reload
npm run dev
```

**Expected Output:**
```
✅ PostgreSQL Connected (Supabase SSL enabled)
✅ All models were synchronized successfully
🚀 Server running on port 5001
```

#### Start Frontend Development Server

Open a **new terminal** and run:

```bash
cd client
npm run dev
```

**Expected Output:**
```
VITE v6.x.x  ready in 234 ms

➜  Local:   http://localhost:5174/
➜  Network: use --host to expose
```

#### Access the Application

Open your browser and navigate to: **http://localhost:5174**

---

## 📂 Folder Structure

```bash
Personal-Finance-Manager/
├── .gitignore
├── LICENSE
├── README.md
│
├── client/                          # Frontend React Application
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── vercel.json
│   ├── eslint.config.js
│   ├── public/
│   │   ├── logo.png
│   │   └── vite.svg
│   └── src/
│       ├── App.jsx                  # Main App Component
│       ├── main.jsx                 # Entry Point
│       ├── index.css                # Global Styles
│       │
│       ├── components/              # Reusable UI Components
│       │   ├── BudgetCardDisplay.jsx
│       │   ├── BudgetCategoryItem.jsx
│       │   ├── MoneyCard.jsx
│       │   ├── PieChart.jsx
│       │   ├── ProtectedRoute.jsx
│       │   ├── SimpleLineChart.jsx
│       │   ├── SkeletonLoader.jsx
│       │   └── TransactionCard.jsx
│       │
│       ├── contexts/                # React Context API
│       │   └── AppProvider.jsx      # Global State Management
│       │
│       ├── pages/                   # Page Components
│       │   ├── Login.jsx            # Login/Register Page
│       │   └── UserLayout.jsx       # Dashboard Layout
│       │
│       └── sections/                # Dashboard Sections
│           ├── AddTransaction.jsx   # Add Income/Expense
│           ├── Budgets.jsx          # View Budget Status
│           ├── Dashboard.jsx        # Main Dashboard
│           ├── SetBudgets.jsx       # Create/Edit Budgets
│           └── Transactions.jsx     # Transaction History
│
└── server/                          # Backend Node.js Application
    ├── index.js                     # Server Entry Point
    ├── start.js                     # Startup Script
    ├── app.js                       # Express App Configuration
    ├── package.json
    ├── docker-compose.yml           # Local PostgreSQL Setup
    │
    ├── config/                      # Configuration Files
    │   └── db.js                    # Database Connection
    │
    ├── controllers/                 # Business Logic
    │   ├── authController.js        # Authentication Logic
    │   ├── budgetController.js      # Budget Operations
    │   └── transactionController.js # Transaction Operations
    │
    ├── middleware/                  # Custom Middleware
    │   └── authMiddleware.js        # JWT Authentication
    │
    ├── models/                      # Database Models (Sequelize)
    │   ├── User.js                  # User Model
    │   ├── Budget.js                # Budget Model
    │   └── Transaction.js           # Transaction Model
    │
    ├── routes/                      # API Routes
    │   ├── authRoutes.js            # Auth Endpoints
    │   ├── budgetRoutes.js          # Budget Endpoints
    │   └── transactionRoutes.js     # Transaction Endpoints
    │
    └── certs/                       # SSL Certificates
        └── supabase.crt             # Supabase SSL Certificate
```

---

## 🔌 API Endpoints

### Authentication Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | ❌ |
| POST | `/api/auth/login` | Login user | ❌ |
| POST | `/api/auth/logout` | Logout user | ✅ |
| GET | `/api/auth/me` | Get current user | ✅ |

### Transaction Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/transactions` | Add new transaction | ✅ |
| GET | `/api/transactions` | Get all user transactions | ✅ |
| GET | `/api/transactions/summary/:year/:month` | Get monthly summary | ✅ |
| GET | `/api/transactions/monthly-summary` | Get yearly summary | ✅ |

### Budget Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/budgets` | Create new budget | ✅ |
| GET | `/api/budgets` | Get all user budgets | ✅ |
| PUT | `/api/budgets/:id` | Update budget | ✅ |
| DELETE | `/api/budgets/:id` | Delete budget | ✅ |
| GET | `/api/budgets/status` | Get budget usage stats | ✅ |

---

## 📊 Database Schema

### User Table
```javascript
{
  id: UUID (Primary Key, Auto-generated),
  name: STRING (Required),
  email: STRING (Required, Unique),
  password: STRING (Required, Hashed with bcrypt),
  createdAt: TIMESTAMP,
  updatedAt: TIMESTAMP
}
```

### Transaction Table
```javascript
{
  id: UUID (Primary Key, Auto-generated),
  type: ENUM ['Income', 'Expense'] (Required),
  category: STRING (Required),
  amount: FLOAT (Required),
  description: STRING (Optional),
  date: DATE (Default: Current Date),
  UserId: UUID (Foreign Key → User.id, Required),
  createdAt: TIMESTAMP,
  updatedAt: TIMESTAMP
}
```

### Budget Table
```javascript
{
  id: UUID (Primary Key, Auto-generated),
  category: STRING (Required, Unique per user),
  amount: FLOAT (Required),
  UserId: UUID (Foreign Key → User.id, Required),
  createdAt: TIMESTAMP,
  updatedAt: TIMESTAMP
}
```

**Relationships:**
- One User → Many Transactions (One-to-Many)
- One User → Many Budgets (One-to-Many)

---

## 🎨 Features Showcase

### 💰 Dashboard Overview
- **Total Balance**: Real-time calculation (Income - Expenses)
- **Monthly Income**: Sum of all income transactions
- **Monthly Expenses**: Sum of all expense transactions
- **Savings Rate**: Percentage of income saved
- **Income vs Expense Chart**: Visual line chart showing trends
- **Expense Breakdown**: Pie chart by category

### 📝 Transaction Management
- **Add Transactions**: Quick form to add income/expense
- **Categorization**: Pre-defined categories for easy tracking
- **Search & Filter**: Find transactions by description or type
- **Sort Options**: Sort by date or amount
- **Transaction History**: Complete list with details

### 🎯 Budget System
- **Set Budgets**: Create monthly budgets by category
- **Real-time Tracking**: See spending vs budget instantly
- **Visual Indicators**: Progress bars and percentage displays
- **Alerts**: Get notified when approaching or exceeding budget
- **Edit/Delete**: Modify budgets anytime

### 📊 Analytics
- **Monthly Reports**: Detailed breakdown of finances
- **Category Analysis**: See where money goes
- **Trend Visualization**: Track financial habits over time
- **Budget Performance**: Compare planned vs actual spending

---

## 🔐 Security

This application implements multiple security measures:

- ✅ **Password Hashing**: Passwords encrypted with bcrypt (10 salt rounds)
- ✅ **JWT Authentication**: Secure token-based authentication
- ✅ **HTTP-Only Cookies**: Tokens stored in secure cookies
- ✅ **CORS Protection**: Configured for allowed origins only
- ✅ **SQL Injection Prevention**: Using Sequelize ORM parameterized queries
- ✅ **SSL/TLS**: Encrypted database connections to Supabase
- ✅ **Environment Variables**: Sensitive data stored securely
- ✅ **Protected Routes**: Middleware authentication on API endpoints

---

## 🤝 Contributing

Contributions make the open-source community an amazing place to learn and create! Any contributions you make are **greatly appreciated**.

### How to Contribute

1. **Fork the Project**
2. **Create your Feature Branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your Changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the Branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

### Contribution Guidelines
- Follow the existing code style
- Write clear commit messages
- Add comments for complex logic
- Test your changes before submitting
- Update documentation if needed

---

## 📜 License

This Project is Licensed under the **MIT License** - see the [LICENSE](./LICENSE) file for details.

```
MIT License

Copyright (c) 2024 Personal Finance Manager

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 👨‍💻 Author

**Pran Ekaiva**

- 🐙 GitHub: [@pran-ekaiva006](https://github.com/pran-ekaiva006)
- 💼 LinkedIn: [Pran Ekaiva's LinkedIn](https://www.linkedin.com/in/your-linkedin-profile-url/)
- 📧 Email: pranjalverma975@gmail.com

---

## 🙏 Acknowledgments

Special thanks to:

- [React Team](https://react.dev/) - For the amazing framework
- [Vite](https://vitejs.dev/) - For lightning-fast build tool
- [Tailwind CSS](https://tailwindcss.com/) - For utility-first styling
- [Recharts](https://recharts.org/) - For beautiful charts
- [Supabase](https://supabase.com/) - For PostgreSQL hosting
- [Render](https://render.com/) - For seamless deployment
- [Lucide Icons](https://lucide.dev/) - For beautiful icons
- [Express.js](https://expressjs.com/) - For robust backend framework
- [Sequelize](https://sequelize.org/) - For powerful ORM

---

## 📞 Support

Need help? Here's how to reach out:

- 📧 **Email**: pranjalverma975@gmail.com
- 🐛 **Report Issues**: [GitHub Issues](https://github.com/pran-ekaiva006/Personal-Finance-Manager/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/pran-ekaiva006/Personal-Finance-Manager/discussions)
- 📖 **Documentation**: Check this README for detailed guides

---

<p align="center">
  <strong>Built with ❤️ using React, Node.js, PostgreSQL, and deployed on Render</strong>
</p>

<p align="center">
  ⭐ If you found this project helpful, please give it a star!
</p>

<p align="center">
  <a href="#-personal-finance-manager">⬆️ Back to Top</a>
</p>
