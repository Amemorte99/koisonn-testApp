import React, { useEffect, useState } from 'react';
import { getProjects, getTasks, getUsers, getTenants, getComments } from '../api';
import './dashboard.css';

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [tenants, setTenants] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getProjects().then(res => setProjects(res.data));
    getTasks().then(res => setTasks(res.data));
    getUsers().then(res => setUsers(res.data));
    getTenants().then(res => setTenants(res.data));
    getComments().then(res => setComments(res.data));
  }, []);

  return (
    <div className="dashboard-container">
      <h1>Project Management Dashboard</h1>

      <div className="cards">
        <div className="card">
          <h3>Projects</h3>
          <p>{projects.length}</p>
        </div>
        <div className="card">
          <h3>Tasks</h3>
          <p>{tasks.length}</p>
        </div>
        <div className="card">
          <h3>Users</h3>
          <p>{users.length}</p>
        </div>
        <div className="card">
          <h3>Tenants</h3>
          <p>{tenants.length}</p>
        </div>
        <div className="card">
          <h3>Comments</h3>
          <p>{comments.length}</p>
        </div>
      </div>
    </div>
  );
}
