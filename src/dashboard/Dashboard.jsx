
import React, { useEffect, useState } from 'react';
import { getProjects, getTasks, getUsers, getTenants, getComments } from '../api/api';
import './dashboard.css';

// Animated SVG Icons
const AnimatedIcon = ({ children, delay = 0 }) => (
  <div className="icon-wrapper" style={{ animationDelay: `${delay}s` }}>
    {children}
  </div>
);

const IconProject = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <rect x="3" y="4" width="18" height="16" rx="2" strokeWidth="2" />
    <path d="M8 10h8M8 14h6" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const IconTask = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <circle cx="12" cy="12" r="10" strokeWidth="2" />
    <path d="M9 12l2 2 4-4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconUser = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeWidth="2" />
    <circle cx="12" cy="7" r="4" strokeWidth="2" />
  </svg>
);

const IconTenant = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" strokeWidth="2" />
    <path d="M9 22V12h6v10" strokeWidth="2" />
  </svg>
);

const IconComment = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" strokeWidth="2" />
  </svg>
);

export default function Dashboard() {
  const [data, setData] = useState({
    projects: [], tasks: [], users: [], tenants: [], comments: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [p, t, u, te, c] = await Promise.all([
          getProjects(), getTasks(), getUsers(), getTenants(), getComments()
        ]);
        setData({
          projects: p.data || [],
          tasks: t.data || [],
          users: u.data || [],
          tenants: te.data || [],
          comments: c.data || []
        });
      } catch (err) {
        setError('Unable to load data. Please check your connection.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const stats = [
    { title: 'Projects', count: data.projects.length, icon: <IconProject />, color: 'indigo' },
    { title: 'Tasks', count: data.tasks.length, icon: <IconTask />, color: 'emerald' },
    { title: 'Users', count: data.users.length, icon: <IconUser />, color: 'violet' },
    { title: 'Tenants', count: data.tenants.length, icon: <IconTenant />, color: 'amber' },
    { title: 'Comments', count: data.comments.length, icon: <IconComment />, color: 'rose' },
  ];

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  return (
    <div className="dashboard-master">
      <div className="dashboard-bg"></div>

      <header className="dashboard-header">
        <h1 className="title-glow">Project Management</h1>
        <p className="subtitle">Real-time insights • Seamless control</p>
      </header>

      <div className="stats-grid">
        {stats.map((stat, i) => (
          <StatCard key={stat.title} stat={stat} index={i} />
        ))}
      </div>
    </div>
  );
}

// Premium Loading Skeleton
const LoadingSkeleton = () => (
  <div className="dashboard-master">
    <div className="dashboard-bg"></div>
    <header className="dashboard-header">
      <div className="skeleton-title"></div>
      <div className="skeleton-subtitle"></div>
    </header>
    <div className="stats-grid">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="glass-card skeleton-card">
          <div className="skeleton-icon"></div>
          <div className="skeleton-line short"></div>
          <div className="skeleton-line long"></div>
        </div>
      ))}
    </div>
  </div>
);

// Error State
const ErrorState = ({ message }) => (
  <div className="dashboard-master">
    <div className="error-container">
      <div className="error-icon">Warning</div>
      <p>{message}</p>
      <button onClick={() => window.location.reload()} className="retry-btn">
        Retry
      </button>
    </div>
  </div>
);

// Individual Stat Card with Micro-interactions
const StatCard = ({ stat, index }) => {
  const colors = {
    indigo: 'from-indigo-500 to-indigo-600',
    emerald: 'from-emerald-500 to-emerald-600',
    violet: 'from-violet-500 to-violet-600',
    amber: 'from-amber-500 to-amber-600',
    rose: 'from-rose-500 to-rose-600',
  };

  return (
    <div
      className="glass-card"
      style={{ '--delay': `${index * 0.1}s` }}
    >
      <AnimatedIcon delay={index * 0.1}>
        <div className={`icon-circle bg-gradient-to-br ${colors[stat.color]}`}>
          {stat.icon}
        </div>
      </AnimatedIcon>

      <h3 className="stat-title">{stat.title}</h3>
      <p className="stat-number">{stat.count.toLocaleString()}</p>

      <div className="progress-ring">
        <div
          className="progress-fill"
          style={{
            '--progress': Math.min(100, (stat.count / 100) * 100),
            background: `conic-gradient(${getColor(stat.color)} calc(var(--progress) * 1%), #e5e7eb 0)`
          }}
        ></div>
      </div>
    </div>
  );
};

// Helper to get Tailwind-like color
const getColor = (name) => {
  const map = {
    indigo: '#6366f1',
    emerald: '#10b981',
    violet: '#8b5cf6',
    amber: '#f59e0b',
    rose: '#f43f5e',
  };
  return map[name];
};