import React from 'react'
import UserLayout from './pages/UserLayout'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import ForgotPassword from './pages/ForgotPassword'
import Dashboard from './sections/Dashboard'
import AddTransaction from './sections/AddTransaction'
import Transactions from './sections/Transactions'
import Budgets from './sections/Budgets'
import SetBudgets from './sections/SetBudgets'
import ProtectedRoute from './components/ProtectedRoute';
import { Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <>
      <Routes>
        {/** Public routes */}
        <Route path='login' element={<Login />} />
        <Route path='forgot-password' element={<ForgotPassword />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<UserLayout />}>
            <Route path='/' element={<Dashboard />} />
            <Route path='/add-transactions' element={<AddTransaction />} />
            <Route path='/budgets' element={<Budgets />} />
            <Route path='/set-budgets' element={<SetBudgets />} />
            <Route path='/transactions' element={<Transactions />} />
          </Route>
        </Route>

        {/* Catch-all 404 */}
        <Route path='*' element={<NotFound />} />
      </Routes>
      {/** Toast notifications */}
      <Toaster />
    </>
  )
}

export default App