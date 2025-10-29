// src/Users/UserView.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getUser, deleteUser } from '../api/api';
import { toast } from 'react-hot-toast';
import './users.css';

export default function UserView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser();
  }, [id]);

  const fetchUser = async () => {
    try {
      const res = await getUser(id);
      setUser(res.data);
    } catch (err) {
      toast.error('User not found');
      navigate('/users');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this user permanently?')) return;
    try {
      await deleteUser(id);
      toast.success('User deleted');
      navigate('/users');
    } catch (err) {
      toast.error('Failed to delete');
    }
  };

  if (loading) return <div className="text-center py-5 text-white">Loading user...</div>;
  if (!user) return null;

  return (
    <div className="container py-4">
      <div className="view-card">
        <div className="d-flex justify-content-between align-items-start mb-4">
          <div className="user-header">
            <div className="user-avatar">
              <i className="bi bi-person-fill"></i>
            </div>
            <div>
              <h1 className="view-title">{user.username}</h1>
              <span className="badge tenant-badge">Tenant {user.tenantId}</span>
            </div>
          </div>
          <div>
            <button onClick={handleDelete} className="btn btn-outline-danger">
              <i className="bi bi-trash"></i> Delete
            </button>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-md-6">
            <div className="info-item">
              <strong>User ID:</strong> {user.id}
            </div>
          </div>
          <div className="col-md-6">
            <div className="info-item">
              <strong>Tenant ID:</strong> {user.tenantId}
            </div>
          </div>
        </div>

        <div className="mt-4">
          <Link to="/users" className="btn btn-outline-primary">
            <i className="bi bi-arrow-left"></i> Back to Users
          </Link>
        </div>
      </div>
    </div>
  );
}