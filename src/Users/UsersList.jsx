// src/Users/UsersList.jsx
import React, { useEffect, useState } from 'react';
import { getUsers, deleteUser } from '../api/api';
import { Link, useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import './users.css';

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await getUsers();
      setUsers(res.data);
    } catch (err) {
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (location.pathname === '/users') fetchUsers();
  }, [location.pathname]);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this user?')) return;
    try {
      await deleteUser(id);
      setUsers(users.filter(u => u.id !== id));
      toast.success('User deleted');
    } catch (err) {
      toast.error('Failed to delete');
    }
  };

  if (loading) return <div className="text-center py-5 text-white">Loading users...</div>;

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-5">
        <h1 className="page-title">Users</h1>
        <Link to="/users/new" className="btn btn-primary btn-add">
          <i className="bi bi-person-plus me-2"></i>New User
        </Link>
      </div>

      {users.length === 0 ? (
        <div className="empty-state">
          <i className="bi bi-people"></i>
          <p>No users yet.</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-glass">
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Tenant ID</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.tenantId}</td>
                  <td>
                    <button onClick={() => handleDelete(user.id)} className="btn btn-sm btn-outline-danger">
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}