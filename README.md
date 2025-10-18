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
- [🔧 Installation](#installation)
- [📂 Folder Structure](#-folder-structure)
- [📜 Licence](#licence)

---

### **About The Project**

**Personal Finance Manager** is a full-stack web application designed to help users efficiently **track income, expenses, and budgets**.  
It offers **real-time visual insights** and **secure authentication** through a clean, modern, and responsive dashboard.

Built with **React (Vite)** on the frontend and **Node.js + Express** on the backend, the application stores data in a **PostgreSQL database powered by Supabase**, ensuring reliability and scalability.  

Both the **frontend and backend are deployed on Render**, making the app easily accessible online.

---

### **Features**

- 🔐 Secure authentication using Supabase (PostgreSQL)
- 💰 Add, edit, and delete income or expense transactions
- 🎯 Set and manage personalized budgets
- 📊 Visual analytics with Pie and Line charts
- 📆 Transaction history and category insights
- 💡 Dashboard summary of total balance and trends
- ☁️ Hosted entirely on Render (Frontend + Backend)
- 📱 Fully responsive design with Tailwind CSS

---

## **Tech Stack**

<p>
  <img alt="React" src="https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB"/>
  <img alt="TailwindCSS" src="https://img.shields.io/badge/TailwindCSS-38B2AC?logo=tailwind-css&logoColor=white"/>
  <img alt="Node.js" src="https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white"/>
  <img alt="Express.js" src="https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=white"/>
  <img alt="PostgreSQL" src="https://img.shields.io/badge/PostgreSQL-316192?logo=postgresql&logoColor=white"/>
  <img alt="Supabase" src="https://img.shields.io/badge/Supabase-3ECF8E?logo=supabase&logoColor=black"/>
  <img alt="Render" src="https://img.shields.io/badge/Render-46E3B7?logo=render&logoColor=black"/>
  <img alt="Vite" src="https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white"/>
  <img alt="VS Code" src="https://img.shields.io/badge/VS%20Code-007ACC?logo=visual-studio-code&logoColor=white"/>
</p>

---

## **Demo**

Check out the live project here:  
👉 [**Personal Finance Manager Live Demo**](https://personal-finance-manager1.onrender.com)

GitHub Repository:  
🔗 [**Personal Finance Manager Repo**](https://github.com/pran-ekaiva006/Personal-Finance-Manager)

---

## **Installation**

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/pran-ekaiva006/Personal-Finance-Manager.git

---

## **Folder-Structure**
Personal-Finance-Manager/
├── .gitignore
├── README.md
├── client
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── public
│   │   ├── logo.png
│   │   └── vite.svg
│   └── src
│       ├── App.jsx
│       ├── index.css
│       ├── main.jsx
│       ├── components
│       │   ├── BudgetCardDisplay.jsx
│       │   ├── MoneyCard.jsx
│       │   ├── TransactionCard.jsx
│       │   ├── SkeletonLoader.jsx
│       │   └── PieChart.jsx
│       ├── pages
│       │   ├── Login.jsx
│       │   └── UserLayout.jsx
│       ├── sections
│       │   ├── Dashboard.jsx
│       │   ├── Budgets.jsx
│       │   ├── SetBudgets.jsx
│       │   ├── AddTransaction.jsx
│       │   └── Transactions.jsx
│       └── contexts
│           └── AppProvider.jsx
│
└── server
    ├── app.js
    ├── index.js
    ├── package.json
    ├── config
    │   └── db.js
    ├── controllers
    │   ├── authController.js
    │   ├── budgetController.js
    │   └── transactionController.js
    ├── routes
    │   ├── authRoutes.js
    │   ├── budgetRoutes.js
    │   └── transactionRoutes.js
    └── certs
        └── supabase.crt


### **📜 Licence**
