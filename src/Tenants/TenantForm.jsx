// src/Tenants/TenantForm.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createTenant, updateTenant, getTenant } from '../api/api';
import { toast } from 'react-hot-toast';
import './tenants.css';

export default function TenantForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [form, setForm] = useState({
    name: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEdit) fetchTenant();
  }, [id]);

  const fetchTenant = async () => {
    try {
      const res = await getTenant(id);
      setForm({
        name: res.data.name,
        description: res.data.description || '',
      });
    } catch (err) {
      toast.error('Tenant not found');
      navigate('/tenants');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEdit) {
        await updateTenant(id, form);
        toast.success('Tenant updated');
      } else {
        await createTenant(form);
        toast.success('Tenant created');
      }
      navigate('/tenants');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Operation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4">
      <div className="form-card">
        <h2 className="form-title">{isEdit ? 'Edit Tenant' : 'New Tenant'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="form-label">Name *</label>
            <input
              type="text"
              className="form-control form-control-lg"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              required
              placeholder="e.g., Tenant Alpha"
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              rows="4"
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              placeholder="Optional description..."
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary btn-save" disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner"></span> Saving...
                </>
              ) : (
                <>
                  <i className="bi bi-check-lg me-2"></i>
                  {isEdit ? 'Update' : 'Create'}
                </>
              )}
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => navigate('/tenants')}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}