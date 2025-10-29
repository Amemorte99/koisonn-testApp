// src/Projects/ProjectForm.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createProject, updateProject, getProject } from '../api/api';
import { toast } from 'react-hot-toast';

import './projects.css';

export default function ProjectForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [form, setForm] = useState({
    name: '',
    description: '',
    ownerId: '',
    tenantId: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEdit) {
      fetchProject();
    }
  }, [id]);

  const fetchProject = async () => {
    try {
      const res = await getProject(id);
      setForm({
        name: res.data.name,
        description: res.data.description || '',
        ownerId: res.data.ownerId,
        tenantId: res.data.tenantId,
      });
    } catch (err) {
      toast.error('Failed to load project');
      navigate('/projects');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEdit) {
        await updateProject(id, form);
        toast.success('Project updated');
      } else {
        await createProject(form);
        toast.success('Project created');
      }
      navigate('/projects');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Operation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4">
      <div className="form-card">
        <h2 className="form-title">
          {isEdit ? 'Edit Project' : 'New Project'}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="form-label">Project Name *</label>
            <input
              type="text"
              className="form-control form-control-lg"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              placeholder="e.g., Alpha Launch"
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              rows="4"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Optional project details..."
            />
          </div>

          <div className="row">
            <div className="col-md-6 mb-4">
              <label className="form-label">Owner ID *</label>
              <input
                type="number"
                className="form-control"
                value={form.ownerId}
                onChange={(e) => setForm({ ...form, ownerId: e.target.value })}
                required
                min="1"
              />
            </div>
            <div className="col-md-6 mb-4">
              <label className="form-label">Tenant ID *</label>
              <input
                type="number"
                className="form-control"
                value={form.tenantId}
                onChange={(e) => setForm({ ...form, tenantId: e.target.value })}
                required
                min="1"
              />
            </div>
          </div>

          <div className="form-actions">
            <button
              type="submit"
              className="btn btn-primary btn-save"
              disabled={loading}
            >
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
              onClick={() => navigate('/projects')}
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