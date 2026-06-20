# 💰 CashFlowX

CashFlowX is a full-stack, private-first personal finance ecosystem built to track expenses, manage category budgets, and analyze cashflow trends without connecting to banking credentials. It features automatic database seeding, recurring transaction cron tasks, and a responsive theme-synchronized design system.

---

## 🏗️ System Architecture

CashFlowX uses a decoupled Client-Server architecture designed to keep financial data modular, secure, and performant:

```
┌────────────────────────────────────────────────────────┐
│                        CLIENT                          │
│  React (Vite) + Tailwind v4 + Recharts (Dynamic SVGs)   │
└───────────────────────────┬────────────────────────────┘
                            │
                            │ Secure HTTPS Requests
                            ▼
┌────────────────────────────────────────────────────────┐
│                        SERVER                          │
│     Node.js + Express + Sequelize ORM + JWT Auth       │
└───────────────────────────┬────────────────────────────┘
                            │
                            │ Parameterized Queries
                            ▼
┌────────────────────────────────────────────────────────┐
│                       DATABASE                         │
│         PostgreSQL Database Engine (Supabase)          │
└────────────────────────────────────────────────────────┘
```

- **Client**: Single Page Application built on React and compiled using Vite for optimized bundle loading. Employs Tailwind v4 custom design systems (Ivory/Sand light palette and Obsidian/Carbon dark palette).
- **Server**: State-less Express API handling authentication, rate-limiting, transaction calculations, and budget thresholds.
- **Database**: PostgreSQL engine. Automatically synchronized using Sequelize ORM schemas with built-in database SSL tunnels.

---

## 🛠️ Tech Stack

- **Frontend**: `React 19` · `Vite 6` · `Tailwind v4` · `Recharts` · `Lucide Icons`
- **Backend**: `Node.js` · `Express 5` · `Sequelize 6` · `PostgreSQL` · `Zod` · `JSON Web Tokens`
- **Infrastructure**: `Docker-compose` (local db development) · `Supabase` (database hosting) · `Render` (application deployment)

---

## 🚀 Quick Start

### Prerequisites

Ensure you have the following installed:
- **Node.js** (v18.0 or higher)
- **Docker & Docker Compose** (optional, for local database container hosting)
- **npm** or **yarn**

### Environment Configuration

#### 1. Server Environment (`server/.env`)
Create `server/.env` and supply the following variables:
```env
PORT=5001
PG_URI=postgresql://postgres:[password]@aws-[region].pooler.supabase.com:6543/postgres
JWT_SECRET=your_super_secret_jwt_key_here
NODE_ENV=development
DEMO_PASSWORD=demoPassword123
```
*Note: If developing locally with Docker, use `postgresql://postgres:postgres@localhost:5433/pfmdb` as your connection string.*

#### 2. Client Environment (`client/.env`)
Create `client/.env` and supply the backend connection endpoint:
```env
VITE_BACKEND_URL=http://localhost:5001/api
```

---

### Local Installation & Running

#### Option A: Running with Local Docker Database
If you prefer running a local PostgreSQL container:

1. Spin up the local database container:
   ```bash
   cd server
   npm run db:up
   ```
2. Install dependencies & launch the API server:
   ```bash
   npm install
   npm run dev
   ```
   *The server automatically connects, synchronizes schemas, runs demo seed scripts (`demo@cashflowx.app`), and starts the recurring transaction processing.*

3. Spin up the React client:
   ```bash
   cd ../client
   npm install
   npm run dev
   ```

#### Option B: Running with Cloud Database (Supabase)
If connecting directly to a remote Supabase DB:
1. Ensure `PG_URI` in `server/.env` is configured with your Supabase database pooled connection string.
2. Run server:
   ```bash
   cd server && npm install && npm run dev
   ```
3. Run client:
   ```bash
   cd client && npm install && npm run dev
   ```

---

## 📂 Project Structure

```
CashFlowX/
├── client/                     # React Client SPA
│   ├── public/                 # Static Assets
│   └── src/
│       ├── components/         # Visual components (Budget displays, charts, inputs)
│       ├── contexts/           # Global Context State Management (AppProvider.jsx)
│       ├── hooks/              # Dark theme custom hooks
│       ├── pages/              # Landing page, Login page, Dashboard Layouts
│       └── sections/           # Sub-sections (Add Transactions, History, Budgets)
│
└── server/                     # Express REST API Server
    ├── certs/                  # Database SSL certificates
    ├── config/                 # Config (db connections, pooled timeouts)
    ├── controllers/            # Controller handlers (Auth, Budgets, Transactions)
    ├── middleware/             # Token checks & body input validation middlewares
    ├── models/                 # Sequelize SQL schema entities
    ├── routes/                 # Express API Endpoint Routers
    ├── scripts/                # Database seeding & recurring task engines
    └── validators/             # Zod validation schema schemas
```

---

## 🔌 API Reference

### Auth Endpoints (`/api/auth`)

| Endpoint | Method | Payload | Auth Required | Description |
| :--- | :--- | :--- | :---: | :--- |
| `/register` | `POST` | `{ name, email, password }` | ❌ | Create new user account |
| `/login` | `POST` | `{ email, password }` | ❌ | Login user & issue JWT |
| `/logout` | `POST` | `None` | ✅ | Revoke cookie session |
| `/me` | `GET` | `None` | ✅ | Retrieve current user context |

### Transaction Endpoints (`/api/transactions`)

| Endpoint | Method | Payload | Auth Required | Description |
| :--- | :--- | :--- | :---: | :--- |
| `/` | `POST` | `{ type, category, amount, description, isRecurring, frequency }` | ✅ | Create new transaction |
| `/` | `GET` | `None` | ✅ | Get user transaction history |
| `/summary/:year/:month` | `GET` | `None` | ✅ | Get monthly summary stats |
| `/monthly-summary` | `GET` | `None` | ✅ | Get 12-month aggregated trends |

### Budget Endpoints (`/api/budgets`)

| Endpoint | Method | Payload | Auth Required | Description |
| :--- | :--- | :--- | :---: | :--- |
| `/` | `POST` | `{ category, amount }` | ✅ | Create new category cap |
| `/` | `GET` | `None` | ✅ | List user budgets |
| `/:id` | `PUT` | `{ category, amount }` | ✅ | Update budget limit |
| `/:id` | `DELETE` | `None` | ✅ | Delete budget limit |
| `/status` | `GET` | `None` | ✅ | Get current spending status |

---

## 📊 Database Schema

```
  ┌──────────────┐             ┌─────────────────┐
  │     User     │────────────<│   Transaction   │
  ├──────────────┤             ├─────────────────┤
  │ id (PK)      │             │ id (PK)         │
  │ name         │             │ type (Income/Exp)│
  │ email (UQ)   │             │ category        │
  │ password     │             │ amount          │
  └──────┬───────┘             │ date            │
         │                     │ UserId (FK)     │
         │                     └─────────────────┘
         │                     ┌─────────────────┐
         └────────────────────<│     Budget      │
                               ├─────────────────┤
                               │ id (PK)         │
                               │ category        │
                               │ amount          │
                               │ UserId (FK)     │
                               └─────────────────┘
```

- **User**: Table mapping user records with bcrypt-hashed keys.
- **Transaction**: Table recording incomes and expenses. Relates back to the User via a `UserId` key.
- **Budget**: Table tracking user category caps. Categories are constrained to be unique per user.

---

## 🔐 Security Standards

- **Bcrypt Password Salting**: Passwords are encrypted utilizing `bcryptjs` with 10 salt rounds before SQL insert.
- **HttpOnly Cookies**: Session JWT tokens are written inside secure `HttpOnly` and `SameSite` cookies, mitigating cross-site scripting (XSS) extraction risks.
- **Input Validation**: All payload items undergo rigid schema assertion checks via `Zod` middleware (e.g. strict number validation for financial limits).
- **ORM Parameterization**: Database queries run via Sequelize ORM objects, protecting the relational database layer from SQL injection vectors.
- **Rate-Limiting**: Essential auth pathways are wrapped inside `express-rate-limit` endpoints to prevent brute-force attacks.

---

## 🤝 Contributing

Contributions to CashFlowX are welcome. Please follow these instructions:
1. Fork this repository.
2. Create a clean branch (`git checkout -b feature/your-feature-name`).
3. Commit your changes (`git commit -m "feat: add secure category summary exports"`).
4. Push code to your branch (`git push origin feature/your-feature-name`).
5. Open a Pull Request.

---

## 📜 License

Distributed under the MIT License. See [LICENSE](./LICENSE) for details.
