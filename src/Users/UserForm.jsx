// src/Users/UserForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../api/api';
import { toast } from 'react-hot-toast';
import './users.css';

export default function UserForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: '',
    password: '',
    tenantId: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createUser(form);
      toast.success('User created');
      navigate('/users');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4">
      <div className="form-card">
        <h2 className="form-title">New User</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="form-label">Username *</label>
            <input
              type="text"
              className="form-control"
              value={form.username}
              onChange={e => setForm({ ...form, username: e.target.value })}
              required
            />
          </div>
          <div className="mb-4">
            <label className="form-label">Password *</label>
            <input
              type="password"
              className="form-control"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>
          <div className="mb-4">
            <label className="form-label">Tenant ID *</label>
            <input
              type="number"
              className="form-control"
              value={form.tenantId}
              onChange={e => setForm({ ...form, tenantId: e.target.value })}
              required
              min="1"
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-primary btn-save" disabled={loading}>
              {loading ? 'Creating...' : 'Create User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}