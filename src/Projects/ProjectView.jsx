// src/Projects/ProjectView.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProject, deleteProject } from '../api/api';
import { toast } from 'react-hot-toast';
import './projects.css';

export default function ProjectView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProject();
  }, [id]);

  const fetchProject = async () => {
    try {
      const res = await getProject(id);
      setProject(res.data);
    } catch (err) {
      toast.error('Project not found');
      navigate('/projects');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this project permanently?')) return;
    try {
      await deleteProject(id);
      toast.success('Project deleted');
      navigate('/projects');
    } catch (err) {
      toast.error('Failed to delete');
    }
  };

  if (loading) return <div className="text-center py-5 text-white">Loading...</div>;
  if (!project) return null;

  return (
    <div className="container py-4">
      <div className="view-card">
        <div className="d-flex justify-content-between align-items-start mb-4">
          <div>
            <h1 className="view-title">{project.name}</h1>
            <span className="badge tenant-badge">Tenant {project.tenantId}</span>
          </div>
          <div>
            <Link to={`/projects/${id}/edit`} className="btn btn-outline-secondary me-2">
              <i className="bi bi-pencil"></i> Edit
            </Link>
            <button onClick={handleDelete} className="btn btn-outline-danger">
              <i className="bi bi-trash"></i> Delete
            </button>
          </div>
        </div>

        {project.description && (
          <div className="mb-4">
            <h5>Description</h5>
            <p className="text-muted">{project.description}</p>
          </div>
        )}

        <div className="row">
          <div className="col-md-6">
            <div className="info-item">
              <strong>Owner ID:</strong> {project.ownerId}
            </div>
          </div>
          <div className="col-md-6">
            <div className="info-item">
              <strong>Created:</strong> {new Date(project.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>

        <div className="mt-4">
          <Link to="/projects" className="btn btn-outline-primary">
            <i className="bi bi-arrow-left"></i> Back to Projects
          </Link>
        </div>
      </div>
    </div>
  );
}