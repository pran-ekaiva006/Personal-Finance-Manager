import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

// TODO: Wire up actual password reset email sending via a backend endpoint
// (e.g. POST /api/auth/forgot-password). For now this is a UI stub that
// always shows a success message regardless of whether the email exists.

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    // Simulate a short delay for UX
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);
    setSubmitted(true);
    toast.success('If an account exists, a reset link has been sent.');
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-gray-100 to-white">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full sm:w-96 text-gray-700">
        {/* Logo */}
        <div className="border-b border-gray-200 px-2 py-6 mb-6">
          <div className="flex justify-center gap-2 items-center text-3xl font-black text-green-500">
            <img src="./logo.png" className="size-12" alt="Logo" />
            <h1>CashFlowX</h1>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-gray-900 text-center mb-2">
          Forgot Password
        </h2>
        <p className="text-center text-sm mb-6 text-gray-500">
          Enter your email and we'll send you a reset link.
        </p>

        {submitted ? (
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-6">
              If an account with that email exists, a password reset link has been sent. Please check your inbox.
            </p>
            <Link
              to="/login"
              className="text-blue-600 font-semibold hover:underline text-sm"
            >
              ← Back to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="email"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Email address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>

            <div className="text-center mt-4">
              <Link
                to="/login"
                className="text-sm text-blue-600 hover:underline"
              >
                ← Back to Login
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
