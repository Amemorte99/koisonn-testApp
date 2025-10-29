// src/Tenants/TenantView.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getTenant, deleteTenant } from '../api/api';
import { toast } from 'react-hot-toast';
import './tenants.css';

export default function TenantView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tenant, setTenant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTenant();
  }, [id]);

  const fetchTenant = async () => {
    try {
      const res = await getTenant(id);
      setTenant(res.data);
    } catch (err) {
      toast.error('Tenant not found');
      navigate('/tenants');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this tenant permanently?')) return;
    try {
      await deleteTenant(id);
      toast.success('Tenant deleted');
      navigate('/tenants');
    } catch (err) {
      toast.error('Failed to delete');
    }
  };

  if (loading) return <div className="text-center py-5 text-white">Loading...</div>;
  if (!tenant) return null;

  return (
    <div className="container py-4">
      <div className="view-card">
        <div className="d-flex justify-content-between align-items-start mb-4">
          <div>
            <h1 className="view-title">{tenant.name}</h1>
            <span className="badge tenant-badge">ID: {tenant.id}</span>
          </div>
          <div>
            <Link to={`/tenants/${id}/edit`} className="btn btn-outline-secondary me-2">
              <i className="bi bi-pencil"></i> Edit
            </Link>
            <button onClick={handleDelete} className="btn btn-outline-danger">
              <i className="bi bi-trash"></i> Delete
            </button>
          </div>
        </div>

        {tenant.description && (
          <div className="mb-4">
            <h5>Description</h5>
            <p className="text-muted">{tenant.description}</p>
          </div>
        )}

        <div className="mt-4">
          <Link to="/tenants" className="btn btn-outline-primary">
            <i className="bi bi-arrow-left"></i> Back to Tenants
          </Link>
        </div>
      </div>
    </div>
  );
}