
import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Sidebar.css';

const menu = [
  { to: '/dashboard', icon: 'bi-house-fill', label: 'Dashboard' },
  { to: '/projects', icon: 'bi-folder-fill', label: 'Projects' },
  { to: '/tasks', icon: 'bi-check-square-fill', label: 'Tasks' },
  { to: '/tenants', icon: 'bi-building-fill', label: 'Tenants' },
  { to: '/users', icon: 'bi-person-fill', label: 'Users' },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('access_token');
      window.location.href = '/login';
    }
  };

  return (
    <>
      {/* Mobile Toggle */}
      <button
        className="sidebar-toggle"
        onClick={() => setCollapsed(!collapsed)}
        aria-label="Toggle sidebar"
      >
        <i className={`bi ${collapsed ? 'bi-list' : 'bi-x'}`}></i>
      </button>

      <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
        {/* Header */}
        <div className="sidebar-header">
          <div className="logo">
            <svg viewBox="0 0 64 64" className="logo-svg" aria-hidden="true">
              <rect x="16" y="16" width="32" height="32" rx="6" fill="url(#grad)" />
              <path d="M24 28h16M24 36h12" stroke="white" strokeWidth="3" strokeLinecap="round" />
              <defs>
                <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
            </svg>
            <span className="logo-text">PM Tool</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          {menu.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className="nav-item"
                data-tooltip={collapsed ? item.label : ''}
              >
                <div className="nav-icon">
                  <i className={`bi ${item.icon}`}></i>
                  {isActive && <span className="active-dot"></span>}
                </div>
                <span className="nav-label">{item.label}</span>
                {isActive && <div className="active-bar"></div>}
              </NavLink>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogout}>
            <i className="bi bi-box-arrow-right"></i>
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}