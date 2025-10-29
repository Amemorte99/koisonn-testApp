
import React, { useState } from 'react';
import { login } from '../api/api';
import './login.css'; // Correct path

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await login(username, password);
      localStorage.setItem('access_token', response.data.access_token);
      window.location.href = '/dashboard';
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials or server unavailable.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-bg"></div>

      <div className="login-container">
        <div className="login-card">
          {/* Logo */}
          <div className="login-logo">
            <svg viewBox="0 0 64 64" className="logo-svg" aria-hidden="true">
              <rect x="16" y="16" width="32" height="32" rx="6" fill="url(#gradient)" />
              <path d="M24 28h16M24 36h12" stroke="white" strokeWidth="3" strokeLinecap="round" />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <h1 className="login-title">Welcome back</h1>
          <p className="login-subtitle">Sign in to continue to your dashboard</p>

          {/* Error Alert */}
          {error && (
            <div className="alert alert-danger alert-dismissible fade show" role="alert">
              <i className="bi bi-exclamation-triangle-fill me-2"></i>
              {error}
              <button type="button" className="btn-close" onClick={() => setError('')} aria-label="Close"></button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            {/* Username */}
            <div className="input-wrapper my-4">
              <div className="input-icon">
                <i className="bi bi-person"></i>
              </div>
              <input
                type="text"
                id="username"
                className="form-control form-control-lg input-field"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                disabled={loading}
                aria-label="Username"
              />
            </div>

            {/* Password */}
            <div className="input-wrapper my-4">
              <div className="input-icon">
                <i className="bi bi-lock"></i>
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                className="form-control form-control-lg input-field"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
                aria-label="Password"
              />
              <button
                type="button"
                className="toggle-password-btn"
                onClick={() => setShowPassword(!showPassword)}
                disabled={loading}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="btn btn-login w-100"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner"></span> Signing in...
                </>
              ) : (
                <>
                  <i className="bi bi-box-arrow-in-right me-2"></i> Sign In
                </>
              )}
            </button>
          </form>

          <p className="signup-link">
            New here?{' '}
            <a href="/inscription" className="signup-anchor">
              Create an account
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}