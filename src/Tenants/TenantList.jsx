// src/Tenants/TenantList.jsx
import React, { useEffect, useState } from 'react';
import { getTenants, deleteTenant } from '../api/api';
import { Link, useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import './tenants.css';

export default function TenantList() {
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const fetchTenants = async () => {
    setLoading(true);
    try {
      const res = await getTenants();
      setTenants(res.data);
    } catch (err) {
      toast.error('Failed to load tenants');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (location.pathname === '/tenants') {
      fetchTenants();
    }
  }, [location.pathname]);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this tenant?')) return;
    try {
      await deleteTenant(id);
      setTenants(tenants.filter(t => t.id !== id));
      toast.success('Tenant deleted');
    } catch (err) {
      toast.error('Failed to delete');
    }
  };

  if (loading) return <div className="text-center py-5 text-white">Loading tenants...</div>;

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-5">
        <h1 className="page-title">Tenants</h1>
        <Link to="/tenants/new" className="btn btn-primary btn-add">
          <i className="bi bi-plus-lg me-2"></i>New Tenant
        </Link>
      </div>

      {tenants.length === 0 ? (
        <div className="empty-state">
          <i className="bi bi-building"></i>
          <p>No tenants yet. Create your first one!</p>
        </div>
      ) : (
        <div className="row g-4">
          {tenants.map(tenant => (
            <div key={tenant.id} className="col-md-6 col-lg-4">
              <div className="tenant-card">
                <div className="card-header">
                  <h3 className="tenant-name">{tenant.name}</h3>
                  <span className="badge tenant-badge">ID: {tenant.id}</span>
                </div>
                {tenant.description && (
                  <p className="tenant-desc">{tenant.description}</p>
                )}
                <div className="card-actions">
                  <Link to={`/tenants/${tenant.id}`} className="btn btn-sm btn-outline-primary">
                    <i className="bi bi-eye"></i> View
                  </Link>
                  <Link to={`/tenants/${tenant.id}/edit`} className="btn btn-sm btn-outline-secondary">
                    <i className="bi bi-pencil"></i> Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(tenant.id)}
                    className="btn btn-sm btn-outline-danger"
                  >
                    <i className="bi bi-trash"></i> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}