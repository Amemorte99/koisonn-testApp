
import React, { useEffect, useState } from 'react';
import { getProjects, getTasks, getUsers, getTenants, getComments } from '../api/api';
import './dashboard.css';

const StatCard = ({ title, count, icon, color, delay }) => (
  <div className="stat-card" style={{ '--delay': `${delay}s` }}>
    <div className={`stat-icon ${color}`}>
      {icon}
    </div>
    <h3 className="stat-title">{title}</h3>
    <p className="stat-count">{count.toLocaleString()}</p>
    <div className="stat-bar">
      <div className="stat-fill" style={{ width: `${Math.min(100, (count / 50) * 100)}%` }}></div>
    </div>
  </div>
);

export default function Dashboard() {
  const [stats, setStats] = useState({ projects: 0, tasks: 0, users: 0, tenants: 0, comments: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [p, t, u, te, c] = await Promise.all([
          getProjects(), getTasks(), getUsers(), getTenants(), getComments()
        ]);
        setStats({
          projects: p.data.length,
          tasks: t.data.length,
          users: u.data.length,
          tenants: te.data.length,
          comments: c.data.length,
        });
      } catch (err) {
        console.error('Failed to load stats', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const icons = {
    projects: <i className="bi bi-folder-fill"></i>,
    tasks: <i className="bi bi-check-square-fill"></i>,
    users: <i className="bi bi-person-fill"></i>,
    tenants: <i className="bi bi-building-fill"></i>,
    comments: <i className="bi bi-chat-fill"></i>,
  };

  const data = [
    { title: 'Projects', count: stats.projects, icon: icons.projects, color: 'indigo' },
    { title: 'Tasks', count: stats.tasks, icon: icons.tasks, color: 'emerald' },
    { title: 'Users', count: stats.users, icon: icons.users, color: 'violet' },
    { title: 'Tenants', count: stats.tenants, icon: icons.tenants, color: 'amber' },
    { title: 'Comments', count: stats.comments, icon: icons.comments, color: 'rose' },
  ];

  if (loading) {
    return (
      <div className="dashboard-master">
        <div className="dashboard-bg"></div>
        <div className="container py-5">
          <h1 className="dashboard-title">Loading...</h1>
          <div className="stats-grid">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="stat-card skeleton">
                <div className="skeleton-icon"></div>
                <div className="skeleton-text"></div>
                <div className="skeleton-number"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-master">
      <div className="dashboard-bg"></div>
      <div className="container py-5">
        <header className="text-center mb-5">
          <h1 className="dashboard-title">Project Management</h1>
          <p className="dashboard-subtitle">Real-time platform overview</p>
        </header>
        <div className="stats-grid">
          {data.map((stat, i) => (
            <StatCard key={stat.title} {...stat} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </div>
  );
}